import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Image, ListGroup, Card, Button, Breadcrumb, Form } from 'react-bootstrap'
import calculateDiscount from '../utils/calculateDiscount'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import formatter from '../utils/currencyFormatter'
import { addToCart } from '../actions/cartActions'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, product, error } = productDetails
  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
    // const fetchProduct = async () => {
    //   const { data } = await axios.get(`/api/products/${match.params.id}`)
    //   setProduct(data)
    // }
    // fetchProduct()
  }, [dispatch, match])

  const addToCartHandler = () => {
    // history.push(`/cart/${match.params.id}?qty=${qty}`)
    dispatch(addToCart(product._id, qty))
    history.push('/cart')
  }

  const [discountPrice, discountPercentage] = calculateDiscount(product.mrp, product.price)

  return (
    <>
      <Breadcrumb>
        <LinkContainer to='/'>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to={`/categories/${product.category}`}>
          <Breadcrumb.Item>{capitalizeFirstLetter(product.category)}</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row className='justify-content-center'>
          <Col md={4} lg={5}>
            <Image src={product.imageSrc} alt={product.name} fluid />
          </Col>
          <Col md={4} lg={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>{product.name}</h4>
              </ListGroup.Item>
              <ListGroup.Item>Price: {formatter(product.price)}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4} lg={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Price: <h4 className='d-inline'>{formatter(product.price)}</h4>{' '}
                      <div>
                        M.R.P:
                        <span className='mx-1 text-decoration-line-through'>
                          {formatter(product.mrp)}
                        </span>
                      </div>
                      <div>
                        You save: <span>{formatter(discountPrice)}</span>
                        <span className='mx-2'>({discountPercentage}% off)</span>
                      </div>
                    </Col>
                  </Row>
                  <Row className='mt-2'>
                    <Col>
                      <span>Status:</span>
                      {product.countInStock > 0 ? (
                        <span className='badge rounded-pill bg-success mx-2'>In Stock</span>
                      ) : (
                        <span className='badge rounded-pill bg-danger mx-2'>Out of Stock</span>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1} Kg
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Row className='mb-2'>
                    <Button
                      onClick={addToCartHandler}
                      as={Col}
                      variant='primary'
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
