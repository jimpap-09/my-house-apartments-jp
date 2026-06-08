require('module-alias/register')

// 1. ΠΡΩΤΑ ΑΠΟ ΟΛΑ: Φορτώνουμε το env αρχείο για να είναι διαθέσιμο παντού
require('./config/env')

const express = require('express');
const cors = require('cors');
const app = express();

// 2. CORS: Δυναμικό origin που επιτρέπει τα devtunnels μαζί με credentials
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.indexOf('devtunnels.ms') !== -1 || origin.indexOf('localhost') !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Tunnel-Skip-Anti-Phishing-Page'],
  credentials: true 
}));

app.use(express.json());

// 3. Middleware για logging ΠΡΙΝ από τα routes για να πιάνει κάθε αίτημα
app.use((req, res, next) => {
  console.log(`📡 [BACKEND REQUEST] ${req.method} ${req.url}`)
  next()
});

// 4. Φορτώνουμε τα routes
const routes = require('./routes/index.js')
console.log('🔗 API routes initialized')
app.use('/api', routes)

// 5. Error Handling Middleware για να τυπώνει τα 500 errors στο terminal
app.use((err, req, res, next) => {
  console.error("💥 [SERVER ERROR]:", err.stack); 
  res.status(500).json({ success: false, error: err.message });
});

const PORT = process.env.PORT || 5000
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`)

  // Database connection test
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
});