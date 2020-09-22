/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

const _module = 'App/Modules/People';

Route.group(() => {
  Route.resource('people', 'PersonController').apiOnly()
    .validator(new Map([
      [['store'], [`${_module}/Validators/Store`]],
      [['update'], [`${_module}/Validators/Update`]],
    ]));
})
  .middleware(['auth:jwt'])
  .namespace(`${_module}/Controllers`);

module.exports = Route;
