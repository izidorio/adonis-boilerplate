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
      email: `required|unique:users,email,id,${id}`,
      password: 'string',
      'person.name': 'required',
      'person.document': `required|unique:people,document,id,${id}`,
      roles: 'array|exists:roles,id',
      permissions: 'array|exists:permissions,id',
    };
  }

  get messages() {
    const messages = Antl.list('validation');
    return {
      ...messages,
      'person.name.required': 'o nome é obrigatório',
      'person.document.required': 'o CPF é obrigatório',
      'person.document.unique': 'o CPF já está em uso',
    };
  }
}

module.exports = Update;
