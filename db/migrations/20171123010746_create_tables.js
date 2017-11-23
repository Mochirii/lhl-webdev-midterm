exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id').unsigned();
      table.string('username', 50);
      table.string('pass_hash');
      table.timestamp('created_at');
      table.timestamp('modified_at');
    }),

    knex.schema.createTable('categories', function (table) {
      table.increments('id').unsigned();
      table.string('name', 50);
      table.timestamp('created_at');
      table.timestamp('modified_at');
    }),

  ]).then(()=> {
    return knex.schema.createTable('to_do', function (table) {
      table.increments('id').unsigned();
      table.string('item');
      table.integer('user_id').unsigned();
      table.integer('category_id').unsigned();
      table.timestamp('created_at');
      table.timestamp('modified_at');
      table.foreign('user_id').references('users.id');
      table.foreign('category_id').references('categories.id');
    });
  })
  ;
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('to_do')
    .then(() => Promise.all([
      knex.schema.dropTable('users'),
      knex.schema.dropTable('categories'),
    ])
  );
};