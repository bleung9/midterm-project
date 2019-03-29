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

function viewOptions(participantLink) {
  knex('options')
  .join('polls', 'options.admin_link', '=', 'polls.admin_link')
  .select('option_text').from('options')
  .where('polls.participant_link', participantLink)
  .then(function(rows) {
    console.log(rows);
    knex.destroy();
  }).catch(function(err) {
    console.log(err);
  });
}

console.log(viewOptions("00000000"));