/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

const _module = 'App/Modules/Images';

Route.group(() => {
  Route.post('/', 'ImageController.store')
    .validator(`${_module}/Validators/Image`);

  Route.get('/:file', 'ImageController.show');
})
  .middleware(['auth:jwt'])
  .prefix('/images')
  .namespace(`${_module}/Controllers`);

module.exports = Route;
