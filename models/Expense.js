const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const expenseSchema = new Schema(
  {
    // TODO: relacionar despesa ao grupo
    description: String,
    value: Number,
    split: {
      paidBy: { type: Schema.Types.ObjectId, ref: 'member' },
      dividedBy: [{ type: Schema.Types.ObjectId, ref: 'member' }],
    },
    // TODO: método getter que resolve divisão. Checa checked.
  },
  {
    timestamp: true,
  }
);

const Expense = model('expense', expenseSchema);

module.exports = Expense;
