const mongoose = require('mongoose')

const carouselSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    imageSrc: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Carousel = mongoose.model('Carousel', carouselSchema)

module.exports = Carousel
