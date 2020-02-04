const express = require('express');
const router = express.Router({ mergeParams: true });
const Group = require('../models/Groups');
router.get('/', async (req, res, next) => {
  try {
    const foundGroup = await Group.findById(req.groupId).populate([
      'expenses',
      'settles',
    ]);
    res.status(200).json(foundGroup);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const { groupName } = await Group.findByIdAndDelete(req.groupId);
    res.status(200).json({
      msg: `group ${groupName} deleted sucessfully`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(req.groupId, req.body, {
      new: true,
    });
    res.status(200).json({
      msg: `${updatedGroup.groupName} updated sucessfully`,
      updatedGroup,
    });
  } catch (error) {
    next(error);
  }
});

router.use('/expenses', require('./expenses'));
router.use('/settles', require('./settles'));

module.exports = router;