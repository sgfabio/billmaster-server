const express = require('express');
const router = express.Router({
  mergeParams: true,
});
const mongoose = require('mongoose');
const Expense = require('../models/Expense');
const Settle = require('../models/Settle');
const Group = require('../models/Groups');

router.get('/', async (req, res, next) => {
  console.log('oi, rota');
  console.log('group id:', req.groupId);
  // devolver todos os Expenses e Settles que corresponderem ao id do grupo:
  const queryPaidByMemberFromExpenses = await Expense.aggregate([
    { $match: { owner: mongoose.Types.ObjectId(req.groupId) } },
    { $group: { _id: '$split.paidBy', paidByTotal: { $sum: '$value' } } },
  ]);
  console.log(
    'retorno do paid by members from expenses:',
    queryPaidByMemberFromExpenses
  );

  // teste
  const queryShareByMemberFromExpenses = await Expense.aggregate([
    { $match: { owner: mongoose.Types.ObjectId(req.groupId) } },
    { $group: { _id: '$split.dividedBy', total: { $sum: '$value' } } },
    {
      $addFields: {
        valuePerMember: { $divide: ['$total', { $size: '$_id' }] },
      },
    },
    { $project: { total: 0 } },
    { $unwind: '$_id' },
    { $group: { _id: '$_id', share: { $sum: '$valuePerMember' } } },
  ]);
  console.log(
    'queryShareByMemberFromExpenses:',
    queryShareByMemberFromExpenses
  );

  const queryPaidByMemberFromSettles = await Settle.aggregate([
    { $match: { owner: mongoose.Types.ObjectId(req.groupId) } },
    { $group: { _id: '$paidBy', paidByTotal: { $sum: '$value' } } },
  ]);
  console.log(
    'retorno de paid by members from settles:',
    queryPaidByMemberFromSettles
  );

  const queryPaidToMemberFromSettles = await Settle.aggregate([
    { $match: { owner: mongoose.Types.ObjectId(req.groupId) } },
    { $group: { _id: '$paidTo', paidToTotal: { $sum: '$value' } } },
  ]);
  console.log(
    'retorno de paid to members from settles:',
    queryPaidToMemberFromSettles
  );

  const listOfGroupMembers = await Group.findById(req.groupId).distinct(
    'members'
  );
  console.log(listOfGroupMembers);

  // listOfGroupMembers.forEach((member) => {

  // })

});

module.exports = router;
