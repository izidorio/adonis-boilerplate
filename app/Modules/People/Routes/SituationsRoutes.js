/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

const _module = 'App/Modules/People';

Route.group(() => {
  Route.resource('situations', 'SituationController').apiOnly()
    .validator(new Map([
      [['store'], [`${_module}/Validators/SituationStore`]],
      [['update'], [`${_module}/Validators/SituationUpdate`]],
    ]));

  /** Situation Types */
  Route.get('situation-types', 'SituationTypeController.index');
  Route.resource('system/situation-types', 'SituationTypeController')
    .apiOnly()
    .middleware('is:admin');
})
  .middleware(['auth:jwt'])
  .namespace(`${_module}/Controllers`);

module.exports = Route;
