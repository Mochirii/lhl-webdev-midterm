"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const session = require("cookie-session");



const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const userRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(session({
  name: 'session',
  keys: ['key1', 'key2']
}));

// function getUser(id){
//   return knex.first('*').from('users').where({id: Number(id) || 0});
// }
// app.use((req, res, next) => {
//   getUser(req.session.user_id)
//     .then(user => {
//       res.locals.user = user;
//       next();
//     });
// })
// Mount all resource routes
app.use("/", userRoutes(knex));

// Welcome Page
app.get("/", (req, res) => {
  res.render("index");
});

//Register Page
app.get("/users/register", (req, res) => {
  res.render("/");
});

app.post("/users/register", (req, res) => {
  res.redirect('/')
});

//Login Page
app.get("/users/login", (req, res) => {
  res.render("/")
});

app.post("/users/login", (req, res) => {
console.log()

  res.redirect("/to-do")
});


app.get('/test',(req,res)=>{
  console.log("we are in the get test method");
  res.render('test');
});



//To-Do Main PAGE
app.get("/to-do", (req, res) => {
  res.render("test_index")
});

//For posting data
app.post('/to-do/insert', (req,res)=>{

  //VALUES RECEIVED FROM AJAX CALL;

  var item = req.body.item;
  var user_id = req.body.user_id;
  var category_id = req.body.category_id;
  knex('to_do').insert({
    item: item,
    user_id: user_id,
    category_id: category_id,
  }).returning('id')
  .then((id) => {
      console.log(id);
      console.log("Record inserted");
      res.send({result: true});
  }); //then bracket ends here.
});

app.post('/to-do/delete', (req,res)=>{

  //VALUES RECEIVED FROM AJAX CALL;

  var item = req.body.item;
  knex('to_do')
  .where('id', item)
   .del()
  .then(() => {

      res.redirect('/to-do');
  }); //then bracket ends here.
});

// Profile Page

app.get("/profile", (req, res) => {
  let user_id = req.session.user_id[0].id;

  knex.first('email').from('users').where('id', user_id).then(function(rows) {
    const user_email = rows.email;
    let templateVars = {
      user_id,
      user_email
    };
    res.render("profile_index", templateVars);
    })
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
