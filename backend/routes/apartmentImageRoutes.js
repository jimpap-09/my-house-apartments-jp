const express = require('express')
const router = express.Router()
const apartmentImageController = require('../controllers/apartmentImageController.js')

router.get('/getAllApartmentImages', apartmentImageController.getAllApartmentImages)
router.get('/getApartmentImageById/:id', apartmentImageController.getApartmentImageById)
router.get('/getGalleryById/:apartmentId', apartmentImageController.getGalleryById)

module.exports = router
