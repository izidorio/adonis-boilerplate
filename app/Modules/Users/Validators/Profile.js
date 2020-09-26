'use strict';

const Antl = use('Antl');

class Update {
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
      phone: 'required',
    };
  }

  get messages() {
    const messages = Antl.list('validation');
    return {
      ...messages,
      'phone.required': 'O Telefone é obrigatório',
    };
  }
}

module.exports = Update;
