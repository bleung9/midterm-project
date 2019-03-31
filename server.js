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
const vO = require('./knex_view_options');
// Seperated Routes for each Resource
// const usersRoutes = require("./routes/users");
const pollRoutes = require("./routes/polls");
const mailgun = require('./test-mailgun.js')
const dbUtils = require("./db-utils");


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

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// function create_poll() {

// }

// (3) app.get to /submitted after submission

  // function renderLinks(callback) {
  //   let admin_link = random_url_gen();
  //   let participant_link = random_url_gen();
  //   console.log(admin_link)
  //   callback(req.body.email, admin_link, participant_link);
  // };

  // renderLinks(function(email, admin_link, participant_link) {
  //   let mailgun = require('./test-mailgun.js')
  //   mailgun.sendEmail(email, admin_link, participant_link);
  //   res.redirect('poll_submitted', {admin_link:admin_link});
  // })

  // let templateVars = {admin_link: admin_link,
  //                     participant_link: participant_link,
  //                     poll_question: req.body.question,
  //                     creator_email: req.body.email,
  //                     title: req.body.title,
  //                     description: req.body.description};

  // create_poll(templateVars);

  // ERROR IF ONLY ONE POLL QUESTION SUBMITTED
  // because params title is entry instead of array
app.post("/poll_submitted", function(req, res) {
  if (req.body.question === "" || req.body.email === "" ||
      req.body.title === "" || (typeof req.body.title !== "string" && req.body.title.includes(""))) {
        res.status(400).send("Please ensure all input fields are filled in!");
        return;
      }
  else {
    let admin_link = random_url_gen();
    let participant_link = random_url_gen();
    let submit_title;
    (typeof req.body.title === "string") ? submit_title = [req.body.title] : submit_title = req.body.title;
    // ERROR IF ONLY ONE POLL QUESTION SUBMITTED
    // because params title is entry instead of array
    let submitLink = {admin_link: admin_link,
                        participant_link: participant_link,
                        poll_question: req.body.question,
                        creator_email: req.body.email,
                        title: submit_title,
                        description: req.body.description};
    console.log(req.body);

    dbUtils.createPoll(submitLink).then( () => {
      res.render("poll_submitted", {admin_link: admin_link, participant_link: participant_link});
    });
  }

  //NEED TO INSERT THIS SUBMISSION DATA AND URL INTO DATABASE!!!!!!

  // res.render(SUCCESSFUL SUBMISSION PAGE (w/ links to both admin, participation url))

// //   }
// //   res.render("take_poll");
// //   //check if userURL exists in database
// //   res.render("take_poll");


app.get("/a/:adminURL", function(req, res) {
  // TO DO: check if adminURL exists in database
  let adminURL = String(req.params.adminURL);
  dbUtils.validURL(adminURL).then(function(queryResult) {
    if (!queryResult[0][0]) {
      res.status(400).send("not a valid admin URL!");
      return;
    }
    else {
      dbUtils.getResults(adminURL).then( (queryResult) => {
      res.render("poll_results", {queryResult: queryResult});
      });
    }
  });
});

app.post("/votes_submitted", function(req, res) {
  res.render("thanks");
});

app.get("/u/:participant_url", function(req, res) {
  let partURL = String(req.params.participant_url);
  dbUtils.validURL(partURL).then(function(queryResult) {
    if (!queryResult[0][0]) {
      res.status(400).send("not a valid participant URL!");
      return;
    }
    else {
      dbUtils.viewOptions(String(req.params.participant_url)).then( (result) => {
        console.log(result);
        res.render("take_poll", {result: result});
      });
    }
  });
  // TO DO close connection and hand errors

  // code below kept just in case
  // if the above works, remove dead code
/*  vO.viewOptions(String(req.params.participant_url)).then((result) => {
    res.render("take_poll", {result: result});
  });*/
  //check if userURL exists in database
});

app.post("/u/:participant_url", function(req, res) {
  console.log(req);
  res.redirect("thanks");
/*  res.redirect("/thanks");
*/});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
