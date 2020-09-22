'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ContactType = use('App/Modules/Contacts/Models/ContactType');

class ContactTypeController {
  async index() {
    // to do
  }

  async store({ request, response }) {
    const data = request.only([
      'name',
      'icon',
      'mask',
    ]);

    const contactType = await ContactType.create(data);

    return response.status(201).json(contactType);
  }

  async show() {
    // to do
  }

  async update() {
    // todo
  }

  async destroy() {
    // todo
  }
}

module.exports = ContactTypeController;
