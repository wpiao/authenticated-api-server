'use strict';

module.exports = (res, req, next) => {
  res.status(404);
  res.statusMessage = 'resource not found';
  res.json({ error: 'resource not found'});
  next();
}