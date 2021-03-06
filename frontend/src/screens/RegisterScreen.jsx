import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { USER_REGISTER_RESET } from '../constants/userConstants'


const RegisterScreen = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userRegister = useSelector(state => state.userRegister)

  const { error, loading, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
      dispatch({ type: USER_REGISTER_RESET })
    }
  }, [navigate, userInfo, redirect, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    }
    else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>New account</h1>
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
            Password
          </Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='passwordConfirm' className='mb-3'>
          <Form.Label className='mb-0'>
            Confirm Password
          </Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type='submit' variant='primary'>Register</Button>
        </div>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an account?&nbsp;
          <Link to={(redirect !== '/' && redirect !== '') ? `/login?redirect=${redirect}` : '/login'}>
            Sign in!
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
