import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listCafes } from '../actions/cafeActions'
import CafeCard from '../components/CafeCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cafeList = useSelector(state => state.cafeList)
  const { error, loading, cafes } = cafeList


  const cafeDelete = useSelector(state => state.cafeDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = cafeDelete


  useEffect(() => {
    dispatch(listCafes())

    // if (successDelete) {
    //   navigate('/')
    // }

  }, [dispatch, navigate, successDelete])

  return (
    <>
      <h3>Latest entries</h3>
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

export default HomeScreen;
