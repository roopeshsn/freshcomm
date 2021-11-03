const express = require('express')
const {
  getCarousels,
  updateCarousel,
  getCarouselById,
  createCarousel,
} = require('../controllers/carouselControllers')
const { protect, admin } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').get(getCarousels).post(protect, admin, createCarousel)

router.route('/:id').get(getCarouselById).put(protect, admin, updateCarousel)

module.exports = router
