import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Col, Row, Button, Form } from 'react-bootstrap'
import calculateDiscount from '../utils/calculateDiscount'
import formatter from '../utils/currencyFormatter'
import { addToCart } from '../actions/cartActions'

const Product = ({ product, history }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const [discountPercentage] = calculateDiscount(product.mrp, product.price)

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty))
    history.push('/cart')
  }

  return (
    <Card className="my-3 p-3 rounded">
      <Row className="align-items-center justify-content-center">
        <Col className="col-5" sm={4} md={4} xl={4}>
          <Link to={`/product/${product._id}`}>
            <Card.Img src={product.imageSrc} alt="product" />
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
              <h6 className="d-inline">{formatter(product.price)}</h6>
              <p className="my-1">
                <span>M.R.P:</span>
                <span className="d-inline mx-1 text-decoration-line-through">
                  {formatter(product.mrp)}
                </span>
                <span className="my-1">({discountPercentage}% off)</span>
              </p>
              {product.countInStock > 0 && (
                <Row>
                  <Col>
                    <Form.Control
                      as="select"
                      value={qty}
                      size="sm"
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1} Kg
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={addToCartHandler}
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default Product
