const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.controller')
const auth = require('../middlewares/auth')

router.get('/', auth, UserController.getUsers)

router.get('/:id/podcast-lists', auth, UserController.getPodcastLists)

router.get('/:id', auth, UserController.getUserById)

router.post('/', auth, UserController.createUser)

router.put('/:id', auth, UserController.updateUser)

router.delete('/:id', auth, UserController.deleteUser)

module.exports = router