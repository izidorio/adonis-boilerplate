'use strict';

const Antl = use('Antl');

class RoleStore {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      slug: 'required|unique:roles',
      name: 'required',
      description: 'string',
      permissions: 'array',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = RoleStore;
