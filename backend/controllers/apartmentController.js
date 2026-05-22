const { Apartment } = require('../models')

const getAllApartments = async (req, res) => {
  try {
    const apartments = await Apartment.findAll()
    res.json(apartments)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAllApartments
}