const express = require('express');
const router = express.Router({ mergeParams: true });

const Expense = require('../models/Expense');
const Group = require('../models/Groups');

router.post('/', (req, res, next) => {
  const {
    description,
    value,
    split: { paidBy, dividedBy },
  } = req.body;

  Expense.create({
    group: req.groupId,
    description,
    value,
    split: {
      paidBy,
      dividedBy,
    },
  })
    .then((response) =>
      Group.findByIdAndUpdate(req.groupId, { $push: { expenses: response } })
    )
    .then((response) =>
      res.status(201).json({
        msg: `expense with value of ${response.value} created sucessfully`,
        newExpense: response,
      })
    )
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

// router.param('expenseId', (req, res, next, expenseIdParam) => {
//   if (!mongoose.Types.ObjectId.isValid(expenseIdParam)) {
//     res.status(400).json({ msg: 'invalid expenseId!' });
//     return;
//   }
//   req.expenseId = expenseIdParam;
//   next();
// });

module.exports = router;