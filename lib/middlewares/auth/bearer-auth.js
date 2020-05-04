'use strict';

const users = require('../../models/users-model.js');

module.exports = (req, res, next) => {
  if(!req.headers.authorization) {
    next('Invalid login!');
  } else {
    const token = req.headers.authorization.split(' ').pop();
    users.authenticateToken(token)
      .then(validUser => {
        req.user = validUser;
        next();
      })
      .catch(err => next(err));
  }
}