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
  return knex('options')
  .join('polls', 'options.admin_link', '=', 'polls.admin_link')
  .select('option_text', 'option_description', 'poll_question')
  .where('polls.participant_link', participantLink)
  .then(function(rows) {
    return rows;
  })
}

module.exports = {viewOptions: viewOptions}
