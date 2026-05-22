const  express = require('express')
const router = express.Router()
const reservationController = require('../controllers/reservationController.js')

// GET /api/reservations - Get all reservations
router.get('/getAllReservations', reservationController.getAllReservations)
router.get('/getReservationById/:id', reservationController.getReservationById)
router.get('/getReservationsByUserId/:userId', reservationController.getReservationsByUserId)
router.get('/getReservationsByApartmentId/:apartmentId', reservationController.getReservationsByApartmentId)

// POST /api/reservations - Create a new reservation
router.post('/createReservation', reservationController.createReservation)

// PUT /api/reservations/:id - Update an existing reservation
router.put('/updateReservation/:id', reservationController.updateReservation)

// DELETE /api/reservations/:id - Delete a reservation
router.delete('/deleteReservation/:id', reservationController.deleteReservation) 
router.delete('/deleteReservationsByUserId/:userId', reservationController.deleteReservationsByUserId)
router.delete('/deleteReservationsByApartmentId/:apartmentId', reservationController.deleteReservationsByApartmentId)
router.delete('/deleteReservationsByIds', reservationController.deleteReservationsByIds)
router.delete('/deleteAllReservations', reservationController.deleteAllReservations)

module.exports = router;