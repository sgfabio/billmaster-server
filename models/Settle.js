const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const settleSchema = new Schema(
  {
    // TODO: relacionar despesa ao grupo
    value: Number,
    group: { type: Schema.Types.ObjectId, ref: 'group' },
    paidBy: String,
    paidTo: String,
  },
  {
    timestamp: true,
  }
);

const Settle = model('settle', settleSchema);

module.exports = Settle;
