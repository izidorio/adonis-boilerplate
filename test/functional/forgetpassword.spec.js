'use strict';

const Mail = use('Mail');
const { test, trait } = use('Test/Suite')('ForGetPassword');
const { subHours, subMinutes } = require('date-fns');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions'); // to reset database

test('it should send e-mail with forgot password instructions', async ({ assert, client }) => {
  Mail.fake();

  const email = 'izidoriojr@gmail.com';

  const user = await Factory.model('App/Models/User').create({ email });

  await client
    .post('/auth/forgot')
    .send({ email })
    .end();

  const token = await user.tokens().first();

  const recentEmail = Mail.pullRecent();

  assert.equal(recentEmail.message.to[0].address, email);

  assert.include(token.toJSON(), {
    type: 'forgot-password',
  });

  Mail.restore();
});

test('it should be able reset password', async ({ assert, client }) => {
  const email = 'izidoriojr@gmail.com';

  const user = await Factory.model('App/Models/User').create({ email });
  const userToken = await Factory.model('App/Models/Token').make();

  await user.tokens().save(userToken);

  const response = await client.post('/auth/reset')
    .send({
      token: userToken.token,
      password: '654321',
      password_confirmation: '654321',
    })
    .end();

  response.assertStatus(204);

  await user.reload();

  const checkPassword = await Hash.verify('654321', user.password);

  assert.isTrue(checkPassword);
});

test('it cannot reset password after 2h of forgot password request', async ({ client }) => {
  const email = 'izidoriojr@gmail.com';

  const user = await Factory.model('App/Models/User').create({ email });
  const userToken = await Factory.model('App/Models/Token').make({
    created_at: subMinutes(subHours(new Date(), 2), 10),
  });

  await user.tokens().save(userToken);

  const response = await client.post('/auth/reset')
    .send({
      token: userToken.token,
      password: '654321',
      password_confirmation: '654321',
    })
    .end();

  response.assertStatus(400);
});
