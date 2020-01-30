const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Group = require('../models/Groups');

const populateGroup = require('../Util/groupModelHelper');

// TODO: proteger essas rotas com isAuth?

// TODO: testar se o populate está funcionando quando houver os outros CRUDs

// todos os grupos do owner x?
router.get('/', (req, res, next) => {
  const { _id: userId } = req.user;
  Group.find({ owner: userId })
    .then((response) => populateGroup(response))
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const { groupName, description, date } = req.body;
  const { _id: userId } = req.user;
  if (typeof userId === 'undefined') res.send('you are not loggedIn!');
  Group.create({
    groupName,
    owner: userId,
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
  Group.findById(req.groupId)
    .then((response) => populateGroup(response))
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.delete('/:groupId', (req, res, next) => {
  Group.findByIdAndDelete(req.groupId)
    .then((response) =>
      res.status(200).json({
        msg: `group ${response.groupName} deleted sucessfully`,
        deletedGroup: response,
      })
    )
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.put('/:groupId', (req, res, next) => {
  Group.findByIdAndUpdate(req.groupId, req.body)
    .then((response) => {
      res
        .status(200)
        .json({ msg: `group ${response.groupName} updated sucessfully` });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
