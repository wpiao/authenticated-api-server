'use strict';

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const notFound = require('./middlewares/404.js');
const errorHandler = require('./middlewares/500.js');
const usersRoutes = require('./routes/users-routes.js');

const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan('dev'));

// API routes
app.use(usersRoutes);

// error and not found handler
app.use('*', notFound);
app.use(errorHandler);

// exportable and testable server
module.exports = {
  server: app,
  start: port => {
    const PORT = port || process.env.PORT || 3005;
    app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
  }
}