/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

const _module = 'App/Modules/TODO';

Route.group(() => {
  Route.resource('/', 'TODOController').apiOnly()
    .validator(new Map([
      [['store'], [`${_module}/Validators/Store`]],
      [['update'], [`${_module}/Validators/Update`]],
    ]))
    .middleware(new Map([
      [['index'], ['can:r-user']],
      [['store'], ['can:c-user']],
      [['update'], ['can:u-admin']],
    ])); // ACL permission with route
})
  .middleware(['auth:jwt', 'is:manager']) // ACL rule all group
  .prefix('/users')
  .namespace(`${_module}/Controllers`);

module.exports = Route;

/**
 * fazer o import das rotas em: start/routes.js
 * use('App/Modules/Users/Routes/<Name>Routes');
 * */
