import Link from 'next/link'
import styles from './cardboard.module.css'
import React from 'react'

import Card from 'react-bootstrap/Card'

import { Pack } from '../types/game'

import Button from 'react-bootstrap/Button'

interface Props {
  pack: Pack
}

const PlayableGameCard_old = (props: Props) => {
  return (
    <div className={styles['cardboard']}>
      <img className={styles['poster-img']} src='https://i.ytimg.com/vi/IWyS18Yf9J0/hqdefault.jpg' />

      <div>
        <div className={styles['pack-profile']}>
          <div>
            <span className={styles['game-title']}>{props.pack.title}</span>
          </div>
          <div>
            <span className={styles['game-maker']}>{props.pack.maker}</span>
          </div>
          <Link href='/playing'>
            <Button>
              {/* <img src="https://www.freepnglogos.com/uploads/play-button-png/icon-png-play-button-icons-and-png-backgrounds-24.png" /> */}
              <span>PLAY GAME</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const PlayableGameCard = (props: Props) => {
  return (
    <Card style={{ width: '15rem' }}>
      <Card.Img variant='top' src='https://i.ytimg.com/vi/IWyS18Yf9J0/hqdefault.jpg' />
      <Card.Body>
        <Card.Title style={{ fontSize: '1.2em' }}>{props.pack.title}</Card.Title>
        <Card.Text>{props.pack.desc}</Card.Text>
        <Card.Text>{props.pack.maker}</Card.Text>
        <Button variant='primary'>Play Game</Button>
      </Card.Body>
    </Card>
  )
}

export default PlayableGameCard
