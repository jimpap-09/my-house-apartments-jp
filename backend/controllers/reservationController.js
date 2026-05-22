const {Reservation} = require('../models');

const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllReservations
}