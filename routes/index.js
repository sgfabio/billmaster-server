const express = require('express');
const router = express.Router();

router.use('/', require('./auth-routes'));
// router.use('/auth/google', require('./auth-routes'));
// router.use('/auth/google/callback', require('./auth-routes'));
router.use('/groups', require('./groups'))

// router.use('/settle', require('./settle'))




// se tudo der errado: (testar)
router.get('/', (req, res, next) => {
  res.sendFile('../public/index.html');
});

module.exports = router;