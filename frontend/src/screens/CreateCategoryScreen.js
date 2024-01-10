import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { CATEGORY_CREATE_FAIL } from '../constants/categoryConstants'
import { createCategory } from '../actions/categoryActions'

const CreateCategoryScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [imageSrc, setImageSrc] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const categoryCreate = useSelector((state) => state.categoryCreate)
  const { loading, error, success } = categoryCreate

  useEffect(() => {
    if (success) {
      history.push('/admin/categorylist')
    }
  }, [success, history])

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
        type: CATEGORY_CREATE_FAIL,
        payload: message,
      })
      setImageSrc('')
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createCategory({
        name,
        imageSrc,
        imageAlt,
      }),
    )
  }

  return (
    <>
      <FormContainer>
        <h1>Create Category</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image-file">
            <Row>
              <Col>
                <Form.Label>Category Image</Form.Label>
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
                    alt="category"
                  />
                )}
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="my-3" controlId="brand">
            <Form.Label>Image Alt</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image Alt"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className="my-3" type="submit" variant="primary">
            Create
          </Button>
          <Link to="/admin/categorylist" className="btn btn-light my-3 ms-3">
            Go Back
          </Link>
        </Form>
      </FormContainer>
    </>
  )
}

export default CreateCategoryScreen
