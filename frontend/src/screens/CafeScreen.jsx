import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { listCafeDetails } from '../actions/cafeActions';
import CafeCard from '../components/CafeCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CafeScreen = () => {
  const dispatch = useDispatch()

  const cafeDetails = useSelector(state => state.cafeDetails)
  const { error, loading, cafe } = cafeDetails


  const params = useParams()
  // const cafe = cafes.find(x => Number(x.id) === Number(params.id))
  // const [cafe, setCafe] = useState({})

  useEffect(() => {
    dispatch(listCafeDetails(params.id))
  }, [params, dispatch])

  return (
    <>
      <Link to='/' className='btn btn-light my-1'>Go back</Link>
      {
        loading
          ? <Loader />
          : error
            ? <Message variant='danger' >{error}</Message>
            : <CafeCard cafe={cafe} displayData='full' />
      }
    </>
  )
};

export default CafeScreen;
