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
  knex.select('*').from('results')
  // .where('admin_link', adminLink)
  .then(function(rows) {
    console.log(rows);
    knex.destroy();
  }).catch(function(err) {
    console.log(err);
  });
}

getResults("aA1bB3ZZ");