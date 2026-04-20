const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  publicKey: String,
  status: { type: String, default: 'offline' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
