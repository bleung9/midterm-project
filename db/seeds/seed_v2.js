
exports.seed = function(knex, Promise) {

  return Promise.all([
    knex.raw("TRUNCATE TABLE polls, options, results CASCADE")
    ])
    .then(function() {
      return Promise.all([
        knex('polls').insert({ admin_link: "aA1bB3ZZ", participant_link: "00000000", poll_question: "whats ur fav pokeman?", creator_email: "bosco@bosco.com"}),
        knex('polls').insert({ admin_link: "aa1bb3zz", participant_link: "abcd1234", poll_question: "tea", creator_email: "tess@tess.com"})
        ]);
    })
    .then(function() {
      return Promise.all([
          knex('options').insert({ option_id: 1, admin_link: "aA1bB3ZZ", option_text: "pikachu", option_description: "yellow guy"}),
          knex('options').insert({ option_id: 2, admin_link: "aA1bB3ZZ", option_text: "diglet", option_description: "less yellow"}),
          knex('options').insert({ option_id: 3, admin_link: "aA1bB3ZZ", option_text: "lizardmon"}),
          knex('options').insert({ option_id: 4, admin_link: "aa1bb3zz", option_text: "black"}),
          knex('options').insert({ option_id: 5, admin_link: "aa1bb3zz", option_text: "cherry-berry", option_description: "i like this one"})
          ]);
    })
    .then(function() {
      return Promise.all([
        knex('results').insert({result_id: 1, admin_link:"aA1bB3ZZ", option_id: 1, rank: 1, participant_name:  "smart person"}),
        knex('results').insert({result_id: 2, admin_link:"aA1bB3ZZ", option_id: 2, rank: 2, participant_name:  "smart person"}),
        knex('results').insert({result_id: 3, admin_link:"aA1bB3ZZ", option_id: 3, rank: 3, participant_name:  "smart person"}),
        knex('results').insert({result_id: 4, admin_link:"aA1bB3ZZ", option_id: 1, rank: 3, participant_name:  "dumb person"}),
        knex('results').insert({result_id: 5, admin_link:"aA1bB3ZZ", option_id: 2, rank: 2, participant_name:  "dumb person"}),
        knex('results').insert({result_id: 6, admin_link:"aA1bB3ZZ", option_id: 3, rank: 1, participant_name:  "dumb person"}),
        knex('results').insert({result_id: 7, admin_link:"aA1bB3ZZ", option_id: 1, rank: 1, participant_name:  " "}),
        knex('results').insert({result_id: 8, admin_link:"aA1bB3ZZ", option_id: 2, rank: 2, participant_name:  " "}),
        knex('results').insert({result_id: 9, admin_link:"aA1bB3ZZ", option_id: 3, rank: 3, participant_name:  " "}),
        knex('results').insert({result_id: 10, admin_link:"aa1bb3zz", option_id: 4, rank: 1, participant_name:  "someone"}),
        knex('results').insert({result_id: 11, admin_link:"aa1bb3zz", option_id: 5, rank: 2, participant_name:  "someone"}),
        knex('results').insert({result_id: 12, admin_link:"aa1bb3zz", option_id: 4, rank: 1, participant_name:  null}),
        knex('results').insert({result_id: 13, admin_link:"aa1bb3zz", option_id: 5, rank: 2, participant_name:  null})
        ]);
    })
  }
