import { useState, useEffect } from 'react';
import axios from 'axios'
import CafeCard from '../components/CafeCard';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CafeScreen = () => {
  const params = useParams()
  // const cafe = cafes.find(x => Number(x.id) === Number(params.id))
  const [cafe, setCafe] = useState({})

  useEffect(() => {
    async function fetchCafe() {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/cafes/${params.id}`)
      setCafe(data)
    }
    fetchCafe()

  }, [params])

  return (
    <>
      <Link to='/' className='btn btn-light my-1' >Go back</Link>
      <CafeCard cafe={cafe} displayData='full' />
    </>
  )
};

export default CafeScreen;
