/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

const _module = 'App/Modules/Users';

Route.group(() => {
  Route.resource('/users', 'UserController').apiOnly()
    .validator(new Map([
      [['store'], [`${_module}/Validators/Store`]],
      [['update'], [`${_module}/Validators/Update`]],
    ]))
    .middleware(new Map([
      [['index'], ['can:r-user']],
      [['show'], ['can:r-user']],
      [['store'], ['can:c-user']],
      [['update'], ['can:u-user']],
    ]));

  Route.get('/me', 'ProfileController.show');
  Route.put('/profile', 'ProfileController.update')
    .validator(`${_module}/Validators/Profile`);
  Route.put('/profile/password', 'ProfileController.password')
    .validator(`${_module}/Validators/Password`);
})
  .middleware('auth')
  .namespace(`${_module}/Controllers`);

Route.get('/teste', 'UserController.teste')
  .middleware('throttle:5')
  .namespace(`${_module}/Controllers`);

module.exports = Route;
