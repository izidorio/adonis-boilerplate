'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  async up() {
    await this.db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    this.create('users', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'));
      // table.increments();

      table.uuid('person_id').notNullable();
      // table.integer('person_id').unsigned().notNullable().index();
      table.foreign('person_id').references('id').inTable('people');

      table.string('email').notNullable().unique().index();
      table.string('password').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
