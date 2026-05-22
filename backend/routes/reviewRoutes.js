const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController.js')

// GET /api/apartments - Get all apartments
router.get('/getAllReviews', reviewController.getAllReviews)
router.get('/getReviewById/:id', reviewController.getReviewById)
router.get('/getReviewsByUserId/:userId', reviewController.getReviewsByUserId)
router.get('/getReviewsByApartmentId/:apartmentId', reviewController.getReviewsByApartmentId)

// POST /api/apartments - Create a new apartment
router.post('/createReview', reviewController.createReview)

// PUT /api/apartments/:id - Update an existing apartment
router.put('/updateReview/:id', reviewController.updateReview)

// DELETE /api/apartments/:id - Delete an apartment
router.delete('/deleteReview/:id', reviewController.deleteReview) 
router.delete('/deleteReviewsByUserId/:userId', reviewController.deleteReviewsByUserId)
router.delete('/deleteReviewsByApartmentId/:apartmentId', reviewController.deleteReviewsByApartmentId)
router.delete('/deleteReviewsByIds', reviewController.deleteReviewsByIds)
router.delete('/deleteAllReviews', reviewController.deleteAllReviews)

module.exports = router;