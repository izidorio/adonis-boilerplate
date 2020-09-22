'use strict';

const { test, trait } = use('Test/Suite')('Contact Types');
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions'); // to reset database

test('it should be able create contact types', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/contact-types')
    .loginVia(user, 'jwt')
    .send({
      name: 'Celular',
      icon: 'phone.icon',
      mask: 'mask',
    })
    .end();
  response.assertStatus(201);
});
