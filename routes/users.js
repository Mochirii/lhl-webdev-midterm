'use strict';

const express = require('express');
const userRoutes = express.Router();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require("bcrypt");


module.exports = (knex) => {

  userRoutes.post('/register', (req, res) => {
    let invalidSubmission = false;
    let { email, pass_hash } = req.body;

    if (!email || !pass_hash) {
      let invalidSubmission = true;
      req.flash('Please enter a valid email/password');
      return res.redirect('/');
    };

    knex.select().table('users')
      .then((result) => {
        for (let user of result) {
          if (email === user.email) {
            let invalidSubmission = true;
            req.flash('This email is already registered to an existing account');
            return res.redirect('/');
          };
        };

        if (!invalidSubmission) {
          knex('users')
            .returning('id')
            .insert({ email: email, pass_hash: bcrypt.hashSync(pass_hash, bcrypt.genSaltSync()) })
            .then((user) => {
              req.session.user_id = user[0];
              req.flash('Account creation successful')
              return res.redirect('/to_do');
            });
        };
      });
  });

  return userRoutes;

}

