'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

class AclUserAdmSeeder {
  async run() {
    const people = await Factory
      .model('App/Modules/People/Models/Person')
      .createMany(10, { ...timestamps });

    const arrayPromises = people.map(async (person) => {
      const user = await Factory
        .model('App/Modules/Users/Models/User')
        .make({
          password: '123456',
          ...timestamps,
        });

      await person.user().save(user);
    });

    await Promise.all(arrayPromises);
  }
}

module.exports = AclUserAdmSeeder;
