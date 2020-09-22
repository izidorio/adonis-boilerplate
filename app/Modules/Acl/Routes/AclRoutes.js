/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

const _module = 'App/Modules/Acl';

Route.group(() => {
  Route.resource('permissions', 'PermissionController').apiOnly()
    .validator(new Map([
      [['store'], [`${_module}/Validators/PermissionStore`]],
      [['update'], [`${_module}/Validators/PermissionUpdate`]],
    ]))
    .middleware(new Map([
      [['store'], ['is:admin']],
      [['update'], ['is:admin']],
    ]));

  Route.resource('roles', 'RoleController').apiOnly()
    .validator(new Map([
      [['roles.store'], [`${_module}/Validators/RoleStore`]],
      [['roles.update'], [`${_module}/Validators/RoleUpdate`]],
    ]))
    .middleware(new Map([
      [['store'], ['is:admin']],
      [['update'], ['is:admin']],
    ]));
})
  .middleware(['auth:jwt'])
  .namespace(`${_module}/Controllers`);

module.exports = Route;
