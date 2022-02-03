import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
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
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to='/mysites'>
                <Nav.Link><i className='fas fa-mug-hot pe-1' />My sites</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/new'>
                <Nav.Link><i className='fas fa-plus-circle pe-1' />New site</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link><i className='fas fa-users pe-1' />Log In</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/register'>
                <Nav.Link><i className='fas fa-user-plus pe-1' />Register</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/logout'>
                <Nav.Link><i className='fas fa-sign-out-alt pe-1' />Logout</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
};

export default Header;
