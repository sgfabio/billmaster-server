const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Group = require('../models/Groups');
const User = require('../models/User');

// TODO: proteger essas rotas com isAuth?
router.get('/', async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const foundGroups = await Group.find({ owner: userId }).populate([
      // 'expenses',
      // 'settles',
    ]);
    res.status(200).json(foundGroups);
  } catch (error) {
    next(error);
  }
});

router.post('/', (req, res, next) => {
  const { groupName, description, date } = req.body;
  const { _id: userId } = req.user;
  if (typeof userId === 'undefined') res.send('you are not loggedIn!');

  try {
    const newGroup = new Group({
      owner: userId,
      groupName,
      description,
      date,
    });
    newGroup.save();
    res.status(201).json({
      msg: `group created sucessfully`,
      newGroup,
    });
  } catch (error) {
    next(error);
  }
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
