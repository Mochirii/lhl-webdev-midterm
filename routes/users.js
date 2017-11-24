'use strict';

const express = require('express');
const userRoutes = express.Router();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require("bcrypt");


module.exports = (knex) => {

  userRoutes.post('/register', (req, res) => {
    let invalidSubmission = false;
    let { email, password } = req.body;
    if (!email || !password) {
      let invalidSubmission = true;
      console.log('Please enter a valid email/password');
      return res.redirect('/');
    };

    knex.select().table('users')
      .then((result) => {
        for (let user of result) {
          if (email === user.email) {
            let invalidSubmission = true;
            console.log('This email is already registered to an existing account');
            return res.redirect('/');
          };
        };

        if (!invalidSubmission) {
          knex('users')
            .returning('id')
            .insert({ email: email, pass_hash: bcrypt.hashSync(password, bcrypt.genSaltSync()) })
            .then((user_id) => {
              req.session.user_id = user_id;
              console.log('Account creation successful');
              return res.redirect('/to-do');
            });
        };
      });
  });

  return userRoutes;

}

