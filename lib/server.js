'use strict';

const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(express.json());

// exportable and testable server
module.exports = {
  server: app,
  start: port => {
    const PORT = port || process.env.PORT || 3005;
    app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
  }
}