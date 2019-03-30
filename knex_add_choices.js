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

function addAnswers() {
  // knex('options').insert({ : firstName, last_name : lastName, birthdate : birthdate})
  // .then(function(rows) {
    console.log('Success');
    knex.destroy();
  }).catch(function(err) {
    console.log(err);
  }); 
}

addAnswers();