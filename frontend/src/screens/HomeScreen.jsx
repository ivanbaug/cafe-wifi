import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCafes } from '../actions/cafeActions'
import CafeCard from '../components/CafeCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch()

  const cafeList = useSelector(state => state.cafeList)
  const { error, loading, cafes } = cafeList

  useEffect(() => {
    dispatch(listCafes())
  }, [dispatch])

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
