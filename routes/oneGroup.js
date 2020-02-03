const express = require('express');
const router = express.Router({ mergeParams: true });
const Group = require('../models/Groups');
const User = require('../models/User');
// get all info from an specific group Id
router.get('/', async (req, res, next) => {
  try {
    const foundGroup = await Group.findById(req.groupId).populate([
      'expenses',
      // 'settles',
    ]);
    res.status(200).json(foundGroup);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.groupId);
    const foundUser = await User.findById(req.user._id);
    const findAndRemove = (array, id) => {
      for (let i = 0; i < array.length; i += 1) {
        if (String(array[i]) === String(id)) {
          array.splice(i, 1);
          break;
        }
      }
      return array;
    };
    findAndRemove(foundUser.groups, req.groupId);
    await foundUser.save();

    console.log(foundUser);
    console.log(foundUser.groups);

    res.status(200).json({
      msg: `group ${deletedGroup.groupName} deleted sucessfully`,
      deletedGroup,
      updatedUser: foundUser,
    });
  } catch (error) {
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

module.exports = router;
