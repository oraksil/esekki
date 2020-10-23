import Link from 'next/link'
import styles from './cardboard.module.css'
import React from 'react'

import { Pack } from '../types/game'

interface Props {
  pack: Pack
}

const PlayableGameCard = (props: Props) => {
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
            <button className={styles['btn-play']}>
              {/* <img src="https://www.freepnglogos.com/uploads/play-button-png/icon-png-play-button-icons-and-png-backgrounds-24.png" /> */}
              <span>PLAY GAME</span>
            </button>
          </Link>
          {/* <div> */}
          {/* <span>2</span> */}
          {/* <span>P</span> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default PlayableGameCard
