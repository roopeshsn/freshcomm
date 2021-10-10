import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Row } from 'react-bootstrap'
import calculateDiscount from '../utils/calculateDiscount'

const Product = ({ product }) => {
  const [discountPercentage] = calculateDiscount(product.mrp, product.price)

  return (
    <Card className='my-3 p-3 rounded'>
      <Row className='align-items-center justify-content-center'>
        <Col>
          <Link to={`/product/${product._id}`}>
            <Card.Img src={product.imageSrc} alt='product' />
          </Link>
        </Col>
        <Col>
          <div>
            <Link to={`/product/${product._id}`}>
              <div>
                <strong>{product.name}</strong>
              </div>
            </Link>
            <div>
              <h6 className='d-inline'>Rs {product.price}</h6>
              <p className='my-1'>
                <span>M.R.P:</span>
                <span className='d-inline mx-1 text-decoration-line-through'>Rs {product.mrp}</span>
                <span className='my-1'>({discountPercentage}% off)</span>
              </p>
            </div>
            <Button className='rounded' variant='primary' size='sm'>
              Add to Cart
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default Product
