const { ApartmentImage } = require('../models')

const getAllApartmentImages = async (req, res) => {
  try {
    const data = await ApartmentImage.findAll()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getApartmentImageById = async (req, res) => {
  try {
    const data = await ApartmentImage.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'ApartmentImage not found' })
    }

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAllApartmentImages,
  getApartmentImageById,
}
