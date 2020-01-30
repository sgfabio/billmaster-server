const express = require('express');
const router = express.Router();

const Group = require('../models/Groups');

// TODO: No postman, as vezes está deslogando derrepente! Acho que é o server reiniciando..
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

// router get all groups from user...

router.param('groupId', (req, res, next, groupIdParam) => {
  Group.findById(groupIdParam)
    .then((response) => {
      if (!response) {
        res.status(400).send('invalid groupId!');
        return;
      } else if (String(response.owner) !== String(req.user._id)) {
        res
          .status(401)
          .send(`you don't have authorization to see this content`);
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
      return;
    });
  req.groupId = groupIdParam;
  next();
});

router.get('/:groupId', (req, res, next) => {
  console.log('groupId:', req.groupId);
  Group.findById(req.groupId)
    // .then((response) => {
      // precisa iterar o array e chamar populate em cada objeto guardado!
    //   // response.populate(['members, expenses, settles']);
    // })
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    });
});

module.exports = router;
