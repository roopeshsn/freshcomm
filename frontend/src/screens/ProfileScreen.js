import React, {useEffect} from 'react'
import {Row, Col, Card} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const ProfileScreen = ({ location, history }) => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    })

  return (
      <Row>
          <h1>Your Account</h1>
          <Col>
              <Link to={"/profile/orders"}>
                  <Card>
                      <Card.Body>
                          <h5>Your Orders</h5>
                          <p>Track, return, or buy things again</p>
                      </Card.Body>
                  </Card>
              </Link>
          </Col>

          <Col>
              <Link to={"/profile/security"}>
                  <Card>
                      <Card.Body>
                          <h4>Security</h4>
                          <p>Edit login, name, and mobile number</p>
                      </Card.Body>
                  </Card>
              </Link>
          </Col>

          <Col>
              <Link to={"/profile/addresses"}>
                  <Card>
                      <Card.Body>
                          <h4>Your Addresses</h4>
                          <p>Edit addresses for orders and gifts</p>
                      </Card.Body>
                  </Card>
              </Link>
          </Col>
      </Row>
  )
}

export default ProfileScreen
