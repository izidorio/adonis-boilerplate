'use strict';

const Antl = use('Antl');

class Login {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      document: 'required',
      password: 'required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Login;
