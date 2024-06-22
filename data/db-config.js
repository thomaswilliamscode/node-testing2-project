const knex = require('knex')
const configs = require('../knexfile.js')
const env = process.envNODE_ENV || 'development'

module.exports = knex(configs[env])