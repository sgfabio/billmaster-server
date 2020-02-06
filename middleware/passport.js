const passport = require('passport');

/*
um uma função do tipo middleware chamado handleLogin está retornando passport.authenticate(); isso é uma Immediately Invoked Function Expression (IIFE). A função disso é disponibilizar o req, res e next para o passport.authenticate()
https://developer.mozilla.org/en-US/docs/Glossary/IIFE
*/
const loginHandler = (req, res, next) => {
  passport.authenticate('local', (err, user, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!user) {
      // "failureDetails" contains the error msgs
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(user, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(user);
    });
  })(req, res, next);
};

module.exports = loginHandler;
