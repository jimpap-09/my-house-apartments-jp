const { Review, User, Apartment } = require('../models')

const getAllReviews = async (req, res) => {
  try {
    const data = await Review.findAll({
      
      
    })

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

const createReview = async (req, res) => {
  try {
    const payload = {
    userId: req.body.userId,
    apartmentId: req.body.apartmentId,
    rating: req.body.rating,
    comment: req.body.comment
  };
    const data = await Review.create(payload)
    res.status(201).json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const updateReview = async (req, res) => {
  try {
    const data = await Review.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'Review not found' })
    }

    const payload = {
    userId: req.body.userId,
    apartmentId: req.body.apartmentId,
    rating: req.body.rating,
    comment: req.body.comment
  };
    await data.update(payload)
    res.json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteReview = async (req, res) => {
  try {
    const data = await Review.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'Review not found' })
    }

    await data.destroy()
    res.json({ deleted: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getReviewUser = async (req, res) => {
  try {
    const data = await User.findOne({
      where: {
      'Review.id': req.params.reviewId,
    },
      include: [Review],
    })

    if (!data) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getReviewApartment = async (req, res) => {
  try {
    const data = await Apartment.findOne({
      where: {
      'Review.id': req.params.reviewId,
    },
      include: [Review],
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
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewUser,
  getReviewApartment,
}
