import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { PRODUCT_CREATE_FAIL } from '../constants/productConstants'
import { createProduct } from '../actions/productActions'
import { listCategories } from '../actions/categoryActions'
import Capitalizer from '../utils/capitalizeFirstLetter'

const CreateProductScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [mrp, setmrp] = useState(0)
  const [imageSrc, setImageSrc] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productCreate = useSelector((state) => state.productCreate)
  const categoryList = useSelector((state) => state.categoryList)
  const { loading, error, success } = productCreate
  const { categories } = categoryList

  // useEffect(() => {
  //   if (!product.name || product._id !== productId) {
  //     dispatch(listProductDetails(productId))
  //   } else {
  //     setName(product.name)
  //     setPrice(product.price)
  //     setImage(product.image)
  //     setImageAlt(product.imageAlt)
  //     setCategory(product.category)
  //     setCountInStock(product.countInStock)
  //     setDescription(product.description)
  //   }
  // }, [dispatch, history])

  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch])

  useEffect(() => {
    if (success) {
      history.push('/admin/productlist')
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
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      })
      setImageSrc('')
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProduct({
        name,
        price,
        mrp,
        imageSrc,
        imageAlt,
        category,
        description,
        countInStock,
      }),
    )
  }

  return (
    <>
      <FormContainer>
        <h1>Create Product</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-3" controlId="price">
            <Form.Label>MRP</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter MRP"
              value={mrp}
              onChange={(e) => setmrp(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image-file">
            <Row>
              <Col>
                <Form.Label>Product Image</Form.Label>
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

          <Form.Group className="my-3" controlId="brand">
            <Form.Label>Image Alt</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image Alt"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Count InStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="Category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              className="form-select"
              as="select"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
              }}
            >
              <option value="">--Select One--</option>
              {categories &&
                categories.map((category) => {
                  return (
                    <option key={category._id} value={category.name}>
                      {Capitalizer(category.name)}
                    </option>
                  )
                })}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={3}
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className="my-3" type="submit" variant="primary">
            Create
          </Button>
          <Link to="/admin/productlist" className="btn btn-light my-3 ms-3">
            Go Back
          </Link>
        </Form>
      </FormContainer>
    </>
  )
}

export default CreateProductScreen
