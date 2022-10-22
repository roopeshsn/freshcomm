import React from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="small flex-column flex-lg-row mt-3 mb-2 justify-content-between">
          <Col>
            <ul className="list-unstyled d-flex li-separator justify-content-start align-items-start">
              <li className="d-flex pr-1">
                <Link className="p-0 text-link" to="/returns">
                  Returns
                </Link>
              </li>
              <li className="d-flex px-1">
                <Link className="p-0 text-link" to="/terms">
                  Terms
                </Link>
              </li>
              <li className="d-flex px-1">
                <Link className="p-0 text-link" to="/privacy">
                  Privacy
                </Link>
              </li>
              <li className="d-flex px-1">
                <Link className="p-0 text-link" to="/help">
                  Help
                </Link>
              </li>
              <li>
                <Nav.Link
                  className="p-0 text-link"
                  href="https://github.com/roopeshsn/freshbey"
                  target="_blank"
                >
                  GitHub
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
