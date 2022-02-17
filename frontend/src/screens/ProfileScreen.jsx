
import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector(state => state.userDetails)
  const { error, loading, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile


  useEffect(() => {
    console.log(`entered effect`)
    if (!userInfo) {
      navigate('/login')
    }
    else {
      // TODO: check user._id underlined in the following line, i believe it doesnt exists
      if (!user || !user.name || success || userInfo.user_id !== user.id) {
        console.log(`userInfo.user_id:${userInfo.user_id}`)
        console.log(`user.id:${user?.id}`)
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        if (success) {
          setMessage('Successfully updated!')
        }
      }
      else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [navigate, userInfo, dispatch, user, success])


  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    }
    else {
      // dispatch(register(name, email, password))
      // console.log('updating profile...')
      setMessage('')
      dispatch(updateUserProfile({
        'id': user._id,
        'name': name,
        'email': email,
        'password': password,
      }))
    }
  }

  return (
    <FormContainer>
      <h1>Profile</h1>
      {message && <Message variant='warning'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='mb-3'>
          <Form.Label className='mb-0'>
            Name
          </Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='email' className='mb-3'>
          <Form.Label className='mb-0'>
            Email Address
          </Form.Label>
          <Form.Control
            required
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password' className='mb-3'>
          <Form.Label className='mb-0'>
            New Password (Optional)
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='passwordConfirm' className='mb-3'>
          <Form.Label className='mb-0'>
            Confirm New Password
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type='submit' variant='primary'>Update my profile</Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default ProfileScreen