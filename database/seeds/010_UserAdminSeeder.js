/* eslint-disable object-curly-newline */

'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const Database = use('Database');

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

class AclUserAdminSeeder {
  async run() {
    const permissions = [
      { name: 'Criar usuários', slug: 'c-user', description: null, ...timestamps },
      { name: 'Listar usuários', slug: 'r-user', description: null, ...timestamps },
      { name: 'Editar usuários', slug: 'u-user', description: null, ...timestamps },
      { name: 'Criar Pessoas', slug: 'c-people', description: null, ...timestamps },
      { name: 'Listar Pessoas', slug: 'r-people', description: null, ...timestamps },
      { name: 'Editar Pessoas', slug: 'u-people', description: null, ...timestamps },
    ];

    await Database.table('permissions').insert(permissions);

    const roles = [
      { name: 'Administrador', slug: 'admin', description: null, ...timestamps },
      { name: 'Coordenador', slug: 'coord', description: null, ...timestamps },
    ];

    await Database.table('roles').insert(roles);

    const permission_rule = [
      { permission_id: 1, role_id: 1, ...timestamps },
      { permission_id: 2, role_id: 1, ...timestamps },
      { permission_id: 3, role_id: 1, ...timestamps },
      { permission_id: 4, role_id: 1, ...timestamps },
      { permission_id: 5, role_id: 1, ...timestamps },
      { permission_id: 6, role_id: 1, ...timestamps },
      /** coordenador */
      { permission_id: 1, role_id: 2, ...timestamps },
      { permission_id: 2, role_id: 2, ...timestamps },
      { permission_id: 3, role_id: 2, ...timestamps },
    ];

    await Database.table('permission_role').insert(permission_rule);

    const user = await Factory.model('App/Modules/Users/Models/User').create({
      name: 'Izidorio Bento',
      email: 'izidoriojr@gmail.com',
      document: '11111111111',
      password: '123456',
      ...timestamps,

    });

    await Database.table('role_user').insert(
      {
        role_id: 1,
        user_id: user.id,
        ...timestamps,
      },
    );
  }
}

module.exports = AclUserAdminSeeder;
