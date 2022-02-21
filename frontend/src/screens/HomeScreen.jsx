import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  }, [dispatch, errorDelete, keyword, navigate, successDelete])

  return (
    <>
      <h3>Latest entries</h3>
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
