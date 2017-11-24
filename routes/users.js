'use strict';

const express = require('express');
const userRoutes = express.Router();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');



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

  userRoutes.post('/login', (req, res) => {
    let loginDetails = false;
    let { email, password } = req.body;
    if (!email || !password) {
      loginDetails = false;
      console.log('Email/Password field cannot be empty');
      return res.redirect('/');
    };

    knex.select().table('users')
    .then((result)=> {
      for (let user of result) {
        if (email === user.email) {
          if (bcrypt.compareSync(password, user.pass_hash)) {

            loginDetails = true;
            let user_email = email;
            knex('users')
            .returning('id')
            .where('email', user_email)
            .then((user_id) => {
              req.session.user_id = user_id;
             return res.redirect('/to-do');
            });
          };
        };
      };
      if (!loginDetails) {
        console.log('Please enter a valid email/password');
        return res.redirect('/');
      };
    });
  });

  // // Update profile
  // userRoutes.post('/profile', (req, res) => {
  //   let user_id = req.session.user_id;
  //   let newEmail = req.body.email;
  //   let newPassword = req.body.password;

  //   let emailPromise = Promise.resolve();
  //   let passwordPromise = Promise.resolve();
  //   if (newEmail) {
  //     emailPromise = emailUpdater(user_id, newEmail, knex);
  //   }

  //   if (newPassword) {
  //     passwordPromise = passwordUpdater(user_id, newPassword, knex);
  //   }

  //   Promise.all([emailPromise, passwordPromise])
  //   .then(() => {
  //     console.log('Details have been updated.')
  //     return res.redirect('/profile');
  //   });

  // });

  // // Logout
  // userRoutes.post('/logout', (req, res) => {
  //   req.session = null;
  //   return res.redirect('/');
  // });

  return userRoutes;

}

