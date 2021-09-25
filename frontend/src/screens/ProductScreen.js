import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Breadcrumb, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import products from '../products'
import calculateDiscount from '../utils/calculateDiscount'

let screenWidth = null

const ProductScreen = ({ match }) => {
  const product = products.find((p) => p._id === match.params.id)
  const firstWord = product.name.split(' ')[0]
  const [discountPrice, discountPercentage] = calculateDiscount(product.mrp, product.price)

  return (
    <>
      <Breadcrumb>
        <LinkContainer to='/'>
          <Breadcrumb.Item href='#'>Wholesale</Breadcrumb.Item>
        </LinkContainer>
        {screenWidth || 0 > 720 ? (
          <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item active>{`${firstWord}...`}</Breadcrumb.Item>
        )}
      </Breadcrumb>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>{product.name}</h4>
            </ListGroup.Item>
            <ListGroup.Item>Price: Rs {product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price: <h4 className='d-inline'>Rs {product.price}</h4>{' '}
                    <div>
                      M.R.P:
                      <span className='mx-1 text-decoration-line-through'> Rs {product.mrp}</span>
                    </div>
                    <div>
                      You save: <span>Rs {discountPrice}</span>
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
              <ListGroup.Item>
                <Row className='mb-2'>
                  <Button as={Col} variant='primary'>
                    Add to Cart
                  </Button>
                </Row>
                <Row>
                  <Button as={Col} variant='secondary'>
                    Buy Now
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
