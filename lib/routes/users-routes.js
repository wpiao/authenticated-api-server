'use strict';

const express = require('express');
const users = require('../models/users-model.js');
const basicAuth = require('../middlewares/auth/basic-auth.js');
const bearerAuth = require('../middlewares/auth/bearer-auth.js');
const acl = require('../middlewares/auth/acl.js');

const usersRoutes = express.Router();

// API routes
usersRoutes.post('/signup', handleSignup);
usersRoutes.post('/signin', basicAuth, handleSignin);
usersRoutes.get('/test', bearerAuth, (req, res) => {
  res.status(200).send('test bearer auth successful!');
});
usersRoutes.post('/test-post',bearerAuth, acl('create'), (req, res) => {
  res.status(200).send('This route needs create capability otherwise access will be denied!');
});
usersRoutes.put('/test-put', bearerAuth, acl('update'), (req, res) => {
  res.status(200).send('This route needs update capability otherwise access will be denied!');
});
usersRoutes.patch('/test-patch', bearerAuth, acl('update'), (req, res) => {
  res.status(200).send('This route needs update capability otherwise access will be denied!');
});
usersRoutes.delete('/test-delete', bearerAuth, acl('delete'), (req, res) => {
  res.status(200).send('This route needs delete capability otherwise access will be denied!');
});

function handleSignup(req, res) {
  // save credentials with hashed password and then generate token and send it back to users
  users.save(req.body)
    .then(user => {
      console.log(user)
      const token = users.generateToken(user);
      res.status(200).send(token);
    })
    .catch(err => res.status(403).send(err));
}

function handleSignin(req, res) {
  res.status(200).send(req.token);
}

module.exports = usersRoutes;