'use strict'
require('dotenv').config()

module.exports = {
  NODE_ENV: '"production"',
  SPACE_ID: JSON.stringify(process.env.SPACE_ID),
  CDA_TOKEN: JSON.stringify(process.env.CDA_TOKEN),
  MAILER_API: JSON.stringify(process.env.MAILER_API)
}
