/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

const _module = 'App/Modules/Contacts';

Route.group(() => {
  Route.resource('/', 'ContactTypeController').apiOnly()
    .validator(new Map([
      [['store'], [`${_module}/Validators/Store`]],
      [['update'], [`${_module}/Validators/Update`]],
    ]));
})
  .middleware(['auth:jwt'])
  .prefix('/contact-types')
  .namespace(`${_module}/Controllers`);

module.exports = Route;
