import React from 'react';

import CafeCard from '../components/CafeCard';
import cafes from '../cafes';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CafeScreen = () => {
  const params = useParams()
  const cafe = cafes.find(x => Number(x.id) === Number(params.id))

  return (
    <>
      <Link to='/' className='btn btn-light my-1' >Go back</Link>
      <CafeCard cafe={cafe} displayData='full' />
    </>
  )
};

export default CafeScreen;
