'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PeopleSchema extends Schema {
  async up() {
    await this.db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    this.create('people', (table) => {
      // table.increments();
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'));
      table.string('name');
      table.string('nickname');
      table.date('birthday');
      table.integer('year_birth');
      table.string('gender', 30);
      table.string('mather');
      table.string('father');
      table.string('document', 50).unique().index();
      table.string('document_secondary', 50).unique();
      table.string('place_birth');
      table.text('description');
      table.timestamps();
    });
  }

  down() {
    this.drop('people');
  }
}

module.exports = PeopleSchema;
