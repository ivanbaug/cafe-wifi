import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()


  const logoutHandler = () => {
    dispatch(logout())
    // console.log('logout')
  }
  return (
    <>
      <style type='text/css'>
        {`
          .bg-custom{
            background-color: #3b2621;
          }
        `}
      </style>
      <Navbar variant='dark' bg='custom' expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <i className='fas fa-coffee pe-2' />
              Coffee and Wifi
            </Navbar.Brand>
          </LinkContainer>

          {userInfo && (
            <Navbar.Text className='pb-1'>
              Welcome back, {userInfo.name}
            </Navbar.Text>
          )}

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {userInfo
            ? (
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                  <LinkContainer to='/mysites'>
                    <Nav.Link><i className='fas fa-mug-hot pe-1' />My sites</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/new'>
                    <Nav.Link><i className='fas fa-plus-circle pe-1' />New site</Nav.Link>
                  </LinkContainer>

                  <Nav.Link onClick={logoutHandler}><i className='fas fa-sign-out-alt pe-1' />Logout</Nav.Link>

                </Nav>
              </Navbar.Collapse>
            )
            : (
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                  <LinkContainer to='/login'>
                    <Nav.Link><i className='fas fa-users pe-1' />Log In</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link><i className='fas fa-user-plus pe-1' />Register</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            )
          }

        </Container>
      </Navbar>
    </>
  )
};

export default Header;
