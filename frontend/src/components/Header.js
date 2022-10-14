import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { BsWhatsapp, BsCart } from 'react-icons/bs'
import { FiPhoneCall, FiUser } from 'react-icons/fi'
import { FaCircle } from 'react-icons/fa'
import SearchBox from './SearchBox'
import { Route } from 'react-router'
import { useLocation } from 'react-router'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
  }
  const location = useLocation()

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand id="logo-text">Freshbey</Navbar.Brand>
          </LinkContainer>
          <Nav className="nav-right">
            <Nav.Link>
              <BsWhatsapp size="1.5em" />
            </Nav.Link>

            <Nav.Link>
              <FiPhoneCall size="1.5em" />
            </Nav.Link>

            <LinkContainer to="/cart">
              <Nav.Link data-rb-event-key="cart">
                <BsCart size="1.5em" />
                {cartItems.length > 0 && <FaCircle className="cart-circle" />}
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {location.pathname === '/login' ||
            location.pathname === '/register' ||
            location.pathname === '/forgotpassword' ||
            location.pathname === '/forgotpassword/:email' ? (
              ''
            ) : (
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            )}
            <Nav className="ms-md-2 ms-md-auto">
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  className="me-0"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="pe-0">
                    <FiUser size="1.5em" /> Login / Sign Up
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu" className="me-0">
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/carousellist">
                    <NavDropdown.Item>Carousels</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/categorylist">
                    <NavDropdown.Item>Categories</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
