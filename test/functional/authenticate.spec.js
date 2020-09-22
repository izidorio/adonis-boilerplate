'use strict';

const { test, trait } = use('Test/Suite')('Authenticate');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions'); // to reset database

test('it should return JWT token when session created', async ({ assert, client }) => {
  const authPayload = {
    email: 'izidoriojr@gmail.com',
    password: '123456',
  };

  await Factory
    .model('App/Models/User')
    .create(authPayload);

  const response = await client
    .post('/auth/login')
    .send({
      email: 'izidoriojr@gmail.com',
      password: '123456',
    })
    .end();
  response.assertStatus(200);
  assert.exists(response.body.token);
});
