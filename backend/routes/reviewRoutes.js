const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController.js')

router.get('/', reviewController.getAllReviews)
router.get('/:id', reviewController.getReviewById)

module.exports = router
