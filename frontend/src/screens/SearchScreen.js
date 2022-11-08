import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { SortDropDown } from '../components/SortDropDown'
import { sorter } from '../utils/sorter'


const SearchScreen = ({ match, history }) => {
  const keyword = match.params.keyword
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productListBySearch)
  const { loading, error, products } = productList

  const { sortBy } = useSelector((state) => state.sortProducts)
  let sorted = sorter(products, sortBy);

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, match, keyword])
  return (
    <>
      <h1>Results based on your search</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
      <>
        <SortDropDown/>
        <Row>
          {/* {!products && <Message variant='info'>No products found based on your search</Message>} */}
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

export default SearchScreen
