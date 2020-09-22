'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const Env = use('Env');

class Image extends Model {
  static get hidden() {
    return ['created_at', 'updated_at'];
  }

  /** virtual field */
  static get computed() {
    return ['image_url'];
  }

  /** mutator */
  getImageUrl({ path }) {
    return `${Env.get('APP_URL')}/images/${path}`;
  }
}

module.exports = Image;
