const passport = require('passport');

// middleware para rotas prote

const signupStrat = passport.authenticate('local-signup', {
  successRedirect: '/login',
  failureRedirect: '/signup',
  passReqToCallback: true,
});

const loginStrat = passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  passReqToCallback: true,
});

module.exports = {
  signupStrat,
  loginStrat,
};
