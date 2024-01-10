const express = require('express')
const router = express.Router()
const Product = require('../models/productModel')
const {
  getCategories,
  getCategoryById,
  getProductsByCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} = require('../controllers/categoryController')
const { protect, admin } = require('../middleware/authMiddleware')

// @desc  Fetch all categories
// @route  GET /api/categories
// @access  Public
router.route('/').get(getCategories).post(protect, admin, createCategory)

// @desc  Fetch category by id
// @route  GET /api/categories/category/:id
// @route  PUT /api/categories/category/:id
// @route  DELETE /api/categories/category/:id
// @access  Private/Admin
router
  .route('/category/:id')
  .get(protect, admin, getCategoryById)
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory)

// @desc  Fetch products based on category
// @route  GET /api/categories/:category
// @access  Public
router.route('/:category').get(getProductsByCategory)

module.exports = router
