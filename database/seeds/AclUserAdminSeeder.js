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
      {
        name: 'Criar usuários', slug: 'c-user', description: null, ...timestamps,
      },
      {
        name: 'Editar usuários', slug: 'u-user', description: null, ...timestamps,
      },
      {
        name: 'Criar Pessoas', slug: 'c-people', description: null, ...timestamps,
      },
      {
        name: 'Editar Pessoas', slug: 'u-people', description: null, ...timestamps,
      },
    ];
    await Database.table('permissions')
      .insert(permissions);

    await Database.table('roles').insert(
      {
        name: 'Administrador',
        slug: 'admin',
        description: 'Possui privilégio total',
        ...timestamps,
      },
    );

    await Database.table('permission_role').insert(
      {
        permission_id: 1,
        role_id: 1,
        ...timestamps,
      },
    );

    const person = await Factory.model('App/Modules/People/Models/Person').create({
      name: 'Izidorio Bento',
      document: '12345678901',
      gender: 'Masculino',
      ...timestamps,
    });

    const user = await Factory.model('App/Modules/Users/Models/User').make({
      email: 'izidoriojr@gmail.com',
      password: '123456',
      ...timestamps,
    });

    await person.user().save(user);
    await user.reload();

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
