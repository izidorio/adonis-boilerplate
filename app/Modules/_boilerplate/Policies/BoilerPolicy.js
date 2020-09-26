'use strict';

class EntityPolicy {
  show(entity, user) {
    return entity.id === user.id;
  }
}

module.exports = EntityPolicy;

/* eslint-disable max-len */
/** lembrar de Anexar a Policy ao Model
 *  em start/acl.js adicione:
 *  Gate.policy('App/Modules/<MODULE>/Models/<Entity>', 'App/Modules/<MODULE>/Policies/<Entity>Policy')
*/
