import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'
const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    setKeyword(e.target.value)
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Container className="col-lg-9 col-12 m-auto p-0 ">
      <Row className="justify-content-md-center m-auto">
        <Col xs={12} md={12} className="p-0">
          <Form onSubmit={submitHandler} className="d-flex ">
            <Form.Control
              type="text"
              name="search"
              onChange={(e) => submitHandler(e)}
              placeholder="Search Freshbey"
              className="my-1"
            ></Form.Control>

            {/* <Button type='submit' variant='secondary' className='p-2'>
          Search
        </Button> */}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SearchBox
