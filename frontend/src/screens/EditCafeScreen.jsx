import React, { useState } from 'react'
import { Button, Form, } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'




const EditCafeScreen = () => {
  const [name, setName] = useState('')
  const [mapUrl, setMapUrl] = useState('')
  const [picture, setPicture] = useState('')
  const [location, setLocation] = useState('')
  const [seats, setSeats] = useState('')
  const [toilet, setToilet] = useState(false)
  const [wifi, setWifi] = useState(false)
  const [sockets, setSockets] = useState(false)
  const [calls, setCalls] = useState(false)
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')


  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (

    <FormContainer>
      <h2>Edit Cafe</h2>
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
            value={mapUrl}
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
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
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
            checked={toilet}
            onChange={(e) => setToilet(e.target.checked)}
          />
        </Form.Group>
        <Form.Group controlId='wifi' className='my-3'>
          <Form.Switch
            id="wifi-switch"
            label="Provides WiFi?"
            checked={wifi}
            onChange={(e) => setWifi(e.target.checked)}
          />
        </Form.Group>
        <Form.Group controlId='sockets' className='my-3'>
          <Form.Switch
            id="sockets-switch"
            label="Has power sockets?"
            checked={sockets}
            onChange={(e) => setSockets(e.target.checked)}
          />
        </Form.Group>
        <Form.Group controlId='calls' className='my-3'>
          <Form.Switch
            id="calls-switch"
            label="Can you take long calls?"
            checked={calls}
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
            value={price}
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
          <Button type='submit' variant='primary'>Update Cafe</Button>
        </div>
      </Form>
    </FormContainer>

  )
}

export default EditCafeScreen