import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ResetPasswordScreen = ({ match }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    const token = match.params.token
    if (password !== confirmPassword) {
      setPasswordErrorMessage('Passwords do not match')
    } else {
      dispatch(resetPassword(token, password))
    }
  }

  const { loading, message, error } = useSelector((state) => state.userResetPassword)

  return (
    <FormContainer>
      <h1>Reset Password</h1>
      {passwordErrorMessage && <Message variant='danger'>{passwordErrorMessage}</Message>}
      {message && <Message variant='success'>{message}</Message>}
      {error && <Message variant='danger'>error</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label name='password'>New password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label name='confirmPassword'>Confirm new password</Form.Label>
          <Form.Control
            type='text'
            name='confirmPassword'
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className='d-block my-3' type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ResetPasswordScreen
