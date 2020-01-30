const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const settleSchema = new Schema(
  {
    // TODO: relacionar despesa ao grupo
    value: Number,
    group: { type: Schema.Types.ObjectId, ref: 'group' },
    paidBy: { type: Schema.Types.ObjectId, ref: 'member' },
    paidTo: { type: Schema.Types.ObjectId, ref: 'member' },
  },
  {
    timestamp: true,
  }
);

const Settle = model('settle', settleSchema);

module.exports = Settle;
