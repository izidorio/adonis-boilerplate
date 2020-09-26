'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const { randomBytes } = require('crypto');
const { promisify } = require('util');

const Env = use('Env');
const Mail = use('Mail');

const Redis = use('Redis');
const User = use('App/Modules/Users/Models/User');

const Chance = use('chance');

class UserController {
  async teste() {
    const cacheUsers = await Redis.get('users');

    console.log(cacheUsers);
    if (cacheUsers) {
      return JSON.parse(cacheUsers);
    }

    const users = await User.all();
    await Redis.set('users', JSON.stringify(users));

    return users;
  }

  async index({ request }) {
    const { page = 1, perPage = 10, filter = '' } = request.only([
      'page', 'perPage', 'filter',
    ]);

    const users = await User.query()
      .orWhere('email', 'iLike', `%${filter}%`)
      .orWhere('name', 'iLike', `%${filter}%`)
      .orWhere('document', 'iLike', `%${filter}%`)
      .with('roles')
      .with('permissions')
      .paginate(page, perPage);

    return users;
  }

  async show({ params }) {
    const user = await User.findOrFail(params.id);
    await user.loadMany(['roles', 'permissions']);
    return user;
  }

  async store({ request }) {
    const { permissions, roles, ...data } = request.only([
      'permissions',
      'roles',
      'name',
      'document',
      'email',
      'phone',
    ]);

    const newPassword = (new Chance()).string({ length: 8 });
    const user = await User.create({ password: newPassword, ...data });

    if (permissions) {
      await user.permissions().attach(permissions);
    }

    if (roles) {
      await user.roles().attach(roles);
    }

    const random = await promisify(randomBytes)(24);
    const token = random.toString('hex');

    await user.tokens().create({
      token,
      type: 'forgot-password',
    });

    const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset/${token}`;

    Mail.send(
      'emails.welcome-user',
      { username: user.name, resetPasswordUrl },
      (message) => {
        message
          .to(user.email)
          .from(Env.get('MAIL_FOM'))
          .subject(`${Env.get('APP_NAME')} - Seja Bem-vindo`);
      },
    );

    await user.loadMany(['roles', 'permissions']);
    return user;
  }

  async update({
    guard, params, request, response,
  }) {
    const user = await User.findOrFail(params.id);

    const isAllows = await guard.allows('updateAdmin', user);
    if (!isAllows) {
      return response.status(400).json({ message: 'Você não pode editar um administrador' });
    }
    const {
      permissions, roles, ...data
    } = request.only([
      'name',
      'document',
      'email',
      'phone',
      'permissions',
      'roles',
    ]);

    user.merge(data);
    await user.save();

    if (permissions) {
      await user.permissions().sync(permissions);
    }

    if (roles) {
      await user.roles().sync(roles);
    }

    await user.loadMany(['roles', 'permissions']);
    return user;
  }

  async destroy({ params }) {
    const user = await User.findOrFail(params.id);
    await user.delete();
  }
}

module.exports = UserController;
