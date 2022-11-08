import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { listProductsByCategory } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { SortDropDown } from '../components/SortDropDown'
import { sorter } from '../utils/sorter'

const CategoryScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productListByCategory)
  const { loading, error, products } = productList

  const { sortBy } = useSelector((state) => state.sortProducts)
  let sorted = sorter(products, sortBy);

  useEffect(() => {
    dispatch(listProductsByCategory(match.params.category))
  }, [dispatch, match])

  return (
    <>
      <h1>Latest Stocks on demand</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        <SortDropDown/>
        <Row>
        {sorted.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
              <Product product={product} history={history} />
            </Col>
          ))}
        </Row>
        </>
      )}
    </>
  )
}

export default CategoryScreen
