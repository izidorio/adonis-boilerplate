'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Database = use('Database');

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

class SituationTypesSeeder {
  async run() {
    const situations = [
      { name: 'Foragido', ...timestamps },
      { name: 'Desaparecido', ...timestamps },
      { name: 'Morto', ...timestamps },
    ];

    await Database.table('situation_types')
      .insert(situations);
  }
}

module.exports = SituationTypesSeeder;
