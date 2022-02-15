import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { listCafeDetails } from '../actions/cafeActions';
import CafeCard from '../components/CafeCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { CAFE_DELETE_RESET } from '../constants/cafeConstants';

const CafeScreen = () => {
  const dispatch = useDispatch()

  const cafeDetails = useSelector(state => state.cafeDetails)
  const { error, loading, cafe } = cafeDetails

  const cafeDelete = useSelector(state => state.cafeDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = cafeDelete


  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (successDelete) {
      navigate('/')
      dispatch({ type: CAFE_DELETE_RESET })
    }
    if (errorDelete) {
      window.alert(`Failed to delete cafe. ${errorDelete}`)
      dispatch({ type: CAFE_DELETE_RESET })
    }

    dispatch(listCafeDetails(params.id))
  }, [params, dispatch, errorDelete, successDelete, navigate])

  return (
    <>
      <Link to='/' className='btn btn-light my-1'>Go back</Link>
      {loadingDelete && <Loader />}
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
