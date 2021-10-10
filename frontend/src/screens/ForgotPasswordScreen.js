import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ForgotPasswordScreen = ({ match }) => {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()

  const { loading, message, error } = useSelector((state) => state.userForgotPassword)

  useEffect(() => {
    if (match.params.email) {
      setEmail(match.params.email)
    }
  }, [match])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
  }

  return (
    <FormContainer>
      <h1>Password assistance</h1>
      <p>Enter the email address associated with your account.</p>
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='success'>{message}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label name='email'>Email Address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className='d-block my-3' type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ForgotPasswordScreen
