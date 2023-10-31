const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/category.controller')
const auth = require('../middlewares/auth')

router.get('/', auth, CategoryController.getCategories)

router.get('/:id', auth, CategoryController.getCategoryByID)

router.post('/', auth, CategoryController.createCategory)

router.put('/:id', auth, CategoryController.updateCategory)

router.delete('/:id', auth, CategoryController.deleteCategory)

router.get('/:id/podcast-lists', auth, CategoryController.getPodcastListsByCategoryID)

module.exports = router