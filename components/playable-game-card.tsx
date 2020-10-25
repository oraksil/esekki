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
    <Card style={{ width: '15rem' }}>
      <Card.Img variant='top' src='https://i.ytimg.com/vi/IWyS18Yf9J0/hqdefault.jpg' />
      <Card.Body>
        <Card.Title style={{ fontSize: '1.2em' }}>{pack.title}</Card.Title>
        <Card.Text>{pack.desc}</Card.Text>
        <Card.Text>{pack.maker}</Card.Text>
        <Button variant='primary' onClick={() => props.onStart(pack)}>
          Play Game
        </Button>
      </Card.Body>
    </Card>
  )
}

export default PlayableGameCard
