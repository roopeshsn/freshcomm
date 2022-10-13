import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import formatter from '../utils/currencyFormatter'
import { TiTick } from 'react-icons/ti'
import { AiFillInfoCircle } from 'react-icons/ai'
import {
  freeDeliveryCutoff,
  deliveryCharge,
} from '../constants/deliveryChargeConstants'

const CartScreen = ({ match, location, history }) => {
  // const productId = match.params.id

  // const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const cartItemsPrice = cartItems.reduce(
    (acc, item) => acc + parseInt(item.qty) * parseInt(item.price),
    0,
  )
  const shippingPrice =
    cartItemsPrice >= freeDeliveryCutoff ? 0 : deliveryCharge

  // useEffect(() => {
  //   if (productId) {
  //     dispatch(addToCart(productId, qty))
  //   }
  // }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
    history.push('/cart')
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <h4>Shopping Cart</h4>
      {cartItems.length === 0 ? (
        <div className="pl-3 pr-2">
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        </div>
      ) : (
        <Col sm={12} md={6} lg={4} xl={4}>
          {cartItems.map((item) => (
            <Card className="my-3 p-3 rounded" key={item.product}>
              <Row className="align-items-center justify-content-center">
                <Col className="col-4">
                  <Link to={`/product/${item.product}`}>
                    <Card.Img src={item.imageSrc} alt={item.name} />
                  </Link>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <Link to={`/product/${item.product}`}>
                        <Card.Title>{item.name}</Card.Title>
                      </Link>
                    </Col>
                    <Col>
                      <h6>{formatter(item.price)}</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Control
                        as="select"
                        size="sm"
                        value={parseInt(item.qty)}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value)),
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1} Kg
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        size="sm"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
      )}

      <Col md={6} lg={6} xl={4}>
        <Card className="my-3 p-3 rounded">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0)})
                items
              </h5>
              {formatter(
                cartItems.reduce((acc, item) => acc + item.qty * item.price, 0),
              )}
            </ListGroup.Item>
            {cartItems.length !== 0 && (
              <>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{formatter(shippingPrice)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {cartItemsPrice < freeDeliveryCutoff ? (
                    <>
                      <AiFillInfoCircle size="1.4rem" color="#f4bd61" />
                      <p className="d-inline mx-2">
                        Add {formatter(freeDeliveryCutoff - cartItemsPrice)} of
                        eligible items to your order for FREE delivery.
                      </p>
                    </>
                  ) : (
                    <>
                      <TiTick size="1.4rem" color="#34a853" />
                      <p className="d-inline-block mx-2">
                        You are eligible for free delivery!
                      </p>
                    </>
                  )}
                </ListGroup.Item>
              </>
            )}
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
