
exports.seed = function(knex, Promise) {

  return Promise.all([
    knex.raw("TRUNCATE TABLE polls, options, results CASCADE")
    ])
    .then(function() {
      return Promise.all([
        knex('polls').insert({ admin_link: "abcd1234", participant_link: "00000000", poll_question: "whats ur fav pokeman?", creator_email: "bosco@bosco.com"}),
        knex('polls').insert({ admin_link: "zZzZzZzZ", participant_link: "omglawlz", poll_question: "tea", creator_email: "tess@tess.com"})
        ]);
    })
    .then(function() {
      return Promise.all([
          knex('options').insert({ admin_link: "abcd1234", option_text: "pikachu", option_description: "yellow guy"}).returning('option_id'),
          knex('options').insert({ admin_link: "abcd1234", option_text: "diglet", option_description: "less yellow"}).returning('option_id'),
          knex('options').insert({ admin_link: "abcd1234", option_text: "lizardmon"}).returning('option_id')
          ]).then(function(values) {
            let optionIDs = values.map(x => parseInt(x[0]));
            return Promise.all([
              knex('results').insert({admin_link:"abcd1234", option_id: optionIDs[0], rank: 1, participant_name:  "smart person"}),
              knex('results').insert({admin_link:"abcd1234", option_id: optionIDs[1], rank: 2, participant_name:  "smart person"}),
              knex('results').insert({admin_link:"abcd1234", option_id: optionIDs[2], rank: 3, participant_name:  "smart person"}),
              knex('results').insert({admin_link:"abcd1234", option_id: optionIDs[0], rank: 3, participant_name:  "dumb person"}),
              knex('results').insert({admin_link:"abcd1234", option_id: optionIDs[1], rank: 2, participant_name:  "dumb person"}),
              knex('results').insert({admin_link:"abcd1234", option_id: optionIDs[2], rank: 1, participant_name:  "dumb person"}),
              knex('results').insert({admin_link:"abcd1234", option_id: optionIDs[0], rank: 1, participant_name:  " "}),
              knex('results').insert({admin_link:"abcd1234", option_id: optionIDs[1], rank: 2, participant_name:  " "}),
              knex('results').insert({admin_link:"abcd1234", option_id: optionIDs[2], rank: 3, participant_name:  " "})
              ])
          })
        })
      .then(function() {
        return Promise.all([
          knex('options').insert({ admin_link: "zZzZzZzZ", option_text: "black"}).returning('option_id'),
          knex('options').insert({ admin_link: "zZzZzZzZ", option_text: "cherry-berry", option_description: "i like this one"}).returning('option_id')
          ]).then(function(values) {
            let optionIDs = values.map(x => parseInt(x[0]));
            return Promise.all([
              knex('results').insert({admin_link:"zZzZzZzZ", option_id: optionIDs[0], rank: 1, participant_name:  "someone"}),
              knex('results').insert({admin_link:"zZzZzZzZ", option_id: optionIDs[1], rank: 2, participant_name:  "someone"}),
              knex('results').insert({admin_link:"zZzZzZzZ", option_id: optionIDs[0], rank: 1, participant_name:  null}),
              knex('results').insert({admin_link:"zZzZzZzZ", option_id: optionIDs[1], rank: 2, participant_name:  null})
              ])
          })
        })
}
