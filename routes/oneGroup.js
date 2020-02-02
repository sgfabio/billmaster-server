const express = require('express');
const router = express.Router({mergeParams: true});
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
    // update user here

    const lala = await User.groups.pull(req.groupId);

    // https://stackoverflow.com/questions/49124014/removing-object-with-objectid-from-array-in-mongoose-mongodb

    // https://stackoverflow.com/questions/45256996/node-js-mongoose-delete-a-from-an-id-in-document-array

    // Users.update({}, { $pull: { projectId: { $in: user.projectId }}}



    // const updatedUser = await User.findByIdAndRemove(
    //   req.user._id,
    //   { $pull: {groups: {$in: [req.groupId] } } }
    // );

    // { $pull: { "configuration.links": { _id: req.params.linkId } } }

    res.status(200).json({
      msg: `group ${deletedGroup.groupName} deleted sucessfully`,
      deletedGroup: deletedGroup,
      lala,
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
