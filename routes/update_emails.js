function updateEmail(user_id, newEmail, knex) {
  return knex('users')
  .returning('user')
  .where({ id: user_id })
  .first()
  .then((user) => {
      return knex('users')
      .where({ id: user_id })
      .update({ email: newEmail })
  });
};

module.exports = updateEmail;