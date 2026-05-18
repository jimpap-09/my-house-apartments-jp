const express = require('express')
const cors = require('cors')
require('dotenv').config()

const reservationsRouter = require('./routes/reservations')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'My House Apartments API is running' })
})

app.use('/api/reservations', reservationsRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
