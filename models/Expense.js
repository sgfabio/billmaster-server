const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const expenseSchema = new Schema(
  {
    group: { type: Schema.Types.ObjectId, ref: 'group', required: true },
    description: { type: String, required: true },
    value: { type: Number, required: true },
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
