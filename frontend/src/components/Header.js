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

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>FreshBey</Navbar.Brand>
          </LinkContainer>
          <Nav className="nav-right">
            <Nav.Link
              href="//api.whatsapp.com/send?phone=+916369984456&text=help"
              target="_blank"
            >
              <BsWhatsapp size="1.5em" />
            </Nav.Link>

            <Nav.Link href="tel:+91-6369984456">
              <FiPhoneCall size="1.5em" />
            </Nav.Link>

            <LinkContainer to="/cart">
              <Nav.Link data-rb-event-key="cart">
                <BsCart size="1.5em" />
                {cartItems.length > 0 ? (
                  <FaCircle className="cart-circle" />
                ) : (
                  ''
                )}
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-md-auto">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FiUser size="1.5em" /> Login / Sign Up
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
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
      <Route render={({ history }) => <SearchBox history={history} />} />
    </header>
  )
}

export default Header
