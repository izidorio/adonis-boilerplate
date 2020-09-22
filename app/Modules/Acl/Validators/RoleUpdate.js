'use strict';

const Antl = use('Antl');

class RoleUpdate {
  get validateAll() {
    return true;
  }

  get rules() {
    const { id } = this.ctx.params;
    return {
      name: 'required',
      slug: `required|unique:roles,slug,id,${id}`,
      description: 'string',
      permissions: 'array',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = RoleUpdate;
