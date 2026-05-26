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

const getGalleryById = async (req, res) => {
  try {
    const data = await ApartmentImage.findAll({ where: { apartmentId: req.params.apartmentId } })

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No images found for this apartment' })
    }

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAllApartmentImages,
  getApartmentImageById,
  getGalleryById,
}
