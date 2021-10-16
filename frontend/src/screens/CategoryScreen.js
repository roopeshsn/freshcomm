import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { listProductsByCategory } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const CategoryScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productListByCategory)
  const { loading, error, products } = productList
  useEffect(() => {
    dispatch(listProductsByCategory(match.params.category))
  }, [dispatch, match])
  return (
    <>
      <h4>Latest Stocks on demand</h4>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
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

export default CategoryScreen
