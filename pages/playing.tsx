import React from 'react'
import { useEffect, useState } from 'react'
import Head from 'next/head'

import Layout from '../components/layout'
import GamePlayer from '../components/game-player'

import styles from './playing.module.css'

const PLAYER_PADDING_TOP_RATIO = 0.2375
const PLAYER_HEIGHT_RATIO = 0.4761
const PLAYER_ASPECT_RATIO = 1.3342

type PlayerRect = {
  marginTop: number
  width: number
  height: number
}

const calculatePlayerRect = (windowHeight: number): PlayerRect => {
  const marginTop = windowHeight * PLAYER_PADDING_TOP_RATIO
  const height = windowHeight * PLAYER_HEIGHT_RATIO 
  const width = height * PLAYER_ASPECT_RATIO
  return { marginTop, width, height }
}

const Playing = () => {
  const [stream, setStream] = useState<MediaStream>()

  const [playerRect, setPlayerRect] = useState<PlayerRect>()

  useEffect(() => {
    setPlayerRect(calculatePlayerRect(window.innerHeight))
    window.addEventListener('resize', () => {
      setPlayerRect(calculatePlayerRect(window.innerHeight))
    })
  }, [])

  return (
    <Layout>
      <Head>
        <title>Hello</title>
      </Head>
      <div className={styles['container']}>
        <div className={styles['orakki-box']}>
          <div className={styles['orakki-screen']} style={{ ...playerRect }}>
            <GamePlayer stream={stream} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Playing

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  // return {
    // props: {},
  // }
// })
