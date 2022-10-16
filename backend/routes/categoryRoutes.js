const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const Product = require('../models/productModel')
const Category = require('../models/categoryModel')

// @desc  Fetch all categories
// @route  GET /api/categories
// @access  Public

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const categories = await Category.find({})
    res.json(categories)
  }),
)

// @desc  Fetch products based on category
// @route  GET /api/categories/:category
// @access  Public

router.get(
  '/:category',
  asyncHandler(async (req, res) => {
    var sort_type, categorywiseProducts
    if (req.query.sortby == '0') {
      sort_type = 'asc'
    } else if (req.query.sortby == '1') {
      sort_type = 'desc'
    } else {
      categorywiseProducts = await Product.find({
        category: req.params.category,
      })
    }

    if (sort_type == 'asc' || sort_type == 'desc') {
      categorywiseProducts = await Product.find({
        category: req.params.category,
      }).sort({ price: sort_type })
    } else if (sort_type) {
      res.status(404)
      throw new Error('Wrong sortby filter')
    }

    // const categorywiseProducts = products.filter((p) => p.category === req.params.category)
    if (categorywiseProducts) {
      res.json(categorywiseProducts)
    } else {
      res.status(404)
      throw new Error('Products not found')
    }
  }),
)

module.exports = router
