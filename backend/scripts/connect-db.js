require('../config/env')

const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require:true,
    rejectUnauthorized: false
  }
})

async function testConnection() {
  console.log('==================================================')
  console.log(' Connecting to Neon PostgreSQL via .env URL...')
  console.log('==================================================')

  try {
      const result = await pool.query('SELECT NOW()')

      console.log('')
      console.log('✅ Database connected successfully!')
      console.log(`🕒 Server time: ${result.rows[0].now}`)
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log(`🛢️  Dialect: ${process.env.DB_DIALECT || 'postgres'}`)
      console.log('')
  } catch (err) {
      console.log('')
      console.error('❌ Database connection failed!')
      console.error(`Reason: ${err.message}`)
      console.log('')
      process.exit(1)
  } finally {
    await pool.end()
  }
}

testConnection()
