const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = model('user', userSchema);

module.exports = User;