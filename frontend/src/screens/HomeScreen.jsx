import { useEffect } from 'react';
import CafeCard from '../components/CafeCard';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';

import { listCafes } from '../actions/cafeActions'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const cafeList = useSelector(state => state.cafeList)
  const { error, loading, cafes } = cafeList

  useEffect(() => {
    // async function fetchCafes() {
    //   const { data } = await axios.get('http://127.0.0.1:8000/api/cafes/')
    //   setCafes(data)
    // }
    // fetchCafes()
    dispatch(listCafes())

  }, [dispatch])

  return (
    <>
      <h3>Latest entries</h3>
      {
        loading
          ? <Loader />
          : (
            cafes.map((cafe) => (<CafeCard key={cafe.id} cafe={cafe} />))
          )
      }
    </>
  );
};

export default HomeScreen;
