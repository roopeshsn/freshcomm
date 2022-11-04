const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel')
const Product = require('../models/productModel')

// @desc  Fetch all categories
// @route  GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({})
    res.json(categories)
})

// @desc  Fetch single category
// @route  GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)
  if (category) {
    res.json(category)
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    await category.remove()
    res.json({ message: 'Category removed' })
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const {
    name,
    imageSrc,
    imageAlt,
  } = req.body
  const category = new Category({
    user: req.user._id,
    name,
    imageSrc,
    imageAlt,
    href:"#"
  })

  try {
    const createdCategory = await category.save()

    res.status(201).json(createdCategory)
  } catch (error) {
    if (error.name === 'ValidationError') {
      let errors = ''
      Object.keys(error.errors).forEach((key) => {
        errors += error.errors[key].message + '.\n'
      })
      res.status(500).json(errors)
    }
  }
})

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const {
    name,
    imageSrc,
    imageAlt,
  } = req.body
  console.log(name)
  const category = await Category.findById(req.params.id)

  if (category) {
    category.name = name
    category.imageSrc = imageSrc
    category.imageAlt = imageAlt

    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

// @desc  Fetch products by category
// @route  GET /api/categories/:category
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const categorywiseProducts = await Product.find({
    category: req.params.category,
  })
  if (categorywiseProducts) {
    res.json(categorywiseProducts)
  } else {
    res.status(404)
    throw new Error('Products not found')
  }
})

module.exports = {
  getCategories,
  getCategoryById,
  getProductsByCategory,
  deleteCategory,
  createCategory,
  updateCategory,
}
