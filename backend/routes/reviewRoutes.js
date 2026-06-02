const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController.js')

router.get('/', reviewController.getAllReviews)
router.get('/:id', reviewController.getReviewById)
router.post('/', reviewController.createReview)
router.put('/:id', reviewController.updateReview)
router.delete('/:id', reviewController.deleteReview)
router.get('/:reviewId/user', reviewController.getReviewUser)
router.get('/:reviewId/apartment', reviewController.getReviewApartment)

module.exports = router
