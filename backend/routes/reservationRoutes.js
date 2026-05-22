const express = require('express')
const router = express.Router()
const reservationController = require('../controllers/reservationController.js')

router.get('/getAllReservations', reservationController.getAllReservations)
router.get('/getReservationById/:id', reservationController.getReservationById)

module.exports = router
