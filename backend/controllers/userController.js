const { User } = require('../models')

const getAllUsers = async (req, res) => {
  try {
    const data = await User.findAll()
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

module.exports = {
  getAllUsers,
  getUserById
}
