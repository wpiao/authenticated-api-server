'use strict';

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const schema = require('./users-schema.js');
const model = require('./model.js');

dotenv.config();

class Users extends model {
  constructor() {
    super(schema);
  }

  // custom methods for Users class
  async save(record) {
    // check if the username is registered in the db
    const queryObject = { username: record.username };
    const findResult = await this.schema.find(queryObject);
    if (!findResult.length) {
      // if the username is not registered in db, then hash given password and save it to db
      // use mongoose pre hook to hash the password before save it to dab
      return this.create(record);
    } else {
      return Promise.reject('This username has already been used, use other username to signup!');
    }
  }

  generateToken(user) {
    const token = jwt.sign({ username: user.username }, process.env.SECRET);
    return token;
  }
}

module.exports = new Users();