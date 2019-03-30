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
  return Promise.all([knex('results')
  .join('options', 'results.option_id', '=', 'options.option_id')
  .select('results.rank', 'options.option_text', 'options.option_description')
  .where('results.admin_link', adminLink)]);
}

getResults("abcd1234").then((rows) => console.log(rows));
