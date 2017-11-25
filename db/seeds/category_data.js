
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, name: 'movie', keyword: 'watch'},
        {id: 2, name: 'book', keyword: 'read'},
        {id: 3, name: 'place', keyword: 'eat'},
        {id: 4, name: 'product', keyword: 'buy'},
        {id: 5, name: 'misc', keyword: 'misc'},
      ]);
    });
};
