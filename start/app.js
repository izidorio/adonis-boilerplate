'use strict';

const path = require('path');

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/vow/providers/VowProvider',
  '@adonisjs/mail/providers/MailProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/validator/providers/ValidatorProvider',
  '@adonisjs/antl/providers/AntlProvider',
  'adonis-acl/providers/AclProvider',
  path.join(__dirname, '..', 'providers', 'CustomValidationProvider'),
];

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  'adonis-acl/providers/CommandsProvider',
];

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  Role: 'Adonis/Acl/Role',
  Permission: 'Adonis/Acl/Permission',
};

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = [];

module.exports = {
  providers,
  aceProviders,
  aliases,
  commands,
};