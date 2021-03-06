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

const pollRoutes = require("./routes/polls");
// const mailgun = require('./new-mailgun.js');
const dbUtils = require("./db-utils");
const borda = require("./borda");


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


app.post("/poll_submitted", function(req, res) {
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
  dbUtils.createPoll(submitLink).then( () => {
    // mailgun.sendEmail(req.body.email, admin_link, participant_link);
    res.send({admin_link:admin_link, participant_link:participant_link});
  });
});



app.get("/a/:adminURL", function(req, res) {
  let adminURL = String(req.params.adminURL);
  dbUtils.validURL(adminURL, "a").then(function(queryResult) {
    if (!queryResult[0][0]) {
      res.status(400).send('<h3>Not a valid admin URL!  You made Pikachu sad (Misty eyed?) T_T</h3><img src="https://media1.tenor.com/images/615d10ede789767d27d89855e41e3012/tenor.gif">');
      return;
    }
    else {
      dbUtils.getResults(adminURL).then( (queryResult) => {

        let borda_results = borda.borda(queryResult);

        let aggregated = 0;
        for (i = 0; i < borda_results.length; i++) {
          aggregated += borda_results[i][1];
        }
        let denom = (borda_results.length * (borda_results.length + 1)) / 2;
        let number_of_voters = aggregated / denom;
        if (isNaN(number_of_voters)) {
          number_of_voters = 0;
        }
        res.render("poll_results", {borda_results: borda_results, number_of_voters: number_of_voters});
      });
    }
  });
});


app.post("/votes_submitted", function(req, res) {
  dbUtils.submitVote({vote_data: req.body, participant_link: req.params.participant_url}).then(res.render("thanks"));
});


app.get("/u/:participant_url", function(req, res) {
  let partURL = String(req.params.participant_url);
  dbUtils.validURL(partURL, "p").then(function(queryResult) {
    if (!queryResult[0][0]) {
      res.status(400).send('<h3>Not a valid participant URL!  How dare you make Pikachu angry!!!!</h3><img src="https://memegenerator.net/img/images/15262599/angry-pikachu.jpg">');
      return;
    }
    else {
      dbUtils.viewOptions(String(req.params.participant_url)).then( (result) => {
        res.render("take_poll", {result: result});
      });
    }
  });
  // TO DO close connection and hand errors
});

app.post("/u/:participant_url", function(req, res) {
  dbUtils.submitVote({vote_data: req.body, participant_link: req.params.participant_url}).then(() => res.send());
});

app.get("/thanks", function(req, res) {
  res.render("thanks");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
