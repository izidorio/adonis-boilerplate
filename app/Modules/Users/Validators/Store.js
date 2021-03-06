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
      name: 'required|string|min:4',
      document: 'required|max:11|unique:users',
      email: 'required|email|unique:users',
      phone: 'required|string',
      roles: 'array|exists:roles,id',
      permissions: 'array|exists:permissions,id',
    };
  }

  get messages() {
    const messages = Antl.list('validation');
    return {
      ...messages,
      'document.max': 'O CPF não está no formato válido. Enviar apenas números',
    };
  }
}

module.exports = Store;
