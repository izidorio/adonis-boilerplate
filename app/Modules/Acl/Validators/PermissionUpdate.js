'use strict';

const Antl = use('Antl');

class PermissionUpdate {
  get validateAll() {
    return true;
  }

  get rules() {
    const { id } = this.ctx.params;

    return {
      slug: `required|unique:permissions,slug,id,${id}`,
      name: 'required',
      description: 'string',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = PermissionUpdate;
