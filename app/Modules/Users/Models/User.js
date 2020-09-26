'use strict';

const Database = use('Database');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class User extends Model {
  static get hidden() {
    return ['password', 'created_at', 'updated_at'];
  }

  /* hooks */
  static boot() {
    super.boot();

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  /* ACL métodos */
  static get traits() {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission',
    ];
  }

  /** métodos */
  async authorizations() {
    const roles = await this.roles().fetch();
    const permissions = await this.permissions().fetch();

    const rolesSlug = roles
      ? roles.rows.map((role) => role.slug)
      : [];

    const rolesId = roles
      ? roles.rows.map((role) => role.id)
      : [];

    const permissionsId = permissions
      ? permissions.rows.map((permission) => permission.id)
      : [];

    const permissionsSlug = await Database
      .from('permissions')
      .leftJoin('permission_role', 'permission_role.permission_id', 'permissions.id')
      .whereIn('permission_role.role_id', [...rolesId, ...permissionsId])
      .pluck('permissions.slug');

    return { roles: rolesSlug, permissions: permissionsSlug };
  }

  async authorizationsId() {
    const roles = await this.roles().fetch();
    const permissions = await this.permissions().fetch();

    const rolesId = roles
      ? roles.rows.map((role) => role.id)
      : [];

    const permissionsId = permissions
      ? permissions.rows.map((permission) => permission.id)
      : [];

    const permissionsAllId = await Database
      .from('permissions')
      .leftJoin('permission_role', 'permission_role.permission_id', 'permissions.id')
      .whereIn('permission_role.role_id', [...rolesId, ...permissionsId])
      .pluck('permissions.id');

    return { roles: rolesId, permissions: permissionsAllId };
  }

  async isAdmin() {
    const rules = await this.getRoles();

    return rules.some((rule) => rule === 'admin');
  }

  /* relacionamentos */
  roles() {
    return this.belongsToMany('Adonis/Acl/Role');
  }

  permissions() {
    return this.belongsToMany('Adonis/Acl/Permission');
  }

  tokens() {
    return this.hasMany('App/Modules/Users/Models/Token');
  }
}

module.exports = User;
