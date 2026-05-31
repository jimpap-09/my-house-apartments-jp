require('module-alias/register')

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// import routes
const routes = require('./routes/index.js')
app.use('/api', routes)

// load .env file
require('./config/env')
const PORT = process.env.PORT || 5000
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`)

  // database connection test
  const pool = require('./pool/index.js')
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Database connected successfully! Server time:", res.rows[0].now);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`)
    console.log(`🔗 DB Host: ${process.env.DB_HOST}`)
    console.log(`🔗 DB Name: ${process.env.DB_NAME}`)
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
})