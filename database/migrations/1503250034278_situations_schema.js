'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PersonSituationSchema extends Schema {
  up() {
    this.create('situations', (table) => {
      table.increments();

      table.uuid('person_id').notNullable();
      // table.integer('person_id').unsigned().notNullable().index();
      table.foreign('person_id').references('id').inTable('people').onDelete('cascade');

      table.string('situation_type').notNullable().index();
      table.foreign('situation_type').references('name').inTable('situation_types').onUpdate('cascade');

      table.timestamp('started_at').notNullable();
      table.timestamp('ended_at');
      table.text('description');

      table.timestamps();
    });
  }

  down() {
    this.drop('situations');
  }
}

module.exports = PersonSituationSchema;
