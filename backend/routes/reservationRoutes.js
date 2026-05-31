const express = require('express')
const router = express.Router()
const reservationController = require('../controllers/reservationController.js')

router.get('/', reservationController.getAllReservations)
router.get('/:id', reservationController.getReservationById)

module.exports = router
