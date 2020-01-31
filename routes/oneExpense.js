const express = require('express');
const router = express.Router({ mergeParams: true });
const Group = require('../models/Groups');
const Expense = require('../models/Expense');

router.delete('/', (req, res, next) => {
  Expense.findByIdAndDelete(req.expenseId, { useFindAndModify: false })
    .then(() => {
      Group.findByIdAndRemove(req.expenseId, { $in: 'expenses' });
      res.send('oi, rota');
    })
    .then(() =>
      res.status(200).json({
        msg: `expense deleted sucessfully & removed from group`,
      })
    );
});

router.put('/', (req, res, next) => {
  Expense.findByIdAndUpdate(req.expenseId, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((response) => {
      res.status(200).json({
        msg: `expense updated`,
        newObj: response,
      });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
