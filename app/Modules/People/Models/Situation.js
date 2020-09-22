'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Situation extends Model {
  /* relacionamentos */
  person() {
    return this.belongsTo('App/Modules/People/Models/Person');
  }
}

module.exports = Situation;
