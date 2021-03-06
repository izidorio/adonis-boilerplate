'use strict';

const Antl = use('Antl');

class Store {
  get validateAll() {
    return true;
  }

  get sanitizationRules() {
    return {
      name: 'trim|strip_tags',
      nickname: 'trim|strip_tags',
      year_birth: 'to_int',
      mather: 'trim|strip_tags',
      father: 'trim|strip_tags',
      document: 'to_int',
      document_secondary: 'trim|strip_tags',
      place_birth: 'trim|strip_tags',
      description: 'trim|strip_tags',
    };
  }

  get rules() {
    return {
      name: 'string',
      nickname: 'string',
      birthday: 'date_format:YYYY-MM-DD',
      year_birth: 'min:4|number',
      gender: 'string|in:Masculino,Feminino',
      mather: 'string',
      father: 'string',
      document: 'min:11|unique:people',
      document_secondary: 'string|unique:people',
      place_birth: 'string',
      description: 'string',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Store;
