const path = require('path')
const dotenv = require('dotenv')

let envFile

if (process.env.NODE_ENV === 'local') {
  envFile = '.env.local'
} else if (process.env.NODE_ENV === 'production') {
  envFile = '.env.prod'
} else {
  envFile = '.env.dev'
}

dotenv.config({
  path: path.resolve(__dirname, '..', envFile),
})

console.log(`Loaded environment file: ${envFile}`)