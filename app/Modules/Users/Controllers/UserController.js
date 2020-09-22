'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Modules/Users/Models/User');

const Chance = use('chance');

class UserController {
  async teste({ request }) {
    return request;
  }

  async index({ request }) {
    const { page = 1, perPage = 10, filter = '' } = request.only([
      'page', 'perPage', 'filter',
    ]);

    const users = await User.query()
      .orWhere('users.email', 'iLike', `%${filter}%`)
      .orWhere('users.name', 'iLike', `%${filter}%`)
      .orWhere('users.document', 'iLike', `%${filter}%`)
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
      'person_id',
      'email',
      'password',
      'permissions',
      'roles',
    ]);

    const newPassword = (new Chance()).string({ length: 8 });
    const user = await User.create({ password: newPassword, ...data });

    if (permissions) {
      await user.permissions().attach(permissions);
    }

    if (roles) {
      await user.roles().attach(roles);
    }

    await user.loadMany(['roles', 'permissions']);
    return user;
  }

  async update({ params, request }) {
    const user = await User.findOrFail(params.id);
    const {
      permissions, roles, ...data
    } = request.only([
      'email',
      'password',
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
