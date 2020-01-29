const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session')  // I001
require('./configs/passport');   // I001
const bcrypt = require("bcrypt"); // I001




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
  
  // ADD SESSION SETTINGS HERE: 
  app.use(session({
    secret: "carlao-eh-show",
    resave: true,
    saveUninitialized: true
  }));
  //</I001>
  
  // SETUP DO PASSPORT
  const passport = require('passport'); // I001
  const LocalStrategy = require('passport-local').Strategy; 
  const User = require('./models/User');
  
  // USE passport.initialize() and passport.session() HERE:
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
    app.use('/', indexRouter);
    
    module.exports = app;