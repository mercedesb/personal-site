'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MAILER_API: '"http://localhost:8091/utilities/sendToMaker"'
})
