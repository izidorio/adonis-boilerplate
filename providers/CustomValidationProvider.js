'use strict';

const { ServiceProvider } = require('@adonisjs/fold');

class CustomValidationProvider extends ServiceProvider {
  async existsFn(data, field, message, args, get) {
    const Database = use('Database');
    const value = get(data, field);
    if (!value) {
      /**
       * skip validation if value is not defined. `required` rule
       * should take care of it.
       */
      return;
    }

    const [table, column] = args;

    if (typeof value === 'object' && Array.isArray(value)) {
      const [{ count }] = await Database
        .from(table)
        .whereIn(column, value)
        .countDistinct(column);

      if (parseInt(count, 10) !== value.length) {
        throw message;
      }
    } else {
      const row = await Database
        .table(table)
        .where(column, value)
        .first();

      if (!row) {
        throw message;
      }
    }
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    const Validator = use('Validator');
    Validator.extend('exists', this.existsFn.bind(this));
  }
}

module.exports = CustomValidationProvider;
