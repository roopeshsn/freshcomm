import React from 'react'
import { Carousel, Image } from 'react-bootstrap'

const Slider = () => {
  return (
    <Carousel pause='hover' className='bg-light' variant='light' touch indicators controls slide>
      <Carousel.Item className='h-100 w-100' interval={5000}>
        <Image
          className='d-block w-100'
          src='https://i.ibb.co/VxN2j1t/slide-1.jpg'
          alt='First slide'
          fluid
        />
      </Carousel.Item>
      <Carousel.Item as='div' className='h-100 w-100' interval={3000}>
        <Image
          className='d-block w-100'
          src='https://i.ibb.co/J7rQchw/slide-2.jpg'
          alt='Second slide'
          fluid
        />
      </Carousel.Item>
      <Carousel.Item as='div' className='h-100 w-100'>
        <Image
          className='d-block w-100'
          src='https://i.ibb.co/pJpN4Fx/slide-3.jpg'
          alt='third slide'
          fluid
        />
      </Carousel.Item>
    </Carousel>
  )
}

export default Slider
