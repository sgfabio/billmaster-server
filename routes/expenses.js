const express = require('express');
const router = express.Router();

router.post('/despesa', (req, res, next) => {
  // receber uma nova despesa de um grupo;
  const { groupId, description, value, splitObj } = req.body;
  const { paidBy, dividedByArr } = splitObj;
});

module.exports = router;
