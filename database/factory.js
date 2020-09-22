'use strict';

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Modules/People/Models/Person', (faker, i, data = {}) => {
  const uf = ['RJ', 'SP', 'ES'];
  const gender = ['Masculino', 'Feminino'];

  return ({
    name: faker.name({ middle: true }),
    nickname: faker.username(),
    birthday: faker.birthday(),
    year_birth: faker.integer({ min: 1940, max: 2010 }),
    gender: gender[faker.integer({ min: 0, max: 1 })],
    mather: faker.name({ gender: 'female' }),
    father: faker.name({ gender: 'male' }),
    document: faker.cpf().replace(/\D/g, ''),
    document_secondary: faker.ssn({ dashes: false }),
    place_birth: uf[faker.integer({ min: 0, max: 2 })],
    description: faker.sentence({ words: 5 }),
    ...data,
  });
});

Factory.blueprint('App/Modules/Users/Models/User', (faker, i, data = {}) => ({
  email: faker.email(),
  password: faker.string(),
  ...data,
}));

Factory.blueprint('App/Modules/People/Models/Situation', (faker, i, data = {}) => {
  const situationType = ['Morto', 'Desaparecido'];

  return ({
    person_id: 1,
    situation_type: situationType[faker.integer({ min: 0, max: 2 })],
    started_at: new Date(),
    ...data,
  });
});

Factory.blueprint('App/Modules/Users/Models/Token', (faker, i, data = {}) => ({
  type: data.type || 'refreshtoken',
  token: faker.string({ length: 24 }),
  ...data,
}));
