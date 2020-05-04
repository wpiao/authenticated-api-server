'use strict';

const schema = require('./users-schema.js');
const model = require('./model.js');

class Users extends model {
  constructor() {
    super(schema);
  }

  // custom methods for Users class
}

module.exports = new Users();