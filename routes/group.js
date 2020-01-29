const express = require('express');
const router = express.Router();

const Group = require('../models/Groups');

router.post('/', (req, res, next) => {
  // const { groupName, owner, description, date } = req.body;
  console.log('meu req user:', req.user)
  // const {_id: id} = req.user
  // Group.create({
  //   groupName,
  //   owner,
  //   description,
  //   date,
  // })
  //   .then((response) => {
  //     res.json(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     next(error);
  //   });
});

module.exports = router;
