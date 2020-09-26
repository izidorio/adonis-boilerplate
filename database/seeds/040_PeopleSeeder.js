'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

class PeopleSeeder {
  async run() {
    const people = await Factory
      .model('App/Modules/People/Models/Person')
      .createMany(10, { ...timestamps });

    const arrayPromises = people.map(async (person) => {
      await Factory
        .model('App/Modules/People/Models/Situation')
        .create({ person_id: person.id });
    });

    await Promise.all(arrayPromises);
  }
}

module.exports = PeopleSeeder;
