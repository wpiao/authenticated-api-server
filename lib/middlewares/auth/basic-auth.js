'use strict';

const base64 = require('base-64');
const users = require('../../models/users-model.js');

module.exports = (req, res, next) => {
  if(!req.headers.authorization) {
    next('invalid login details, please provide username and password!');
  } else {
    // check if the username is registered in the db
    const basic = req.headers.authorization.split(' ').pop();
    const [username, password] = base64.decode(basic).split(':');
    users.authenticateBasic(username, password)
      .then(user => {
        req.token = users.generateToken(user);
        next();
      })
      .catch(err => next(err));
  }
}