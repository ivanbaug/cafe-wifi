import { useEffect } from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { listCafes } from '../actions/cafeActions'
import CafeCard from '../components/CafeCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { CAFE_DELETE_RESET } from '../constants/cafeConstants';

const HomeScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  let keyword = location.search
  let lparams = new URLSearchParams(keyword)
  let query = lparams.get('keyword')

  const cafeList = useSelector(state => state.cafeList)
  const { error, loading, cafes, page, pages } = cafeList

  const cafeDelete = useSelector(state => state.cafeDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = cafeDelete

  useEffect(() => {
    if (errorDelete) {
      window.alert(`Failed to delete cafe. ${errorDelete}`)
      dispatch({ type: CAFE_DELETE_RESET })
    }
    dispatch(listCafes(keyword))
    console.log(query)

  }, [dispatch, errorDelete, keyword, navigate, successDelete])

  return (
    <>
      <Row>
        <Col md={9}>
          {
            query && query === 'top'
              ? <h3>Top Rated</h3>
              : <h3>Latest entries</h3>
          }

        </Col>
        <Col md={3}>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-sort">
              Sort by
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <LinkContainer
                to={`/?keyword=recent&page=1`}            >
                <Dropdown.Item >Recent</Dropdown.Item>
              </LinkContainer>
              <LinkContainer
                to={`/?keyword=top&page=1`}>
                <Dropdown.Item >Top Rated</Dropdown.Item>
              </LinkContainer>
            </Dropdown.Menu>
          </Dropdown>

        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {
        loading
          ? <Loader />
          : error
            ? <Message variant='danger' >{error}</Message>
            : (
              cafes.map((cafe) => (<CafeCard key={cafe.id} cafe={cafe} />))
            )
      }
      <Paginate keyword={keyword} page={page} pages={pages} isAdmin={false} />

    </>
  );
};

export default HomeScreen;
