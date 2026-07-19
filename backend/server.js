require('module-alias/register')

// Φορτώνουμε πρώτα τις environment variables
require('./config/env')

const express = require('express')
const cors = require('cors')

const app = express()

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://my-house-apartments-jp-nu.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      // Επιτρέπει requests χωρίς Origin, π.χ. άνοιγμα API στον browser ή Postman
      if (!origin) {
        return callback(null, true)
      }

      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        origin.endsWith('.devtunnels.ms')

      if (isAllowed) {
        return callback(null, true)
      }

      console.error(`🚫 [CORS BLOCKED] ${origin}`)
      return callback(new Error(`Not allowed by CORS: ${origin}`))
    },

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Tunnel-Skip-Anti-Phishing-Page',
    ],

    credentials: true,
  }),
)

app.use(express.json())

// Logging πριν από τα routes
app.use((req, res, next) => {
  console.log(`📡 [BACKEND REQUEST] ${req.method} ${req.url}`)
  console.log(`🌐 Origin: ${req.headers.origin || 'no-origin'}`)
  next()
})

// Routes
const routes = require('./routes/index.js')

console.log('🔗 API routes initialized')

app.use('/api', routes)

// Error handler
app.use((err, req, res, next) => {
  console.error('💥 [SERVER ERROR]:', err.stack)

  res.status(err.message?.includes('CORS') ? 403 : 500).json({
    success: false,
    error: err.message,
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`)

  const pool = require('./pool/index.js')

  try {
    const result = await pool.query('SELECT NOW()')

    console.log(
      '✅ Database connected successfully! Server time:',
      result.rows[0].now,
    )
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`)
    console.log(`🔗 DB Host: ${process.env.DB_HOST}`)
    console.log(`🔗 DB Name: ${process.env.DB_NAME}`)
  } catch (err) {
    console.error('❌ Database connection error:', err.message)
  }
})