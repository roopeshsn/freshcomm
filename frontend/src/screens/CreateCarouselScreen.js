import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createCarousel } from '../actions/carouselActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const CreateCarouselScreen = ({ history }) => {
  const [imageSrc, setImageSrc] = useState('')
  const [imageAlt, setImageAlt] = useState('')

  const dispatch = useDispatch()

  const carouselCreate = useSelector((state) => state.carouselCreate)
  const { loading, error, success } = carouselCreate

  useEffect(() => {
    if (success) {
      history.push('/admin/carousellist')
    }
  }, [success, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createCarousel({
        imageSrc,
        imageAlt,
      })
    )
  }

  return (
    <>
      <FormContainer>
        <h1>Create Carousel</h1>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group className='my-3' controlId='imageSrc'>
            <Form.Label>Image Src</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Image URL'
              value={imageSrc}
              onChange={(e) => setImageSrc(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='imageAlt'>
            <Form.Label>Image Alt</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Image Alt'
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className='my-3' type='submit' variant='primary'>
            Create
          </Button>
          <Link to='/admin/carousellist' className='btn btn-light my-3 ms-3'>
            Go Back
          </Link>
        </Form>
      </FormContainer>
    </>
  )
}

export default CreateCarouselScreen
