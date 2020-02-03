const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    googleID: String, // npm passport-google-oauth20 for google auth strat
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;