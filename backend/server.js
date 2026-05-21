const express = require('express')
const cors = require('cors')

// load .env file
require('dotenv').config() 

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'My House Apartments API is running' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`)

  // database connection test
  const pool = require('./db/index.js') 
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Database connected successfully! Server time:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
})