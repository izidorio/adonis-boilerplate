/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

const _module = 'App/Modules/Users';

Route.group(() => {
  Route.post('/login', 'AuthController.login')
    .validator(`${_module}/Validators/Login`);

  Route.post('/forgot', 'AuthController.forgot')
    .validator(`${_module}/Validators/Forgot`);

  Route.post('/reset', 'AuthController.reset')
    .validator(`${_module}/Validators/Reset`);
})
  .prefix('/auth')
  .namespace(`${_module}/Controllers`);

module.exports = Route;
