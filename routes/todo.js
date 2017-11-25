
"use strict";

const express = require('express');
const listRoutes = express.Router();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const request = require('request');

module.exports = (knex) => {

todoRoutes.post("/to-do", (req, res) =>{

 // knex('to_do').insert({item: string, user_id: req.session.user_id, category_id: "1"})
 //  .returning('id')
 //  .then((user_id) => {
 //    req.session.user_id = user_id;
 //    console.log('Added entry to to_do table, category WATCH');
 //    return res.redirect('/');
 //  });

function getFirstWord(string) {
let firstWord = string.split(" ");
if(firstWord[0] === "Watch") {
  console.log(firstWord[0], "I should use the IMDB database")
  } else if (firstWord[0] === "Read") {
    knex('to_do').insert({item: string, user_id: req.session.user_id, category_id: "2"})
    console.log(firstWord[0], "I should use the Wolfram database")
  } else if (firstWord[0] === "Eat") {
    knex('to_do').insert({item: string, user_id: req.session.user_id, category_id: "3"})
    console.log(firstWord[0], "I should use the Yelp database")
  } else if (firstWord[0] === "Buy") {
    knex('to_do').insert({item: string, user_id: req.session.user_id, category_id: "4"})
    console.log(firstWord[0], "I should use the Amazon database")
  } else {
    knex('to_do').insert({item: string, user_id: req.session.user_id, category_id: "5"})
    console.log("I don't know what to use, go with default")
  }
}


$(function () {
  function addItem (item) {
    // append to the list
    $("#todo-items").append('<li><span>' + item + '</span> <small><a href="#edit">Edit</a> &bull; <a href="#delete">Delete</a></small></li>');
    // clear the text
    $(getFirstWord(item))
  }
  $("#todo").keydown(function (e) {
    // if enter key pressed
    if (e.which === 13) {
      addItem(e.target.value);
      e.target.value = '';
    }
  });
  // on clicking the add button
  $("#add").click((e) => {
    addItem($("#todo").val());
    $("#todo").val('')
  });
  // delegate the events to dynamically generated elements
  // for the edit button
  $(document).on("click", 'a[href="#edit"]', function () {
    // make the span editable and focus it
    $(this).closest("li").find("span").prop("contenteditable", true).focus();
    return false;
  });
  // for the delete button
  $(document).on("click", 'a[href="#delete"]', function () {
    // remove the list item
    $(this).closest("li").fadeOut(function () {
      $(this).remove();
    });
    return false;
  });
});
})
return todoRoutes;
}
