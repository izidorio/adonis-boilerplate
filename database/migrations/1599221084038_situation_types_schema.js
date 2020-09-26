'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SituationSchema extends Schema {
  up() {
    this.create('situation_types', (table) => {
      table.increments();
      table.string('name')
        .notNullable()
        .unique()
        .index();
      table.timestamps();
    });
  }

  down() {
    this.drop('situation_types');
  }
}

module.exports = SituationSchema;
