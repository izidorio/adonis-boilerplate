/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { parseISO, isBefore, subHours } = require('date-fns');
const jwtParse = require('../../../utils/jwtParse');

const Env = use('Env');
const Mail = use('Mail');
const User = use('App/Modules/Users/Models/User');
const Token = use('App/Modules/Users/Models/Token');

class AuthController {
  async login({ request, response, auth }) {
    const { document, password } = request.only([
      'document',
      'password',
    ]);

    try {
      const { token } = await auth.attempt(document, password);
      const tokenParse = jwtParse(token);

      const user = await User.findOrFail(tokenParse.uid);
      const { roles, permissions } = await user.authorizations();

      delete user.$attributes.password;

      return { token, user: { ...user.$attributes, roles, permissions } };
    } catch (err) {
      if (err.authScheme && err.authScheme === 'jwt') {
        return response.status(400).json({ message: 'Usuário/Senha não conferem' });
      }
      return response.status(500).json({ message: 'Erro interno no servidor' });
    }
  }

  async forgot({ request, response }) {
    const email = request.input('email');
    try {
      const user = await User.findByOrFail('email', email);

      const random = await promisify(randomBytes)(24);
      const token = random.toString('hex');

      await user.tokens().create({
        token,
        type: 'forgot-password',
      });

      const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset/${token}`;

      Mail.send(
        'emails.forgot-password',
        { username: user.name, resetPasswordUrl },
        (message) => {
          message
            .to(user.email)
            .from(Env.get('MAIL_FOM'))
            .subject(`${Env.get('APP_NAME')} - Recuperar Acesso`);
        },
      );
    } catch (err) {
      console.log('[forgot]', err); // eslint-disable-line
      return response
        .status(200)
        .json({ message: 'Se você forneceu um e-mail cadastrado em breve receberá um e-mail con o link para você criar uma nova senha.' });
    }

    return response
      .status(200)
      .json({ message: 'Se você forneceu um e-mail cadastrado em breve receberá um e-mail con o link para você criar uma nova senha.' });
  }

  async reset({ request, response }) {
    const { token, password } = request.only(['token', 'password']);

    const userToken = await Token.findByOrFail('token', token);

    if (isBefore(parseISO(userToken.created_at), subHours(new Date(), 2))) {
      return response.status(400).json({ error: 'Invalid date range. Forgot password' });
    }

    const user = await userToken.user().fetch();

    user.password = password;

    await user.save();

    // remove o token
    userToken.delete();
  }
}

module.exports = AuthController;
