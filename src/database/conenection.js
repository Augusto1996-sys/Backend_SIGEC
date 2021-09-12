const knex = require('knex');
const configuration = require('../../knexfile');

const Connection = knex(configuration.development)

module.exports= Connection;