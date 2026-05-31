const { Apartment, ApartmentImage, Review, User, Reservation } = require('../models')

const getAllApartments = async (req, res) => {
  try {
    const data = await Apartment.findAll({
      
      
    })

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getApartmentById = async (req, res) => {
  try {
    const data = await Apartment.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'Apartment not found' })
    }

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const createApartment = async (req, res) => {
  try {
    const data = await Apartment.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const updateApartment = async (req, res) => {
  try {
    const data = await Apartment.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'Apartment not found' })
    }

    await data.update(req.body)
    res.json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteApartment = async (req, res) => {
  try {
    const data = await Apartment.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'Apartment not found' })
    }

    await data.destroy()
    res.json({ deleted: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getApartmentImages = async (req, res) => {
  try {
    const data = await ApartmentImage.findAll({
      where: {
      apartmentId: req.params.apartmentId,
    },
      
    })

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getApartmentReviews = async (req, res) => {
  try {
    const data = await Review.findAll({
      where: {
      apartmentId: req.params.apartmentId,
    },
      include: [User],
    })

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getApartmentReservations = async (req, res) => {
  try {
    const data = await Reservation.findAll({
      where: {
      apartmentId: req.params.apartmentId,
    },
      include: [User],
    })

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAllApartments,
  getApartmentById,
  createApartment,
  updateApartment,
  deleteApartment,
  getApartmentImages,
  getApartmentReviews,
  getApartmentReservations,
}
