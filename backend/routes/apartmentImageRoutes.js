const express = require('express')
const router = express.Router()
const apartmentImageController = require('../controllers/apartmentImageController.js')

router.get('/getAllApartmentImages', apartmentImageController.getAllApartmentImages)
router.get('/getApartmentImageById/:id', apartmentImageController.getApartmentImageById)

module.exports = router
