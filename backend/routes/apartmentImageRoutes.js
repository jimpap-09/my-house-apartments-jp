const express = require('express')
const router = express.Router()
const apartmentImageController = require('../controllers/apartmentImageController.js')

router.get('/', apartmentImageController.getAllApartmentImages)
router.get('/:id', apartmentImageController.getApartmentImageById)

module.exports = router
