const asyncHandler = require('express-async-handler')
const Carousel = require('../models/carouselModel')

// @desc  Fetch all carousels
// @route  GET /api/carousels
// @access  Public
const getCarousels = asyncHandler(async (req, res) => {
  const carousels = await Carousel.find({})
  if (carousels) {
    res.json(carousels)
  } else {
    res.status(404)
    throw new Error('No carousels found')
  }
})

// @desc  Fetch single carousel
// @route  GET /api/carousels/:id
// @access  Public
const getCarouselById = asyncHandler(async (req, res) => {
  const carousel = await Carousel.findById(req.params.id)
  if (carousel) {
    res.json(carousel)
  } else {
    res.status(404)
    throw new Error('Carousel not found')
  }
})

// @desc    Create a carousel
// @route   POST /api/carousels
// @access  Private/Admin
const createCarousel = asyncHandler(async (req, res) => {
  const { imageSrc, imageAlt } = req.body
  const carousel = new Carousel({
    user: req.user._id,
    imageSrc,
    imageAlt,
  })

  const createdCarousel = await carousel.save()
  res.status(201).json(createdCarousel)
})

// @desc    Update a carousel
// @route   PUT /api/carousels/:id
// @access  Private/Admin
const updateCarousel = asyncHandler(async (req, res) => {
  const { imageSrc, imageAlt } = req.body

  const carousel = await Carousel.findById(req.params.id)

  if (carousel) {
    carousel.imageSrc = imageSrc
    carousel.imageAlt = imageAlt

    const updatedCarousel = await carousel.save()
    res.json(updatedCarousel)
  } else {
    res.status(404)
    throw new Error('Carousel not found')
  }
})

module.exports = { getCarousels, getCarouselById, createCarousel, updateCarousel }
