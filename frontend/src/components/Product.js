import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import calculateDiscount from '../utils/calculateDiscount'

const Product = ({ product }) => {
  const [discountPercentage] = calculateDiscount(product.mrp, product.price)

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div' className='my-3'>
          <h3 className='d-inline'>Rs {product.price}</h3>
          <div className='my-2'>
            M.R.P:
            <span className='d-inline mx-2 text-decoration-line-through'>Rs {product.mrp}</span>
            <span className='my-1'>({discountPercentage}% off)</span>
          </div>
        </Card.Text>
        <Button className='rounded' variant='primary' size='sm'>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  )
}

export default Product
