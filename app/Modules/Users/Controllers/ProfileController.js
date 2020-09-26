'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

class UserController {
  async show({ guard, auth, response }) {
    const user = await auth.getUser();

    if (guard.denies('profile', user)) {
      return response.status(400).json({ message: 'Você só pode editar o próprio perfil.' });
    }

    await user.loadMany(['roles', 'permissions']);
    return user;
  }

  async update({ request, auth }) {
    const user = await auth.getUser();
    const { ...data } = request.only([
      'name',
      'phone',
    ]);

    user.merge(data);
    await user.save();

    await user.loadMany(['roles', 'permissions']);
    return user;
  }

  async password({ request, auth, response }) {
    const user = await auth.getUser();

    const { password, new_password } = request.only([
      'password',
      'new_password',
    ]);

    try {
      await auth.attempt(user.document, password);
    } catch (e) {
      return response.status(400)
        .json({ message: 'A senha atual não confere.' });
    }

    user.merge({ password: new_password });
    await user.save();

    await user.loadMany(['roles', 'permissions']);
    return user;
  }
}

module.exports = UserController;
