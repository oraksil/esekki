import React from 'react'

import Card from 'react-bootstrap/Card'

import { Pack } from '../types/game'

import Button from 'react-bootstrap/Button'

interface Props {
  pack: Pack
  onStart: (pack: Pack) => void
}

const PlayableGameCard = (props: Props) => {
  const { pack } = props
  return (
    <Card>
      <Card.Img variant='top' style={{ height: '15rem' }} src={pack.poster_url} />
      <Card.Body>
        <Card.Title style={{ fontSize: '1.2em' }}>{pack?.title}</Card.Title>
        <Card.Text>{pack?.maker}</Card.Text>
        <Card.Text>{pack?.max_players} Players</Card.Text>
        <Button variant='primary' onClick={() => props.onStart(pack)}>
          Play Game
        </Button>
      </Card.Body>
    </Card>
  )
}

export default PlayableGameCard
