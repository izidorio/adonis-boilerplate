'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
const SituationType = use('App/Modules/People/Models/SituationType');

class SituationTypeController {
  async index() {
    const data = await SituationType.all();
    return data;
  }

  async store({ request }) {
    const data = request.only(['name']);
    const situationType = await SituationType.create(data);

    return situationType;
  }

  async update({ params, request }) {
    const data = request.only(['name']);
    const situationType = await SituationType.findOrFail(params.id);

    situationType.merge(data);
    await situationType.save();

    return situationType;
  }

  async destroy({ params }) {
    const situationType = await SituationType.findOrFail(params.id);
    const data = await situationType.delete();

    return data;
  }
}

module.exports = SituationTypeController;
