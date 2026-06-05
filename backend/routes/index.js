const express = require('express')
const router = express.Router()

console.log('🔗 API routes loaded')

router.get('/', (req, res) => {
  res.json({
    message: 'API is running',
  })
})

router.get('/apartments', async (req, res) => {
  try {
    // Το query σου για τη βάση (π.χ. Sequelize ή σκέτο pg)
    const result = await db.query('SELECT * FROM apartments'); 
    res.json(result.rows);
  } catch (error) {
    // 🔥 ΑΥΤΟ ΕΙΝΑΙ ΤΟ ΚΡΙΣΙΜΟ: Αν δεν υπάρχει αυτό το console.error, 
    // το backend θα απαντάει με 500 χωρίς να σου λέει γιατί!
    console.error("❌ Backend Error details:", error); 
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

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
