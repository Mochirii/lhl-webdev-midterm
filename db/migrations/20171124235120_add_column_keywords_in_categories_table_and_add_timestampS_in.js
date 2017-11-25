
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.timestamps(true, true);
    }),
    knex.schema.table('categories', function (table) {
      table.timestamps(true, true);
      table.string('keyword');
    }),
    knex.schema.table('to_do', function (table) {
      table.timestamps(true, true);
    }),
  ]);
};


exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.dropTimestamps();
      
    }),
    knex.schema.table('categories', function (table) {
      table.dropTimestamps();
      table.dropColumn('keyword');
    }),
    knex.schema.table('to_do', function (table) {
      table.dropTimestamps();
    }),
  ]);

};