import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Form,Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listCategoryDetails,updateCategory } from '../actions/categoryActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  CATEGORY_DETAILS_RESET,
  CATEGORY_UPDATE_RESET,
  CATEGORY_UPDATE_FAIL,
} from '../constants/categoryConstants'

const CategoryEditScreen = ({ match, history }) => {
  const categoryId = match.params.id
  const [name, setName] = useState('')
  const [imageSrc, setImageSrc] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { loading, error, category } = categoryDetails

  const categoryUpdate = useSelector((state) => state.categoryUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET })
      dispatch({ type: CATEGORY_DETAILS_RESET })
      history.push('/admin/categorylist')
    } else {
      if (category._id !== categoryId) {
        dispatch(listCategoryDetails(categoryId))
      } else {
        setName(category.name)
        setImageSrc(category.imageSrc)
        setImageAlt(category.imageAlt)
      }
    }
  }, [dispatch, history, category, categoryId, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImageSrc(data)
      setUploading(false)
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: CATEGORY_UPDATE_FAIL,
        payload: message,
      })
      setImageSrc('')
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    console.log(categoryId);
    e.preventDefault()
    dispatch(
      updateCategory({
        _id: categoryId,
        name,
        imageSrc,
        imageAlt,
      }),
    )
  }

  return (
    <>
      <FormContainer>
        <h1>Edit Category</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>

          <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image-file">
              <Row>
                <Col>
                  <Form.Label>Upload Category Image</Form.Label>
                  <Form.File
                    id="image-file"
                    size="sm"
                    custom
                    variant="secondary"
                    onChange={uploadFileHandler}
                  ></Form.File>
                </Col>
                <Col>
                  {uploading && <Loader />}
                  {!uploading && imageSrc && (
                    <img
                      src={imageSrc}
                      className={'m-2'}
                      width={100}
                      height={100}
                      alt="product"
                    />
                  )}
                </Col>
              </Row>
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

export default CategoryEditScreen
