import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      variant='primary'
      style={{ margin: 'auto', display: 'block' }}
      className='my-2'
    >
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  )
}

export default Loader
