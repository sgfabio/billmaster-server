const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
    groups: [{type: Schema.Types.ObjectId, ref: 'group'}],
    // *** Social Login ***
    //We are going to use passport-google-oauth20 npm package. This npm package is based on the Passport strategy for authenticating with Google using the OAuth 2.0 API.
    googleID: String // For Google OAuth
  },
  {
    timestamps: true,
  }
);

const User = model('user', userSchema);

module.exports = User;