'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
require('dotenv').config()

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SPACE_ID: JSON.stringify(process.env.SPACE_ID),
  CDA_TOKEN: JSON.stringify(process.env.CDA_TOKEN),
  MAILER_API: JSON.stringify(process.env.MAILER_API)
})
