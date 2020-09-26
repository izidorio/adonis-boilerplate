const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  const Env = use('Env');
  const View = use('View');

  View.global('APP_NAME', () => Env.get('APP_NAME'));
});
