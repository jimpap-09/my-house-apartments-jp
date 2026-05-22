// apartment routes
const express = require('express');
const router = express.Router();
const apartmentRoutes = require('./apartmentRoutes.js');
const userRoutes = require('./users.js');
const reviewRoutes = require('./reviews.js');
const reservationRoutes = require('./reservations.js');

router.use(/apartments/, apartmentRoutes);
router.use(/users/, userRoutes);
router.use(/reviews/, reviewRoutes);
router.use(/reservations/, reservationRoutes);

module.exports = router;