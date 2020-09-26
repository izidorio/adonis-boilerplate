'use strict';

class UserPolicy {
  async updateAdmin(_user, user) {
    const [_isAdmin, isAdmin] = await Promise.all([
      _user.isAdmin(),
      user.isAdmin(),
    ]);

    return _isAdmin === isAdmin;
  }

  profile(_user, user) {
    return _user.id === user.id;
  }
}

module.exports = UserPolicy;
