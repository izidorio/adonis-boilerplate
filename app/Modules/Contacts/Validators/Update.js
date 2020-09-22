'use strict';

const Antl = use('Antl');

class Update {
  get validateAll() {
    return true;
  }

  get rules() {
    const { id } = this.ctx.params;

    return {
      name: `required|unique:contact_types,name,id,${id}`,
      icon: 'required',
      mask: 'string',
    };
  }

  get messages() {
    const messages = Antl.list('validation');
    return {
      ...messages,
    };
  }
}

module.exports = Update;
