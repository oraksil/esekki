import React from 'react'

import Card from 'react-bootstrap/Card'

import { Pack } from '../types/game'

import Button from 'react-bootstrap/Button'

interface Props {
  pack?: Pack
  flip?: boolean
  onSuggest?: () => void
}

const PreparingGameCard = (props: Props) => {
  const { pack, flip, onSuggest } = props

  if (flip) {
    return (
      <Card className='h-100 flex-row' bg='light'>
        <Card.Body className='text-center align-self-center'>
          <Button variant='warning' onClick={() => onSuggest && onSuggest()}>
            + Feedback
          </Button>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card>
      <Card.Img variant='top' style={{ height: '15rem' }} src={pack?.posterUrl} />
      <Card.Body>
        <Card.Title style={{ fontSize: '1.2em' }}>{pack?.title}</Card.Title>
        <Card.Text>{pack?.maker}</Card.Text>
        <Card.Text>{pack?.maxPlayers} Players</Card.Text>
        <Button variant='light' disabled>
          Preparing
        </Button>
      </Card.Body>
    </Card>
  )
}

export default PreparingGameCard
