const { User, Review, Apartment, Reservation } = require('../models')

const getAllUsers = async (req, res) => {
  try {
    const data = await User.findAll({
      
      
    })

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getUserById = async (req, res) => {
  try {
    const data = await User.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const createUser = async (req, res) => {
  try {
    const data = await User.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const data = await User.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'User not found' })
    }

    await data.update(req.body)
    res.json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const data = await User.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'User not found' })
    }

    await data.destroy()
    res.json({ deleted: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getUserReviews = async (req, res) => {
  try {
    const data = await Review.findAll({
      where: {
      userId: req.params.userId,
    },
      include: [Apartment],
    })

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getUserReservations = async (req, res) => {
  try {
    const data = await Reservation.findAll({
      where: {
      userId: req.params.userId,
    },
      include: [Apartment],
    })

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserReviews,
  getUserReservations,
}
