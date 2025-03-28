// filepath: backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  ageGroup: { type: String, required: true },
  gender: { type: String, required: true },
  score: { type: Number, required: true },
  result: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
