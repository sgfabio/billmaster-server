const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const expenseSchema = new Schema(
  {
    group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    description: { type: String, required: true },
    value: { type: Number, required: true },
    split: {
      paidBy: String,
      dividedBy: [String],
    },
  },
  {
    timestamp: true,
  }
);

const Expense = model('Expense', expenseSchema);

module.exports = Expense;
