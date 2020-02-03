const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const settleSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'Group' },
    value: Number,
    paidBy: String,
    paidTo: String,
  },
  {
    timestamp: true,
  }
);

const Settle = model('Settle', settleSchema);

module.exports = Settle;
