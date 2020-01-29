const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const memberSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  // paid: [Number],
  // toSettle: [Number],
});

const Member = model('member', memberSchema);

module.exports = Member;
