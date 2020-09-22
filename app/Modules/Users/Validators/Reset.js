'use strict';

// const Antl = use('Antl');

class Reset {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      token: 'required|exists:tokens,token',
      password: 'required|confirmed',
    };
  }

  get messages() {
    return {
      'token.required': 'Informe o token',
      'token.exists': 'Você está tentando usar um token inválido',
      'password.required': 'Informe a senha',
    };
  }
}

module.exports = Reset;
