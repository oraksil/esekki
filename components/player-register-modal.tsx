import React, { useEffect, useRef, KeyboardEvent } from 'react'

import { Modal, Button, FormControl } from 'react-bootstrap'

interface Props {
  show: boolean
  onSubmit: (playerName: string) => void
}

const PlayerRegisterModal = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => inputRef?.current?.focus())

  const handleSubmit = () => {
    const playerName = inputRef?.current?.value
    if (playerName) {
      props.onSubmit(playerName)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <Modal {...props} aria-labelledby='new-player-registration' centered>
      <Modal.Header>
        <Modal.Title id='new-player-registration'>Quick Player Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          ref={inputRef}
          placeholder='Nickname'
          aria-label='player-name'
          aria-describedby='player-name'
          onKeyDown={handleKeyDown}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleSubmit()}>Go Play</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PlayerRegisterModal
