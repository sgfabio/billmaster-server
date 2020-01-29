const express = require('express');
const router = express.Router();

// montar rotas de login, signup e logout dentro do arquivo auth.js (que foi montado aqui)
router.use('/api', require('./auth-routes'));
router.use('api/groups', require('./groups'))





// se tudo der errado: (testar)
router.get('/', function(req, res, next) {
  res.sendFile('../public/index.html');
});

module.exports = router;
