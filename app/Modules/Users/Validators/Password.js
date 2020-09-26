'use strict';

const Antl = use('Antl');

class Update {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      password: 'required',
      new_password: 'required|confirmed|min:6',
    };
  }

  get messages() {
    const messages = Antl.list('validation');
    return {
      ...messages,
      'password.required': 'a Senha é obrigatória',
      'new_password.required': 'a nova Senha é obrigatória',
      'new_password.min': 'a nova Senha não deve ser menor que 6 dígitos',
      'new_password.confirmed': 'a confirmação da nova Senha não confere',
    };
  }
}

module.exports = Update;
