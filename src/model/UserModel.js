const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  createDate: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userModel);

module.exports = User;
