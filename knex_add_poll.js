require('dotenv').config(); // .env file
const knex = require("knex")({
  client: 'postgresql',
  connection: {
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    host     : process.env.DB_HOST
  }
});

function createPoll(submitForm) {
  knex('polls').insert({ admin_link: submitForm.admin_link, participant_link: submitForm.voter_link, poll_question: submitForm.question, creator_email: submitForm.email})
  .then(function () {
    let optionsToInsert = submitForm.title.map((x, index) => ({admin_link: submitForm.admin_link, option_text: x, option_description: submitForm.description[index]}))
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

createPoll();
// createPoll({ admin_link: 'g839001', voter_link: 'assdh', question: 'How are you?', email: 'test@test.com', title: ['hello', 'hi', 'hey'], description: ['testing', "two", "three"]});
