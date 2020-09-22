'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Situation = use('App/Modules/People/Models/Situation');
const Database = use('Database');

class SituationController {
  async index({ request }) {
    const { page = 1, perPage = 10, filter = '' } = request
      .only(['page', 'perPage', 'filter']);

    const situations = await Database
      .select('situations.id')
      .from('situations')
      .orWhere('people.name', 'iLike', `%${filter}%`)
      .paginate(page, perPage);

    const ids = situations.data.map((peopleItem) => peopleItem.id);

    const relationships = await Situation.query()
      .whereIn('id', ids)
      .fetch();

    return { ...situations, data: relationships };
  }

  async show({ params }) {
    const situation = await Situation
      .query().with('person').where('id', params.id).firstOrFail();

    return situation;
  }

  async store({ request }) {
    const data = request.only([
      'person_id',
      'situation_type',
      'place_birth',
      'description',
    ]);

    const situation = await Situation.create(data);

    return situation;
  }

  async update({ params, request }) {
    const situation = await Situation.findOrFail(params.id);
    const data = request.only([
      'person_id',
      'situation_type',
      'place_birth',
      'description',
    ]);

    situation.merge(data);
    await situation.save();
    await situation.load('person');

    return situation;
  }

  async destroy({ params }) {
    const situation = await Situation.findByOrFail(params.id);
    const data = await situation.delete();

    return data;
  }
}

module.exports = SituationController;
