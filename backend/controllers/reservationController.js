const { Reservation } = require('../models')

const getAllReservations = async (req, res) => {
  try {
    const data = await Reservation.findAll()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getReservationById = async (req, res) => {
  try {
    const data = await Reservation.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'Reservation not found' })
    }

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAllReservations,
  getReservationById,
}
