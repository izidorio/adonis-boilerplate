/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

const _module = 'App/Modules/Users';

Route.group(() => {
  Route.resource('/', 'UserController').apiOnly()
    .validator(new Map([
      [['store'], [`${_module}/Validators/Store`]],
      [['update'], [`${_module}/Validators/Update`]],
    ]));
})
  .middleware('auth')
  .prefix('/users')
  .namespace(`${_module}/Controllers`);

module.exports = Route;
