import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Category from '../components/Category'
import { listCategories } from '../actions/categoryActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Slider from '../components/Slider'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const categoryList = useSelector((state) => state.categoryList)
  const { loading, error, categories } = categoryList
  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch])
  return (
    <>
      <Slider />
      <div className='mt-4 mb-3'>
        <h1>Shop by category</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Row>
            {categories.map((category) => (
              <Col key={category._id} className='col-6' sm={4} md={4} lg={3} xl={3}>
                <Category category={category} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  )
}

export default HomeScreen
