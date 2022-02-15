import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useEffect } from 'react';
import { listCafeDetails, updateCafe } from '../actions/cafeActions';
import { CAFE_UPDATE_RESET } from '../constants/cafeConstants';

const EditCafeScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const [name, setName] = useState('')
  const [map_url, setMapUrl] = useState('')
  const [img_url, setImgUrl] = useState('')
  const [location, setLocation] = useState('')
  const [seats, setSeats] = useState('')
  const [has_toilet, setToilet] = useState(false)
  const [has_wifi, setWifi] = useState(false)
  const [has_sockets, setSockets] = useState(false)
  const [can_take_calls, setCalls] = useState(false)
  const [coffee_price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const { userInfo } = useSelector(state => state.userLogin)

  const cafeDetails = useSelector(state => state.cafeDetails)
  const { error, loading, cafe } = cafeDetails

  const cafeUpdate = useSelector(state => state.cafeUpdate)
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = cafeUpdate


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateCafe({
      id: cafe.id,
      name,
      map_url,
      img_url,
      location,
      seats: seats.toString(),
      has_toilet,
      has_wifi,
      has_sockets,
      can_take_calls,
      coffee_price,
      description,
    }))
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CAFE_UPDATE_RESET })
      navigate(`/cafe/${params.id}`)
    }
    if (!userInfo) {
      navigate('/login')
    }
    else {
      if (!cafe.name || Number(cafe.id) !== Number(params.id)) {
        // console.log('getting cafe info...')
        dispatch(listCafeDetails(params.id))
      }
      else {
        // console.log('setting cafe data')
        setName(cafe.name)
        setMapUrl(cafe.map_url)
        setImgUrl(cafe.img_url)
        setLocation(cafe.location)
        setSeats(cafe.seats)
        setToilet(cafe.has_toilet)
        setWifi(cafe.has_wifi)
        setSockets(cafe.has_sockets)
        setCalls(cafe.can_take_calls)
        setPrice(cafe.coffee_price)
        setDescription(cafe.description)
      }
    }

  }, [dispatch, navigate, params, userInfo, cafe, successUpdate])

  return (
    <>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger' >{errorUpdate}</Message>}
      {
        loading
          ? <Loader />
          : error
            ? <Message variant='danger' >{error}</Message>
            : userInfo && ((userInfo.id === cafe.user) || userInfo.is_admin)
              ? (
                <FormContainer>
                  <h2>Cafe Info</h2>
                  <Form onSubmit={submitHandler} >
                    <Form.Group controlId='name' className='mb-3'>
                      <Form.Label className='mb-0'>
                        Cafe Name
                      </Form.Label>
                      <Form.Control
                        required
                        type='text'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId='mapUrl' className='mb-3'>
                      <Form.Label className='mb-0'>
                        Google maps URL
                      </Form.Label>
                      <Form.Control
                        required
                        type='text'
                        placeholder='Enter map url'
                        value={map_url}
                        onChange={(e) => setMapUrl(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId='picture' className='mb-3'>
                      <Form.Label className='mb-0'>
                        Picture of the place
                      </Form.Label>
                      <Form.Control
                        required
                        type='text'
                        placeholder='Picture url'
                        value={img_url}
                        onChange={(e) => setImgUrl(e.target.value)}
                      />
                      <Form.Text className="text-muted">
                        You can check&nbsp;
                        <a href="https://www.youtube.com/watch?v=8IXA4muWlfA">this video</a>
                        &nbsp;on how to upload a picture and get its URL.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId='location' className='mb-3'>
                      <Form.Label className='mb-0'>
                        Location
                      </Form.Label>
                      <Form.Control
                        required
                        type='text'
                        placeholder='Enter location'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId='seats' className='mb-3'>
                      <Form.Label className='mb-0'>
                        Number of seats
                      </Form.Label>
                      <Form.Control
                        required
                        type='text'
                        placeholder=''
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId='toilet' className='my-3'>
                      <Form.Switch
                        id="toilet-switch"
                        label="Has toilets for costumers?"
                        checked={has_toilet}
                        onChange={(e) => setToilet(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='wifi' className='my-3'>
                      <Form.Switch
                        id="wifi-switch"
                        label="Provides WiFi?"
                        checked={has_wifi}
                        onChange={(e) => setWifi(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='sockets' className='my-3'>
                      <Form.Switch
                        id="sockets-switch"
                        label="Has power sockets?"
                        checked={has_sockets}
                        onChange={(e) => setSockets(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='calls' className='my-3'>
                      <Form.Switch
                        id="calls-switch"
                        label="Can you take long calls?"
                        checked={can_take_calls}
                        onChange={(e) => setCalls(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='price' className='mb-3'>
                      <Form.Label className='mb-0'>
                        Price per coffee
                      </Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Average price per coffee'
                        value={coffee_price || ''}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId='description' className='mb-3'>
                      <Form.Label className='mb-0'>
                        Description
                      </Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        placeholder='Your experience in this cafe'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ height: '100px' }}
                      />
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button type='submit' variant='primary' onClick={submitHandler} >Update Cafe</Button>
                    </div>
                  </Form>
                </FormContainer>
              )
              : <Message variant='danger' >Only the author of this cafe can edit it,
                make sure you logged in with the right user.</Message>
      }
    </>
  )
}

export default EditCafeScreen