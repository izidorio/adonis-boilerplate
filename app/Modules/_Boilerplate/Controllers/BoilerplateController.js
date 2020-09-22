'use strict';

/* eslint-disable no-unused-vars */

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Entity = use('App/Modules/TODO/Models/Entity');

class BoilerplateController {
  /** REMOVER O  eslint-disable DO INÍCIO DO ARQUIVO
   *  Importar o modelo
  */

  async index({ request }) {
    // TODO
  }

  async store({ request, response }) {
    // TODO
  }

  async show({ params, request, response }) {
    // TODO
  }

  async update({ params, request, response }) {
    // TODO
  }

  async destroy({ params, request, response }) {
    // TODO
  }
}

module.exports = BoilerplateController;
