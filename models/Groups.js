const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const groupSchema = new Schema(
  {
    groupName: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    members: [String],
    description: String,
    total: Number,
    expenses: [{ type: Schema.Types.ObjectId, ref: 'expense' }],
    settles: [{ type: Schema.Types.ObjectId, ref: 'settle' }],
    date: Date,
  },
  {
    timestamp: true,
  }
);

const Group = model('group', groupSchema);

module.exports = Group;
