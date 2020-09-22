'use strict';

const { test, trait } = use('Test/Suite')('Image');
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const Helper = use('Helpers');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions'); // to reset database

test('it should be able upload image', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/images')
    .loginVia(user, 'jwt')
    .field('name', 'Nome')
    .field('description', 'Descrição')
    .attach('file', Helper.tmpPath('test/image.jpg'))
    .end();

  response.assertStatus(201);
  assert.exists(response.body.path);
});
