const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');
const auth = require('../middlewares/auth');

router.get('/', auth, CategoryController.getCategories);

router.get('/:id', CategoryController.getCategoryByID);

router.get('/:id/podcast-lists', CategoryController.getPodcastListsByCategoryID);

router.post('/', CategoryController.addCategory);

module.exports = router;