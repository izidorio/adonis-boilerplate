'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

use('App/Modules/Users/Routes/AuthRoutes');
use('App/Modules/Users/Routes/UsersRoutes');
use('App/Modules/Acl/Routes/AclRoutes');

use('App/Modules/People/Routes/PeopleRoutes');
use('App/Modules/People/Routes/SituationsRoutes');

use('App/Modules/Contacts/Routes/ContactsRoutes');

use('App/Modules/Images/Routes/ImagesRoutes');

Route.get('/', () => ({ status: `is running ${new Date()}` }));
