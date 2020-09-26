'use strict';

const Gate = use('Gate');

Gate.policy('App/Modules/Users/Models/User', 'App/Modules/Users/Policies/UserPolicy');
