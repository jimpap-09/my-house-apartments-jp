const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')

// GET /api/users - Get all users
router.get('/getAllUsers', userController.getAllUsers)
router.get('/getUserById/:id', userController.getUserById)
router.get('/getUserByEmail/:email', userController.getUserByEmail)

// POST /api/users - Create a new user
router.post('/createUser', userController.createUser)

// PUT /api/users/:id - Update an existing user
router.put('/updateUser/:id', userController.updateUser)

// DELETE /api/users/:id - Delete a user
router.delete('/deleteUser/:id', userController.deleteUser) 
router.delete('/deleteUsersByIds', userController.deleteUsersByIds)
router.delete('/deleteAllUsers', userController.deleteAllUsers)

module.exports = router;