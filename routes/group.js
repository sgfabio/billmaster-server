const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Group = require('../models/Groups');

router.post('/', (req, res, next) => {
  const { groupName, description, date } = req.body;
  const { _id: owner } = req.user;
  if (typeof owner === 'undefined') res.send('you are not loggedIn!');
  Group.create({
    groupName,
    owner,
    description,
    date,
  })
    .then((response) => {
      res.json(response);
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

// get all info from an specific group Id
router.get('/:groupId', (req, res, next) => {
  console.log('groupId:', req.groupId);
  Group.findById(req.groupId)
    .then((response) => {
      return response.map((e) => {
        e.populate(['members, expenses, settles']);
      });
    })
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    });
});

module.exports = router;