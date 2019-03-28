//routes planning

// (1) app.get "/" (home page)
app.get("/", function(req, res) {
  res.render(HOMEPAGE.ejs);
});

// (2) jquery .post on the submit button to database after a poll is submitted
//poll_data needs to be an OBJECT!!!!!
//to get poll_data via jquery, .map() looks useful...
$.post("/", poll_data).then(() => {
  //call a function or module to input the poll data into the database
  //call function/module to generate random URL's for admin and participation (random_url_gen.js)
  //redirect to successfully submitted webpage ("/submitted"), inform user to wait for an email w/ links
  //call mailgun API
});

// (3) app.get to /submitted after submission
app.get("/poll_submitted", function(req, res) {
  res.render(SUCCESSFUL SUBMISSION PAGE (w/ links to both admin, participation url))
});

// (4) app.get to /:poll_url (participant/admin url)
// poll_data is all the information contained in all of the poll form submission fields
app.get("/p/:url", function(req, res) {
  //check if that URL is a admin or poll URL
  res.render(render participant poll page)
});

// (4) app.get to /:poll_url (participant/admin url)
// poll_data is all the information contained in all of the poll form submission fields
app.get("/a/:url", function(req, res) {
  //check if that URL is a admin or poll URL
  res.render(render admin poll page - results page)
});












// Main page: localhost/
// Content: form to create poll (adding question, choices, optional descriptions) textbox for email field, submit button, error message (if applicable aka missing fields)
// Routes: GET /localhost/
// POST (submit button), redirect to localhost/submitted

// Successful submit page: localhost/submitted
// Content: admin link, participant link, instructions on how to use the links
// Routes: GET /localhost/submitted

// Poll page: localhost/:poll_url
// Content: poll (question/options/any additional info/instructions on taking poll), submit button, success or error message (on submit)
// Routes: GET /localhost/:poll_url
// POST (submit button) clear poll info and display success or error message

// Results page: localhost/:admin_url
// Content: poll results (with appropriate styling), count for number of responses, optional (individual results for users)
// Routes: GET /localhost/:admin_url


