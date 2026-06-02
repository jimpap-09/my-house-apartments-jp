const express = require('express')
const router = express.Router()
const reservationController = require('../controllers/reservationController.js')

router.get('/', reservationController.getAllReservations)
router.get('/:id', reservationController.getReservationById)
router.post('/', reservationController.createReservation)
router.put('/:id', reservationController.updateReservation)
router.delete('/:id', reservationController.deleteReservation)
router.get('/:reservationId/user', reservationController.getReservationUser)
router.get('/:reservationId/apartment', reservationController.getReservationApartment)

module.exports = router
