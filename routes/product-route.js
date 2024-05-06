const express = require('express')
const router = express.Router()
const Controller = require('../controllers/product-controller')

router.get('/', Controller.getProducts)
router.get('/:id', Controller.getProductById)
router.get('/category', Controller.getCategories)
router.get('/category', Controller.getProductsByCategory)
router.get('/subcategory', Controller.getProductsBySubcategory)
router.get('/category/:id', Controller.getCategoryById)

module.exports = router