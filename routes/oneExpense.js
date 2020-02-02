const express = require('express');
const router = express.Router({mergeParams: true});
const Group = require('../models/Groups');
const Expense = require('../models/Expense');

// TODO: testar criando uma rota GET
router.delete('/', (req, res, next) => {
  Expense.findByIdAndDelete(req.expenseId)
    .then(() => {
      Group.findByIdAndRemove(req.expenseId, {$in: 'expenses'});
      // res.send('oi, rota');
    })
    .then(() =>
      res.status(200).json({
        msg: `expense deleted sucessfully & removed from group`,
      })
    );
});

router.put('/', async (req, res, next) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.expenseId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      msg: `expense with the value of ${updatedExpense.value} updated`,
      updatedExpense,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
