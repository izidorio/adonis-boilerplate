'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Image = use('App/Modules/Images/Models/Image');

const Helpers = use('Helpers');
const { uuid } = require('uuidv4');

class ImageController {
  async store({ request, response }) {
    const { name, description } = request.only([
      'name',
      'description',
    ]);

    const file = request.file('file', {
      types: ['image'],
      size: '2mb',
    });

    await file.move(Helpers.tmpPath('uploads/images'), {
      name: `${uuid()}.${file.subtype}`,
    });

    if (!file.moved()) {
      return file.error();
    }

    const image = await Image.create({
      name,
      path: file.fileName,
      description,
    });

    return response.status(201).json(image);
  }

  async show({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/images/${params.file}`));
  }
}

module.exports = ImageController;
