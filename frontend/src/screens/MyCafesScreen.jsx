import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listMyCafes } from '../actions/cafeActions'
import CafeCard from '../components/CafeCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { CAFE_DELETE_RESET } from '../constants/cafeConstants';

const MyCafesScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cafeList = useSelector(state => state.cafeList)
  const { error, loading, cafes } = cafeList

  const cafeDelete = useSelector(state => state.cafeDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = cafeDelete

  useEffect(() => {
    if (errorDelete) {
      window.alert(`Failed to delete cafe. ${errorDelete}`)
      dispatch({ type: CAFE_DELETE_RESET })
    }
    dispatch(listMyCafes())

  }, [dispatch, errorDelete, navigate, successDelete])

  return (
    <>
      <h3>My Cafes</h3>
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
    </>
  );
};

export default MyCafesScreen;
