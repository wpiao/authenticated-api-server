'use strict';

module.exports = (err, req, res, next) => {
  res.status(500);
  res.statusMessage = err;
  res.json({ error: err });
  next();
}