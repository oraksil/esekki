import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

interface Props {
  iconPath: String
}

const IconButton = (props: Props) => {
  return (
      <div className='icon-button' >
      <Button>Guide</Button>
    </div>
  )
}

export default IconButton
