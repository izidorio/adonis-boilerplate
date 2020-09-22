'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Person = use('App/Modules/People/Models/Person');
const Database = use('Database');

class PersonController {
  async index({ request }) {
    const { page = 1, perPage = 10, filter = '' } = request.only(['page', 'perPage', 'filter']);

    const people = await Database
      .select('people.id')
      .from('people')
      .orWhere('people.name', 'iLike', `%${filter}%`)
      .paginate(page, perPage);

    const ids = people.data.map((peopleItem) => peopleItem.id);

    const relationships = await Person.query()
      .whereIn('id', ids)
      .fetch();

    return { ...people, data: relationships };
  }

  async show({ params }) {
    const people = await Person.findOrFail(params.id);
    // await people.loadMany(['']);
    return people;
  }

  async store({ request }) {
    const data = request.only([
      'name',
      'nickname',
      'birthday',
      'year_birth',
      'gender',
      'mather',
      'father',
      'document',
      'document_secondary',
      'place_birth',
      'description',
    ]);

    const people = await Person.create(data);

    return people;
  }

  async update({ params, request }) {
    const person = await Person.findOrFail(params.id);
    const data = request.only([
      'name',
      'nickname',
      'birthday',
      'year_birth',
      'gender',
      'mather',
      'father',
      'document',
      'document_secondary',
      'place_birth',
      'description',
    ]);

    person.merge(data);
    await person.save();

    return person;
  }
}

module.exports = PersonController;
