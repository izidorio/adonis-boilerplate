'use strict';

const Antl = use('Antl');

class PermissionStore {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      slug: 'required|unique:permissions',
      name: 'required',
      description: 'string',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = PermissionStore;
