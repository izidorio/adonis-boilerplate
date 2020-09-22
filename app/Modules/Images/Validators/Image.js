'use strict';

const Antl = use('Antl');

class Image {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      file: 'required|file|file_ext:png,gif,jpg,jpeg,tiff,bmp|file_size:2mb|file_types:image',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Image;
