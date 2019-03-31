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

function submitVote(result) {
  return Promise.all([knex('polls').distinct().select('polls.admin_link').where('polls.participant_link', result.participant_link)]).then(function(admin_link) {
    console.log("admin link: ", admin_link[0][0]);
    console.log("result:", result);
    for (i = 0; i < result.vote_data.ranks.length; i++) {
      Promise.all([knex('results').insert({
        admin_link: admin_link[0][0].admin_link,
        option_id: result.vote_data.optionIDs[i],
        rank: result.vote_data.ranks[i],
        participant_name: result.participant_name
      })]);
    }
  });
}

function validURL(link, p_or_a) {
  if (p_or_a === "p") {
    return Promise.all([knex('polls').where('polls.participant_link', link)]);
  }
  else {
    return Promise.all([knex('polls').where('polls.admin_link', link)]);
  }
}

//note that if no one has voted on a poll, this will fail, b/c no results for that poll
//will exist in this table, hence when I try to load the admin page for a given URL,
//nothing will be returned by this knex query, b/c I'm searching for an admin_link
//that would only exist if someone has voted.
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
  .select('option_text', 'option_description', 'poll_question', 'option_id')
  .where('polls.participant_link', participantLink)]);
}

function createPoll(submitForm) {
  let firstInsert = knex('polls').insert({
    admin_link: submitForm.admin_link,
    participant_link: submitForm.participant_link,
    poll_question: submitForm.poll_question,
    creator_email: submitForm.creator_email
  });
  console.log("submitForm: ", submitForm)
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


module.exports = {
  submitVote: submitVote,
  validURL: validURL,
  viewOptions: viewOptions,
  getResults: getResults,
  createPoll: createPoll,
  };
