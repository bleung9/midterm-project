
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('options', function(table) {
      table.text('option_description');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('options', function(table) {
      table.dropColumn('option_description');
    })
  ])

};
