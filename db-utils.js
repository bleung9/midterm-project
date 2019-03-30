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


function getResults(adminLink) {
  return Promise.all([
    knex('results').join('options', 'results.option_id', '=', 'options.option_id')
    .select('results.rank', 'options.option_text', 'options.option_description')
    .where('results.admin_link', adminLink)
    ]);
}

function viewOptions(participantLink) {
  return Promise.all([knex('options')
  .join('polls', 'options.admin_link', '=', 'polls.admin_link')
  .select('option_text', 'option_description', 'poll_question')
  .where('polls.participant_link', participantLink)]);
}


// add poll JS
// test this works !!
function createPoll(submitForm) {
  return Promise.all([
    knex('polls').insert({
      admin_link: submitForm.admin_link,
      participant_link: submitForm.voter_link,
      poll_question: submitForm.question,
      creator_email: submitForm.email
    })
    .then(function () {
      let optionsToInsert = submitForm.title.map((x, index) => ({admin_link: submitForm.admin_link, option_text: x, option_description: submitForm.description[index]}))
      for (let i = 0; i < optionsToInsert.length; i++) {
        knex('options').insert(optionsToInsert[i]).then();
      }
    })
  ]);
};

// createPoll({ admin_link: 'g839001', voter_link: 'assdh', question: 'How are you?', email: 'test@test.com', title: ['hello', 'hi', 'hey'], description: ['testing', "two", "three"]});




module.exports = {
  viewOptions: viewOptions,
  getResults: getResults,
  createPoll: createPoll
  };
