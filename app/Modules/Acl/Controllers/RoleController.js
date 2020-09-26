'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('Role');

class RoleController {
  async index({ auth }) {
    const user = await auth.getUser();
    const isAdmin = await user.isAdmin();

    const query = Role.query().with('permissions');

    !isAdmin && query.whereNot('slug', 'admin');

    const roles = await query.fetch();
    return roles;
  }

  async show({ params }) {
    const role = await Role.findOrFail(params.id);
    await role.load('permissions');
    return role;
  }

  async store({ request }) {
    const { permissions, ...data } = request.only(['name', 'slug', 'description', 'permissions']);

    const role = await Role.create(data);

    if (permissions) {
      await role.permissions().attach(permissions);
    }

    await role.load('permissions');

    return role;
  }

  async update({ request, params }) {
    const { permissions, ...data } = request.only(['name', 'slug', 'description', 'permissions']);

    const role = await Role.findOrFail(params.id);

    role.merge(data);
    await role.save();

    if (permissions) {
      await role.permissions().sync(permissions);
    }

    await role.load('permissions');
    return role;
  }

  async destroy({ params }) {
    const role = await Role.findOrFail(params.id);
    const data = await role.delete();
    return data;
  }
}

module.exports = RoleController;
