'use strict';

const express = require('express');
const userRoutes = express.Router();
const bodyParser = require('body-parser');
const session = require('cookie-session');
const bcrypt = require('bcrypt');
const updateEmail = require("./update_emails");
const updatePassword = require("./update_password");



module.exports = (knex) => {

  userRoutes.post('/users/register', (req, res) => {
    let invalidSubmission = false;
    let { email, password } = req.body;
    
    if (!email || !password) {
      let invalidSubmission = true;
      console.log('Please enter a valid email/password');
      return res.redirect('/');
    };

    knex.select().table('users')
    .then((result)=> {
      for (let user of result) {
        if (email === user.email) {
          let invalidSubmission = true;
        console.log('Email Taken', result);
        return res.redirect('/');
        };
      };
      if (!invalidSubmission) {
          knex('users')
          .insert({ email: email, pass_hash: bcrypt.hashSync(password, bcrypt.genSaltSync()) })
          .returning('id')
          .then((user_id) => {
            console.log('After Insert: ', user_id);
            req.session.user_id = user_id;
            console.log('Account creation successful. user_id: ' + user_id );
            return res.redirect('/');
          });
        }
      });
  });

  userRoutes.post('/users/login', (req, res) => {
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
              console.log({user_id});
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


  // Update profile
  userRoutes.post('/profile', (req, res) => {
    let user_id = req.session.user_id[0].id;
    let newEmail = req.body.email;
    let newPassword = req.body.password;

    console.log({user_id, newPassword, newEmail});
    
    if (newEmail) {
      updateEmail(user_id, newEmail, knex);
    }

    if (newPassword) {
      updatePassword(user_id, newPassword, knex);
    }

    res.redirect("/profile");
  });

  

  // Logout
  userRoutes.post('/logout', (req, res) => {
    req.session = null;
    return res.redirect('/');
  });

  return userRoutes;

}

