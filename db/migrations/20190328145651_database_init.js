
exports.up = function(knex, Promise) {
  // to create a table with foreign keys
  // this reference key column must exist in the table
  // "Promise" is async so we have to chain the creation
  // of tables:   polls -> options -> results
  return Promise.all([
    knex.schema.createTable('polls', function(table){
      table.string('admin_link', 8);
      table.primary('admin_link');
      table.string('participant_link', 8);
      table.text('poll_question');
      table.text('creator_email');
    })
  ])
  .then(function() {
    return Promise.all([
        knex.schema.createTable('options', function(table){
          table.increments('option_id');
          table.string('admin_link', 8);
          table.foreign('admin_link').references('polls.admin_link');
          table.string('option_text');
        })
      ])
  }).then(function() {
      return Promise.all([
        knex.schema.createTable('results', function(table){
          table.increments('result_id');
          table.string('admin_link', 8);
          table.foreign('admin_link').references('polls.admin_link');
          table.integer('option_id');
          table.foreign('option_id').references('options.option_id');
          table.integer('rank');
          table.string('participant_name');
        })
    ])
  })
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw("DROP TABLE polls, options, results CASCADE")
  ])

};
