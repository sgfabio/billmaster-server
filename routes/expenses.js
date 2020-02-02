const express = require('express');
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const Expense = require('../models/Expense');
const Group = require('../models/Groups');

router.post('/', async (req, res, next) => {
  const {
    description,
    value,
    split: {paidBy, dividedBy},
  } = req.body;

  try {
    const newExpense = await Expense.create({
      group: req.groupId,
      description,
      value,
      split: {
        paidBy,
        dividedBy,
      },
    });
    const updatedGroup = await Group.findByIdAndUpdate(
      req.groupId,
      {$push: {expenses: newExpense}},
      {new: true}
    );

    res.status(201).json({
      msg: `expense with value of ${newExpense.value} created sucessfully`,
      newExpense,
      updatedGroup,
    });
  } catch (error) {
    next(error);
  }
});

router.param('expenseId', (req, res, next, expenseIdParam) => {
  if (!mongoose.Types.ObjectId.isValid(expenseIdParam)) {
    res.status(400).json({msg: 'invalid expenseId!'});
    return;
  }
  req.expenseId = expenseIdParam;
  next();
});

router.use('/:expenseId', require('./oneExpense'));

module.exports = router;
