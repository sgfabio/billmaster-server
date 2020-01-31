const express = require('express');
const router = express.Router({ mergeParams: true });

// const mongoose = require('mongoose');
const Group = require('../models/Groups');

const { populateOneGroup } = require('../Util/groupModelHelper');

// get all info from an specific group Id
router.get('/', (req, res, next) => {
  // console.log('req ok?', req.groupId);
  Group.findById(req.groupId)
    .then((response) => populateOneGroup(response))
    .then((response) => {
      // console.log('GET one group res ok?', response);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

// TODO: Quando deletar o grupo, deletar os documentos relacionados de expenses e settles
router.delete('/', (req, res, next) => {
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

router.put('/', (req, res, next) => {
  Group.findByIdAndUpdate(req.groupId, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((response) => {
      res.status(200).json({
        msg: `group ${response.groupName} updated sucessfully`,
        newObj: response,
      });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = router;