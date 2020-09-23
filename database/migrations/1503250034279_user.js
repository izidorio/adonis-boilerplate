'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  async up() {
    await this.db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    this.create('users', (table) => {
      // table.increments();
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'));
      table.string('name').notNullable();
      table.string('document').notNullable().unique().index();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('phone');
      table.string('avatar');
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
