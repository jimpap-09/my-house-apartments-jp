// apartment routes
const express = require('express');
const router = express.Router();
const apartmentRoutes = require('./apartmentRoutes.js');
const userRoutes = require('./userRoutes.js');
const reviewRoutes = require('./reviewRoutes.js');
const reservationRoutes = require('./reservationRoutes.js');

router.use(/apartments/, apartmentRoutes);
router.use(/users/, userRoutes);
router.use(/reviews/, reviewRoutes);
router.use(/reservations/, reservationRoutes);

module.exports = router;