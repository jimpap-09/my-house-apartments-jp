const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  log: (msg) => console.log(`${msg}`)
})

const msg = "🔗 Initializing PostgreSQL connection pool with connection string: " + process.env.DATABASE_URL
pool.log(msg)

module.exports = pool
