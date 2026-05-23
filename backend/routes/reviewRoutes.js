const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController.js')

router.get('/getAllReviews', reviewController.getAllReviews)
router.get('/getReviewById/:id', reviewController.getReviewById)

module.exports = router
