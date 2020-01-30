const express = require('express');
const authRoutes = express.Router();

const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');


// Auth Passport Local strategy route ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
authRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({
      message:
        'Please make your password at least 8 characters long for security purposes.',
    });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: 'Username check went bad.' });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: 'Username taken. Choose another one.' });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass,
    });

    newUser.save((err) => {
      if (err) {
        res
          .status(400)
          .json({ message: 'Saving user to database went wrong.' });
        return;
      }

      // Automatically log in user after sign up
      // .login() here is actually predefined passport method
      req.login(newUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Login after signup went bad.' });
          return;
        }

        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(newUser);
      });
    });
  });
});

// eu penso que a vantagem de usar um middleware nomeado é facilitar a leitura do código. Agora é mais fácil descobrir onde editar o handling de login
const loginHandler = require('../middleware/passport')
authRoutes.post('/login', loginHandler);

authRoutes.get('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  if (typeof req.user === 'undefined') res.status(400).send('you were not loggedin!')
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

authRoutes.get('/is-auth', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});



// Auth Passport Google strategy route ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

authRoutes.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);
authRoutes.get(
  "/auth/google/callback",  // <<<< ===== O QUE É ISTO??? (Fabio)
  passport.authenticate("google", {
    successRedirect: "/private-page",
    failureRedirect: "/" // here you would redirect to the login page using traditional login approach
  })
);

module.exports = authRoutes;