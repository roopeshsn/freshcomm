const express = require('express')
const { getProducts, getProductById } = require('../controllers/productController')
const router = express.Router()

router.route('/').get(getProducts)

router.route('/:id').get(getProductById)

module.exports = router
