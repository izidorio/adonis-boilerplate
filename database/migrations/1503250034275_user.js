'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  async up() {
    await this.db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    this.create('users', (table) => {
      // table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'));
      table.increments();
      table.string('name').notNullable();
      table.string('document', 50).notNullable().unique().index();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('avatar');
      table.string('phone', 50);
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
