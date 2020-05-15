
exports.seed = async function(knex) {
  await knex('users').truncate()
  await knex('users').insert([
    { username: 'william', password: '123' },
    { username: 'james', password: '123' },
    { username: 'matt', password: '123' }
  ])
};
