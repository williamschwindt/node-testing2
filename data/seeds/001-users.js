
exports.seed = async function(knex) {
  await knex('users').truncate()
  await knex('users').insert([
    { name: 'william', password: '123' },
    { name: 'james', password: '123' },
    { name: 'matt', password: '123' }
  ])
};
