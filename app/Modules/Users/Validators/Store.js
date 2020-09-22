'use strict';

const Antl = use('Antl');

class Store {
  get validateAll() {
    return true;
  }

  get sanitizationRules() {
    return {
      email: 'normalize_email',
    };
  }

  get rules() {
    return {
      email: 'required|email|unique:users',
      person_id: 'required|unique:users|exists:people,id',
      password: 'string',
      roles: 'array|exists:roles,id',
      permissions: 'array|exists:permissions,id',
    };
  }

  get messages() {
    const messages = Antl.list('validation');
    return {
      ...messages,
      'person.name.required': 'o nome é obrigatório',
    };
  }
}

module.exports = Store;
