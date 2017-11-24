const bcrypt = require('bcrypt');

function updatePassword(user_id, newPassword, knex) {
  return knex('users')
  .returning('user')
  .where({ id: user_id })
  .first()
  .then((user) => {
      return knex('users')
      .where({ id: user_id })
      .update({ pass_hash: bcrypt.hashSync(newPassword, bcrypt.genSaltSync()) })
  });
};

module.exports = updatePassword;