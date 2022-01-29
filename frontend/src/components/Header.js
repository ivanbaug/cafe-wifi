import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

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
          <Navbar.Brand>
            <i className='fas fa-coffee pe-2' />
            Coffee and Wifi
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#link"><i className='fas fa-mug-hot pe-1' />My sites</Nav.Link>
              <Nav.Link href="#link"><i className='fas fa-plus-circle pe-1' />New site</Nav.Link>
              <Nav.Link href="#link"><i className='fas fa-users pe-1' />Log In</Nav.Link>
              <Nav.Link href="#link"><i className='fas fa-user-plus pe-1' />Register</Nav.Link>
              <Nav.Link href="#link"><i className='fas fa-sign-out-alt pe-1' />Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
};

export default Header;
