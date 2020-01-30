const express = require('express');
const router = express.Router();

const Settle = require('../models/Settle');

router.post('/settleThis', (req, res, next) => {
  const { groupName, paidBy, paidTo } = req.body;
  Settle.create({
    groupName,
    paidBy,
    paidTo,
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
  Settle.findById(groupIdParam)
    .then((response) => {
      if (!response) {
        res.status(400).send('invalid groupId!');
        return;
      // **** PENDÊNCIA: Alinhar se faz sentido verificar o owner do Group para permitir  ver os settles
      // } else if (String(response.owner) !== String(req.user._id)) {
      //   res
      //     .status(401)
      //     .send(`you don't have authorization to see this content`);
      //   return;
      }
      return
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
  Settle.findById(req.groupId)
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
