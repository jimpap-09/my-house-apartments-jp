require('module-alias/register')
const express = require('express');
const cors = require('cors'); // 1. Κάνε import το cors
const app = express();

// 2. Ενεργοποίησε το CORS με τις σωστές ρυθμίσεις για Tunnels
app.use(cors({
  origin: '*', // Επιτρέπει σε όλα τα ports/tunnels να συνδεθούν
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Tunnel-Skip-Anti-Phishing-Page'], // Επιτρέπουμε το ειδικό header
  credentials: true
}));

// ... ο υπόλοιπος κώδικάς σου (routes, db connection κλπ) ...
app.use(express.json())

// import routes
const routes = require('./routes/index.js')
console.log('🔗 API routes initialized')
app.use('/api', routes)

// This middleware logs every incoming request to the backend,
// which is crucial for debugging
// and ensuring that requests are reaching the server
// and being processed by the correct routes.
app.use((req, res, next) => {
  console.log(`📡 [BACKEND REQUEST] ${req.method} ${req.url}`)
  next() // Pass control to the next middleware or route handler
})

// load .env file
require('./config/env')
const PORT = process.env.PORT || 5000
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`)

  // database connection test
  const pool = require('./pool/index.js')
  try {
    const res = await pool.query("SELECT NOW()")
    console.log("✅ Database connected successfully! Server time:", res.rows[0].now)
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`)
    console.log(`🔗 DB Host: ${process.env.DB_HOST}`)
    console.log(`🔗 DB Name: ${process.env.DB_NAME}`)
  } catch (err) {
    console.error("❌ Database connection error:", err.message)
  }
})