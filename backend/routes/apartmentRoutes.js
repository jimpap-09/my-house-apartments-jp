const express = require('express')
const router = express.Router()
const apartmentController = require('../controllers/apartmentController.js')

router.get('/getAllApartments', apartmentController.getAllApartments)
router.get('/getApartmentById/:id', apartmentController.getApartmentById)

module.exports = router
