const path = require('path')
const dotenv = require('dotenv')

let envFile = '.env'

// if (process.env.NODE_ENV === 'local') {
//   envFile = '.env.local'
// } else if (process.env.NODE_ENV === 'production') {
//   envFile = '.env.prod'
// } else if (process.env.NODE_ENV === 'development') {
//   envFile = '.env.dev'
// } else {
//   envFile = '.env'
// }

dotenv.config({
  path: path.resolve(__dirname, '..', envFile),
})

console.log(`Loaded environment file: ${envFile}`)