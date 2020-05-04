'use strict';

const express = require('express');
const users = require('../models/users-model.js');

const usersRoutes = express.Router();

// API routes
usersRoutes.post('/signup', handleSignup);

function handleSignup(req, res) {
  // save credentials with hashed password and then generate token and send it back to users
  users.save(req.body)
    .then(user => {
      const token = users.generateToken(user);
      res.status(200).send(token);
    })
    .catch(err => res.status(403).send(err));

}

module.exports = usersRoutes;