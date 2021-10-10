import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ className, variant, children }) => {
  return (
    <Alert className={className} variant={variant}>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
  className: 'my-2',
}

export default Message
