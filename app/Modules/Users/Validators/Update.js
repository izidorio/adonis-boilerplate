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
    const { id } = this.ctx.params;

    return {
      name: 'required|string|min:4',
      document: `required|max:11|unique:users,document,id,${id}`,
      email: `required|unique:users,email,id,${id}`,
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

module.exports = Update;
