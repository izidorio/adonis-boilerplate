'use strict';

const Antl = use('Antl');

class Store {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required|max:50|unique:contact_types',
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

module.exports = Store;
