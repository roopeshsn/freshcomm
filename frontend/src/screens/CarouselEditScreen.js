import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listCarouselDetails, updateCarousel } from '../actions/carouselActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  CAROUSEL_DETAILS_RESET,
  CAROUSEL_UPDATE_RESET,
} from '../constants/carouselConstants'

const CarouselEditScreen = ({ match, history }) => {
  const carouselId = match.params.id

  const [imageSrc, setImageSrc] = useState('')
  const [imageAlt, setImageAlt] = useState('')

  const dispatch = useDispatch()

  const carouselDetails = useSelector((state) => state.carouselDetails)
  const { loading, error, carousel } = carouselDetails

  const carouselUpdate = useSelector((state) => state.carouselUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = carouselUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CAROUSEL_UPDATE_RESET })
      dispatch({ type: CAROUSEL_DETAILS_RESET })
      history.push('/admin/carousellist')
    } else {
      if (carousel._id !== carouselId) {
        dispatch(listCarouselDetails(carouselId))
      } else {
        setImageSrc(carousel.imageSrc)
        setImageAlt(carousel.imageAlt)
      }
    }
  }, [dispatch, history, carousel, carouselId, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateCarousel({
        _id: carouselId,
        imageSrc,
        imageAlt,
      }),
    )
  }

  return (
    <>
      <FormContainer>
        <h1>Edit Carousel</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="imageSrc">
              <Form.Label>Image Src</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                value={imageSrc}
                onChange={(e) => setImageSrc(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3" controlId="imageAlt">
              <Form.Label>Image Alt</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image Alt"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
            <Link to="/admin/carousellist" className="btn btn-light ms-3">
              Go Back
            </Link>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default CarouselEditScreen
