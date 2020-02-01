const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Group = require('../models/Groups');


// TODO: proteger essas rotas com isAuth?

router.get('/', (req, res, next) => {
  const { _id: userId } = req.user;
  Group.find({ owner: userId })
    .populate([
      'expenses',
      // 'settles',
    ])
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post('/', (req, res, next) => {
  console.log(req.body)
  const { groupName, description, date } = req.body;
  console.log('ok?', groupName)
  const { _id: userId } = req.user;
  if (typeof userId === 'undefined') res.send('you are not loggedIn!');
  Group.create({
    groupName,
    owner: userId,
    description,
    date,
  })
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.param('groupId', (req, res, next, groupIdParam) => {
  if (!mongoose.Types.ObjectId.isValid(groupIdParam)) {
    res.status(400).json({ msg: 'invalid groupId!' });
    return;
  }
  req.groupId = groupIdParam;
  next();
});

router.use('/:groupId', require('./oneGroup'));

module.exports = router;
