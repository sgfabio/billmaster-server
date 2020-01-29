const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
    groups: [{type: Schema.Types.ObjectId, ref: 'group'}],
  },
  {
    timestamps: true,
  }
);

const User = model('user', userSchema);

module.exports = User;