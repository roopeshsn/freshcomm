import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Error404Screen() {
  return (
    <>
      <br />
      <center className="mt-5 ">
        <Row className="g-0 d-flex align-items-center">
          <Col xs={5} md={6}>
            <div className="text-dark display-1 float-end">404</div>
          </Col>
          <Col xs={7} md={6}>
            <p className="text-dark float-start pt-2 pt-md-3">
              <b>Page not found</b>
            </p>
          </Col>
        </Row>
        <LinkContainer to="/">
          <Button className="mt-1 px-5">Take me home</Button>
        </LinkContainer>
      </center>
    </>
  )
}

export default Error404Screen
