const express = require('express')
const router = express.Router()
const apartmentController = require('../controllers/apartmentController.js')

console.log('📦 Apartment routes loaded')
router.get('/', apartmentController.getAllApartments)
router.get('/:id', apartmentController.getApartmentById)
router.post('/', apartmentController.createApartment)
router.put('/:id', apartmentController.updateApartment)
router.delete('/:id', apartmentController.deleteApartment)
router.get('/:apartmentId/images', apartmentController.getApartmentImages)
router.get('/:apartmentId/reviews', apartmentController.getApartmentReviews)
router.get('/:apartmentId/reservations', apartmentController.getApartmentReservations)

module.exports = router
