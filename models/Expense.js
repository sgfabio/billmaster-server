const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const expenseSchema = new Schema(
  {
    // TODO: relacionar despesa ao grupo
    group: { type: Schema.Types.ObjectId, ref: 'group' },
    description: String,
    value: Number,
    split: {
      paidBy: String,
      dividedBy: [String],
    },
    // TODO: método getter que resolve divisão. Checa checked.
  },
  {
    timestamp: true,
  }
);

const Expense = model('expense', expenseSchema);

module.exports = Expense;
