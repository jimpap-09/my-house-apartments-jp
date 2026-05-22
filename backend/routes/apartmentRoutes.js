const express = require('express')
const router = express.Router()
const apartmentController = require('../controllers/apartmentController.js')

// GET /api/apartments - Get all apartments
router.get('/getAllApartments', apartmentController.getAllApartments)
router.get('/getApartmentById/:id', apartmentController.getApartmentById)
router.get('/getApartmentsByHostId/:hostId', apartmentController.getApartmentsByHostId)

// POST /api/apartments - Create a new apartment
router.post('/createApartment', apartmentController.createApartment)

// PUT /api/apartments/:id - Update an existing apartment
router.put('/updateApartment/:id', apartmentController.updateApartment)

// DELETE /api/apartments/:id - Delete an apartment
router.delete('/deleteApartment/:id', apartmentController.deleteApartment) 
router.delete('/deleteApartmentsByHostId/:hostId', apartmentController.deleteApartmentsByHostId)
router.delete('/deleteApartmentsByIds', apartmentController.deleteApartmentsByIds)
router.delete('/deleteAllApartments', apartmentController.deleteAllApartments)

module.exports = router;