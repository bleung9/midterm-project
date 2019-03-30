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


function validURL(link) {
  return Promise.all([knex('polls').where('polls.admin_link', link).orWhere('polls.participant_link', link)]);
}

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


function createPoll(submitForm) {
  let firstInsert = knex('polls').insert({
    admin_link: submitForm.admin_link,
    participant_link: submitForm.participant_link,
    poll_question: submitForm.poll_question,
    creator_email: submitForm.creator_email
  });

  let optionsToInsert = submitForm.title.map( (x, index) => ({
    admin_link: submitForm.admin_link,
    option_text: x,
    option_description: submitForm.description[index]})
  );

  let secondaryInserts = [];

  optionsToInsert.forEach( (option) => {
    secondaryInserts.push(knex('options').insert(option));
  });

  return firstInsert.then( () => {
    Promise.all(secondaryInserts);
  });
}

// createPoll({ admin_link: 'g839001', voter_link: 'assdh', question: 'How are you?', email: 'test@test.com', title: ['hello', 'hi', 'hey'], description: ['testing', "two", "three"]});




module.exports = {

  validURL: validURL,
  viewOptions: viewOptions,
  getResults: getResults,
  createPoll: createPoll,
  };
