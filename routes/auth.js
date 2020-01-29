const express = require('express');
const router = express.Router();

// TODO: Perguntar pra Mônica:
// dúvida: acredito que redirect não faz sentido mais numa SPA. Preciso desses middlewares?
const { loginStrat, signupStrat } = require('../middleware/passport.js');

// dúvida 2: usei o ensureLoggedIn, ensureLoggedOut do pacote 'connect-ensure-login'. Não faz sentido aqui, né?

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send({ msg: 'hello, world' });
});

module.exports = router;