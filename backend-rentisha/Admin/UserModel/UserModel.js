// userModel.js (example of the user model)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false } 
});

module.exports = mongoose.model('User', userSchema);
