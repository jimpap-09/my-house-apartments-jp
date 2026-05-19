const express = require('express')
const cors = require('cors')

// Φόρτωσε πρώτα το dotenv για να διαβάσει το .env αρχείο
require('dotenv').config() 

// Σύνδεση με το pool χρησιμοποιώντας require αντί για import
const pool = require('./db/index.js') 

const reservationsRouter = require('./routes/reservations')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'My House Apartments API is running' })
})

app.use('/api/reservations', reservationsRouter)

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`)
  
  // Τέστ σύνδεσης με τη Neon Postgres
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Database connected successfully! Server time:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
})