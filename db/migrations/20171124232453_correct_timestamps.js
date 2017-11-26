
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.dropColumn('created_at');
      table.dropColumn('modified_at');
    }),
    knex.schema.table('categories', function (table) {
      table.dropColumn('created_at');
      table.dropColumn('modified_at');
    }),
    knex.schema.table('to_do', function (table) {
      table.dropColumn('created_at');
      table.dropColumn('modified_at');
    }),
  ]);
};


exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.timestamp('created_at');
      table.timestamp('modified_at');
    }),
    knex.schema.table('categories', function (table) {
      table.timestamp('created_at');
      table.timestamp('modified_at');
    }),
    knex.schema.table('to_do', function (table) {
      table.timestamp('created_at');
      table.timestamp('modified_at');
    }),
  ]);

};