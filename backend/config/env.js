const path = require('path')

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.prod'
    : '.env.dev'

require('dotenv').config({
  path: path.resolve(__dirname, '..', envFile)
})