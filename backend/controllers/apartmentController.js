const { Apartment } = require('../models')

const getAllApartments = async (req, res) => {
  try {
    const data = await Apartment.findAll()
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

module.exports = {
  getAllApartments,
  getApartmentById
}
