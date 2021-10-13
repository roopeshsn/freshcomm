import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap'
import calculateDiscount from '../utils/calculateDiscount'
import formatter from '../utils/currencyFormatter'

const Product = ({ product }) => {
  const [discountPercentage] = calculateDiscount(product.mrp, product.price)

  return (
    <Card className='my-3 p-3 rounded'>
      <Row className='align-items-center justify-content-center'>
        <Col className='col-5' sm={4} md={4} xl={4}>
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
              <h6 className='d-inline'>{formatter(product.price)}</h6>
              <p className='my-1'>
                <span>M.R.P:</span>
                <span className='d-inline mx-1 text-decoration-line-through'>
                  {formatter(product.mrp)}
                </span>
                <span className='my-1'>({discountPercentage}% off)</span>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default Product
