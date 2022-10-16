const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

// @desc  Fetch all products
// @route  GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  var sort_type, products
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  if (req.query.sortby == '0') {
    sort_type = 'asc'
  } else if (req.query.sortby == '1') {
    sort_type = 'desc'
  } else {
    products = await Product.find({ ...keyword })
  }

  if (sort_type == 'asc' || sort_type == 'desc') {
    products = await Product.find({ ...keyword }).sort({ price: sort_type })
  } else if (sort_type) {
    res.status(404)
    throw new Error('Wrong sortby filter')
  }
  if (products) {
    res.json(products)
  } else {
    res.status(404)
    throw new Error('No product found based on your search')
  }
})

// @desc  Fetch single product
// @route  GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    mrp,
    description,
    imageSrc,
    imageAlt,
    category,
    countInStock,
  } = req.body
  const product = new Product({
    name,
    price,
    mrp,
    user: req.user._id,
    imageSrc,
    imageAlt,
    category,
    countInStock,
    description,
  })

  try {
    const createdProduct = await product.save()

    res.status(201).json(createdProduct)
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

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    mrp,
    description,
    imageSrc,
    imageAlt,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.mrp = mrp
    product.description = description
    product.imageSrc = imageSrc
    product.imageAlt = imageAlt
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const updateStockCount = asyncHandler(async (req, res, id, qty) => {
  try {
    var product = await Product.findById(id)
  } catch (err) {
    throw new Error(err.message)
  }

  if (product.countInStock < qty) {
    throw new Error(
      'We are really sorry. We have not ' +
        qty +
        ' amount of ' +
        product.name +
        ' currently on stock. Either you wait for stock to fullfilled or you can decrease your ordered quantity of ' +
        product.name,
    )
  }
  product.countInStock -= qty
  const updatedProduct = await product.save()
  return updateProduct
})

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  updateStockCount,
}
