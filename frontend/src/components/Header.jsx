import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { logout } from '../actions/userActions'
import { createCafe } from '../actions/cafeActions';
import { CAFE_CREATE_RESET } from '../constants/cafeConstants';

const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const cafeCreate = useSelector(state => state.cafeCreate)
  const { error: errorCreate, success: successCreate, cafe: newCafe } = cafeCreate

  const newCafeHandler = () => {
    dispatch(createCafe())
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (errorCreate) {
      window.alert(`Something went wrong. ${errorCreate}`)
      dispatch({ type: CAFE_CREATE_RESET })
    }
    if (successCreate) {
      dispatch({ type: CAFE_CREATE_RESET })
      navigate(`/cafe/${newCafe.id}/edit`)
    }
  }, [dispatch, errorCreate, navigate, newCafe, successCreate])

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
                  <Nav.Link onClick={newCafeHandler}><i className='fas fa-plus-circle pe-1' />New site</Nav.Link>
                  <LinkContainer to='/profile'>
                    <Nav.Link><i className='fas fa-user pe-1' />My profile</Nav.Link>
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
