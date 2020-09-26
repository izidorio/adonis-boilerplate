'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

class AclUserAdmSeeder {
  async run() {
    await Factory
      .model('App/Modules/Users/Models/User')
      .createMany(10, { password: '123456', ...timestamps });
  }
}

module.exports = AclUserAdmSeeder;
