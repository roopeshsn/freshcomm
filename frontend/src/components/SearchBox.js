import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import FormContainer from './FormContainer'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    setKeyword(e.target.value)
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <FormContainer style={{width: '100%',display: 'flex',justifyContent: "left",alignItems: 'left',alignSelf: 'left'  }} >
      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
          type="text"
          name="search"
          onChange={(e) => submitHandler(e)}
          placeholder="Search Freshbey"
          className=""
        ></Form.Control>

        {/* <Button type='submit' variant='secondary' className='p-2'>
          Search
        </Button> */}
      </Form>
    </FormContainer>
  )
}

export default SearchBox
