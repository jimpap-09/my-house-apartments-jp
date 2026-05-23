const { Review } = require('../models')

const getAllReviews = async (req, res) => {
  try {
    const data = await Review.findAll()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getReviewById = async (req, res) => {
  try {
    const data = await Review.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'Review not found' })
    }

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAllReviews,
  getReviewById,
}
