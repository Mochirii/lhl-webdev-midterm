"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const cookieSession = require("cookie-session");

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const $ = require("jquery");
// const expsession= require('express-session')

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

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// Mount all resource routes
app.use("/users", userRoutes(knex));

// Welcome Page
app.get("/", (req, res) => {
  res.render("index");
});

//Register Page
app.get("/register", (req, res) => {
  res.render("reg_index");
});

app.post("/register", (req, res) => {
  res.redirect('/to-do')
});

//Login Page
app.get("/login", (req, res) => {
  res.render("login_index")
});

app.post("/login", (req, res) => {
console.log()

  res.redirect("/to-do")
});


//To-Do Main PAGE
app.get("/to-do", (req, res) => {
  res.render("test_index")
});

//Profile Page
app.get("/profile", (req, res) => {
  res.render("profile_index")
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
