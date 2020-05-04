'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const users = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: String
});

// mongoose pre hook for save - it hashs password before save it to db
users.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 5);
});

module.exports = mongoose.model('users', users);