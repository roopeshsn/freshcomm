import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listCarousels } from '../actions/carouselActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Slider = () => {
  const dispatch = useDispatch()
  const carouselList = useSelector((state) => state.carouselList)
  const { loading, carousels, error } = carouselList
  useEffect(() => {
    dispatch(listCarousels())
  }, [dispatch])
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel
          pause="hover"
          className="bg-light carousel-dark"
          variant="dark"
          touch
          indicators
          controls
          slide
          dark
        >
          {carousels.map((carousel) => (
            <Carousel.Item
              key={carousel._id}
              className="h-100 w-100"
              interval={5000}
            >
              <Image
                className="d-block w-100"
                src={carousel.imageSrc}
                alt={carousel.imageAlt}
                fluid
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  )
}

export default Slider
