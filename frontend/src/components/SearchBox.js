import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from './FormContainer'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <FormContainer>
      <Form onSubmit={submitHandler} className='my-3 d-flex'>
        <Form.Control
          type='text'
          name='search'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
          className='me-sm-2'
        ></Form.Control>

        <Button type='submit' variant='secondary' className='p-2'>
          Search
        </Button>
      </Form>
    </FormContainer>
  )
}

export default SearchBox
