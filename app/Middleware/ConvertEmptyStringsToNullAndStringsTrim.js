'use strict';

class ConvertEmptyStringsToNullAndStringsTrim {
  async handle({ request }, next) {
    if (Object.keys(request.body).length) {
      request.body = Object.assign(
        ...Object.keys(request.body).map((key) => {
          if (request.body[key] !== '' && typeof request.body[key] === 'string') {
            return { [key]: request.body[key].trim() };
          }

          if (request.body[key] !== '') {
            return { [key]: request.body[key] };
          }

          return { [key]: null };
        }),
      );
    }

    await next();
  }
}

module.exports = ConvertEmptyStringsToNullAndStringsTrim;
