'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Modules/Users/Models/User');
const Database = use('Database');

const Chance = use('chance');

class UserController {
  async teste({ request }) {
    return request;
  }

  async index({ request }) {
    const { page = 1, perPage = 10, filter = '' } = request.only([
      'page', 'perPage', 'filter',
    ]);

    const users = await Database
      .select('users.id')
      .from('users')
      .leftJoin('people', 'users.person_id', 'people.id')
      .orWhere('users.email', 'iLike', `%${filter}%`)
      .orWhere('people.name', 'iLike', `%${filter}%`)
      .orWhere('people.document', 'iLike', `%${filter}%`)
      .paginate(page, perPage);

    const ids = users.data.map((user) => user.id);

    const relationships = await User.query()
      .whereIn('id', ids)
      .with('person')
      .with('roles')
      .with('permissions')
      .fetch();

    return { ...users, data: relationships };
  }

  async show({ params }) {
    const user = await User.findOrFail(params.id);
    await user.loadMany(['person', 'roles', 'permissions']);
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

    await user.loadMany(['person', 'roles', 'permissions']);
    return user;
  }

  async update({ params, request }) {
    const user = await User.findOrFail(params.id);
    const {
      permissions, roles, person, ...data
    } = request.only([
      'email',
      'password',
      'permissions',
      'person',
      'roles',
    ]);

    const _person = {
      name: person.name,
      nickname: person.nickname,
      birthday: person.birthday,
      document: person.document.replace(/\D/g, ''),
      document_secondary: person.document_secondary,
      mather: person.mather,
      father: person.father,
      gender: person.gender,
      description: person.description,
    };

    user.merge(data);
    await user.save();

    if (person) {
      await user.person().update(_person);
    }

    if (permissions) {
      await user.permissions().sync(permissions);
    }

    if (roles) {
      await user.roles().sync(roles);
    }

    await user.loadMany(['person', 'roles', 'permissions']);
    return user;
  }

  async destroy({ params }) {
    const user = await User.findOrFail(params.id);
    await user.delete();
  }
}

module.exports = UserController;
