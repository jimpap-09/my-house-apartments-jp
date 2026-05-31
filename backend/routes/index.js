const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'API is running',
  })
})

const apartmentRoutes = require('./apartmentRoutes.js')
const userRoutes = require('./userRoutes.js')
const reviewRoutes = require('./reviewRoutes.js')
const reservationRoutes = require('./reservationRoutes.js')
const apartmentImageRoutes = require('./apartmentImageRoutes.js')



router.use('/apartments', apartmentRoutes)
router.use('/users', userRoutes)
router.use('/reviews', reviewRoutes)
router.use('/reservations', reservationRoutes)
router.use('/apartment-images', apartmentImageRoutes)

module.exports = router
