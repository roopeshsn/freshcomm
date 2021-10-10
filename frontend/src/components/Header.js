import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { BsWhatsapp, BsCart } from 'react-icons/bs'
import { FiPhoneCall, FiUser } from 'react-icons/fi'
import { FaCircle } from 'react-icons/fa'

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
      <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Online Store</Navbar.Brand>
          </LinkContainer>
          <Nav className='nav-right'>
            <Nav.Link href='//api.whatsapp.com/send?phone=+918122995372&text=help' target='_blank'>
              <BsWhatsapp size='2em' />
            </Nav.Link>

            <Nav.Link href='tel:+91-8122995372'>
              <FiPhoneCall size='2em' />
            </Nav.Link>

            <LinkContainer to='/cart'>
              <Nav.Link data-rb-event-key='cart'>
                <BsCart size='2em' />
                {cartItems.length > 0 ? <FaCircle className='cart-circle' /> : ''}
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-md-auto'>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FiUser size='2em' /> Login / Sign Up
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
