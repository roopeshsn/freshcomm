import React from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="flex-column flex-lg-row">
          <Col className="py-3">
            <ul className="list-unstyled d-flex li-separator justify-content-center align-items-center">
              <li className="d-flex px-1">
                <Nav.Link className="p-0" href="#" target="_blank">
                  Returns Policy
                </Nav.Link>
              </li>
              <li className="d-flex px-1">
                <Nav.Link className="p-0" href="#" target="_blank">
                  Terms of Use
                </Nav.Link>
              </li>
              <li>
                <Nav.Link className="p-0" href="#" target="_blank">
                  Privacy Policy
                </Nav.Link>
              </li>
            </ul>
          </Col>
          <Col className="text-center py-3">Copyright &copy; FreshBey</Col>
          <Col className="text-center py-3 d-flex justify-content-center">
            Need help? Visit the
            <Nav.Link
              className="py-0 px-1 text-decoration-underline"
              href="#"
              target="_blank"
            >
              Help Center
            </Nav.Link>
            or
            <Nav.Link
              className="py-0 px-1 text-decoration-underline"
              href="#"
              target="_blank"
            >
              Contact Us
            </Nav.Link>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
