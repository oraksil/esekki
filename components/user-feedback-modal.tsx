import React, { useEffect, useRef, KeyboardEvent, useState } from 'react'

import { Modal, Button, FormControl } from 'react-bootstrap'

interface Props {
  show: boolean
  onHide: () => void
  onSubmit: (userFeedback: string) => void
}

const UserFeedbackModal = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => inputRef?.current?.focus())

  const handleSubmit = () => {
    const userFeedback = inputRef?.current?.value
    if (userFeedback) {
      props.onSubmit(userFeedback)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <Modal {...props} onHide={props.onHide} aria-labelledby='user-feedback-form' centered>
      <Modal.Header closeButton>
        <Modal.Title id='user-feedback-form'>Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Any cool games you had enjoyed? or any feedback is welcome!</p>
        <FormControl
          ref={inputRef}
          placeholder=':)'
          aria-label='user-feedback'
          aria-describedby='user-feedback'
          onKeyDown={handleKeyDown}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='light' onClick={() => props.onHide()}>
          Close
        </Button>
        <Button onClick={() => handleSubmit()}>Suggest</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserFeedbackModal
