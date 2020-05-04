'use strict';

const users = require('../../models/users-model.js');

module.exports = (capability) => {
  return (req, res, next) => {
    if (req.user.capabilities.includes(capability)) {
      next();
    } else {
      next('access denied!');
    }
  }
};