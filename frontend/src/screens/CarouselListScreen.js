import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { listCarousels } from '../actions/carouselActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const CarouselListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const carouselList = useSelector((state) => state.carouselList)
  const { loading, error, carousels } = carouselList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listCarousels())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const createCarouselHandler = () => {
    history.push('/admin/createcarousel')
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Carousels</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createCarouselHandler}>
            <i className='fas fa-plus'></i> Create Carousel
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>IMAGE SRC</th>
              <th>IMAGE ALT</th>
              <th>OPTIONS</th>
            </tr>
          </thead>
          <tbody>
            {carousels.map((carousel) => (
              <tr key={carousel._id}>
                <td>{carousel._id}</td>
                <td>{carousel.createdAt.substring(0, 10)}</td>
                <td>
                  <a href={carousel.imageSrc} target='_blank' rel='noreferrer'>
                    {carousel.imageSrc}
                  </a>
                </td>
                <td>{carousel.imageAlt}</td>
                <td>
                  <LinkContainer to={`/admin/carousel/${carousel._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      Edit
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default CarouselListScreen
