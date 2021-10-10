import React from 'react'
import { Carousel } from 'react-bootstrap'

const Slider = () => {
  return (
    <Carousel variant="dark" fade>
      <Carousel.Item as='div' className='h-100 w-100'>
        <img
          className='d-block w-100'
          src='https://i.ibb.co/rv2S80h/slide-1.jpg'
          alt='First slide'
        />
      </Carousel.Item>
      <Carousel.Item as='div' className='h-100 w-100'>
        <img
          className='d-block w-100'
          src='https://i.ibb.co/XjHMPrF/slide-2.jpg'
          alt='Second slide'
        />
      </Carousel.Item>
    </Carousel>
  )
}

export default Slider
