import React from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="small flex-column flex-lg-row mt-3 mb-2 justify-content-between">
          <Col>
            <ul className="list-unstyled d-flex li-separator justify-content-start align-items-start">
              <li className="d-flex pr-1">
                <Nav.Link className="p-0" href="#" target="_blank">
                  Returns
                </Nav.Link>
              </li>
              <li className="d-flex px-1">
                <Nav.Link className="p-0" href="#" target="_blank">
                  Terms
                </Nav.Link>
              </li>
              <li className="d-flex px-1">
                <Nav.Link className="p-0" href="#" target="_blank">
                  Privacy
                </Nav.Link>
              </li>
              <li>
                <Nav.Link className="p-0" href="#" target="_blank">
                  Help
                </Nav.Link>
              </li>
            </ul>
          </Col>
          <Col className="d-flex justify-content-lg-end">
            Copyright &copy; 2022 Freshbey
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
