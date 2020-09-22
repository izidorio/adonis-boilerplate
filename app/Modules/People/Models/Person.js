'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Person extends Model {
  /* relacionamentos */
  user() {
    return this.hasOne('App/Modules/Users/Models/User');
  }
}

module.exports = Person;
