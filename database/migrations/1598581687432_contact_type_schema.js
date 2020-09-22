'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ContactTypeSchema extends Schema {
  up() {
    this.create('contact_types', (table) => {
      table.increments();
      table.string('name', 50).notNullable().unique();
      table.string('icon').notNullable();
      table.string('mask');
      table.timestamps();
    });
  }

  down() {
    this.drop('contact_types');
  }
}

module.exports = ContactTypeSchema;
