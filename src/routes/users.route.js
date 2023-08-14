const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.get('/', auth, UserController.getUsers);

router.get('/:id/podcast-lists', auth, UserController.getPodcastLists);

module.exports = router;