'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

use('App/Modules/Users/Routes/AuthRoutes');
use('App/Modules/Users/Routes/UsersRoutes');
use('App/Modules/Acl/Routes/AclRoutes');

use('App/Modules/People/Routes/PeopleRoutes');
use('App/Modules/People/Routes/SituationsRoutes');

use('App/Modules/Contacts/Routes/ContactsRoutes');

use('App/Modules/Files/Routes/FilesRoutes');

Route.get('/', () => ({ status: `is running ${new Date()}` })).middleware('throttle:10');

const user = {
  username: 'Izidorio Bento',
  token: 'asdfasdfs',
  resetPasswordUrl: 'http://127.0.0.1:3333/email',
};

Route.get('/email', ({ view }) => view.render('emails.welcome-user', user));
