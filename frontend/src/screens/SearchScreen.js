import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const SearchScreen = ({ match, history }) => {
  const keyword = match.params.keyword
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productListBySearch)
  const [sortBy, setSortBy] = useState()
  const { loading, error, products } = productList
  useEffect(() => {
    dispatch(listProducts(keyword, sortBy))
  }, [dispatch, match, keyword, sortBy])
  return (
    <>
      <Row>
        <Col>
          <h1 className="my-auto">Results based on your search</h1>
        </Col>
        <Col xs={5} md={3} className="my-auto">
          <Form.Group>
            <Form.Control
              as="select"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value)
              }}
            >
              <option>Sort By: None</option>
              <option value="0">Sort By: Low To High</option>
              <option value="1">Sort By: High To Low</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {/* {!products && <Message variant='info'>No products found based on your search</Message>} */}
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
              <Product product={product} history={history} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default SearchScreen
