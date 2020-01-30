const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session'); // I001
const bcrypt = require('bcrypt'); // I001

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const app = express();

app.use(logger('dev')); // disponibiliza logs de req no terminal
app.use(express.json()); // disponibiza req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//<I001>

// mount express-session middleware.
app.use(
  session({
    secret: 'o-nome-do-app-sera-banana-split',
    resave: true,
    saveUninitialized: true,
  })
);
//</I001>
// SETUP DO PASSPORT
require('./configs/passport');
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
// fim cfg passport

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
);

// root router mouting
const indexRouter = require('./routes/index');
app.use('/api', indexRouter);

module.exports = app;