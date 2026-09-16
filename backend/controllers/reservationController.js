const { Reservation, User, Apartment } = require('../models')

const getAllReservations = async (req, res) => {
  try {
    const data = await Reservation.findAll({
      
      
    })

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

const createReservation = async (req, res) => {
  try {
    const payload = {
    userId: req.body.userId,
    apartmentId: req.body.apartmentId,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  };
    const data = await Reservation.create(payload)
    res.status(201).json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const updateReservation = async (req, res) => {
  try {
    const data = await Reservation.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'Reservation not found' })
    }

    const payload = {
    userId: req.body.userId,
    apartmentId: req.body.apartmentId,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  };
    await data.update(payload)
    res.json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteReservation = async (req, res) => {
  try {
    const data = await Reservation.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'Reservation not found' })
    }

    await data.destroy()
    res.json({ deleted: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getReservationUser = async (req, res) => {
  try {
    const data = await User.findOne({
      where: {
      'Reservation.id': req.params.reservationId,
    },
      include: [Reservation],
    })

    if (!data) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getReservationApartment = async (req, res) => {
  try {
    const data = await Apartment.findOne({
      where: {
      'Reservation.id': req.params.reservationId,
    },
      include: [Reservation],
    })

    if (!data) {
      return res.status(404).json({ error: 'Apartment not found' })
    }

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
  getReservationUser,
  getReservationApartment,
}
