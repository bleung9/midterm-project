"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const random_url_gen = require('./public/scripts/random_url_gen');
// const knexParticipant = require('knex_view_options');
// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const pollRoutes = require("./routes/polls");


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
// app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
// app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

function createPoll(submitForm) {
  knex('polls').insert({ admin_link: submitForm.admin_link, participant_link: submitForm.participant_link, poll_question: submitForm.poll_question, creator_email: submitForm.creator_email})
  .then(function () {
    let optionsToInsert = submitForm.title.map((x, index) => ({admin_link: submitForm.admin_link, option_text: x, option_description: submitForm.description[index]}));
    console.log("Options to insert", optionsToInsert);
      for (let i = 0; i < optionsToInsert.length; i++) {
        knex('options').insert(optionsToInsert[i]).then();
      }
  }).then(function () {
    console.log('Success')
    knex.destroy();
  }).catch(function(err) {
    console.log(err);
  });
}

// (3) app.get to /submitted after submission
app.post("/poll_submitted", function(req, res) {
  let admin_link = random_url_gen();
  let participant_link = random_url_gen();
  console.log(req.body);
  console.log("admin", admin_link);
  console.log("participant", participant_link);
  console.log("hello");
  let templateVars = {admin_link: admin_link,
                      participant_link: participant_link,
                      poll_question: req.body.question,
                      creator_email: req.body.email,
                      title: [req.body.title],
                      description: [req.body.description]};
  console.log(templateVars);
  createPoll(templateVars);
  res.render("poll_submitted", templateVars);
});

app.post("/votes_submitted", function(req, res) {
  res.redirect("thanks");
});

// // app.get("/u/:url", function(req, res) {

// //   function displayPollOptions(err, results) {
// //     knexParticipant.viewOptions() {
// //       return
// //     }
// //   }
// //   let templateVars = {

// //   }
// //   res.render("take_poll");
// //   //check if userURL exists in database
// //   res.render("take_poll");
// // });

app.post("/u/:userURL", function(req, res) {
  res.redirect("thanks")
});

app.get("/a/:adminURL", function(req, res) {
  //check if adminURL exists in database

  let qGR = require('./knex_get_results');
  let adminURL = String(req.params.adminURL);

  qGR.getResults(adminURL).then((queryResult) => {
    queryResult[i].rank
    res.render("poll_results", {queryResult: queryResult});
  });

});

app.get("/thanks", function(req, res) {
  res.render("thanks");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
