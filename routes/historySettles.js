const express = require('express');
const router = express.Router({
  mergeParams: true,
});
const mongoose = require('mongoose');
// const Expense = require('../models/Expense');
const Settle = require('../models/Settle');
const Group = require('../models/Groups');

router.get('/', async (req, res, next) => {
  try {
    // devolver todos os Settles que corresponderem ao id do grupo:
    const groupAllSettles = await Settle.aggregate([
      { $match: { owner: mongoose.Types.ObjectId(req.groupId) } },
    ]);

    // const oneExpense = groupAllExpenses[0]
    console.log('groupAllSettles:', groupAllSettles)
    res.status(200).json({
      message: `All settles found:`,
      groupAllSettles, 
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
