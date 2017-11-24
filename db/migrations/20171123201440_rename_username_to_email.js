
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.renameColumn('username', 'email');
    }),
  ]);
};
 
  

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('to_do')
    .then(() => Promise.all([
      knex.schema.dropTable('users'),
    ])
    );
};