import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { WebRTCSession } from '../lib/webrtcsession'
import { RootState } from '../redux/store'
import { startNewGame, canJoinGame } from '../redux/common/actions'
import { setupSession } from '../redux/webrtc/actions'

import Layout from '../components/layout'
import GamePlayer from '../components/game-player'
import PlayerRegisterModal from '../components/player-register-modal'

import styles from './playing.module.css'

const PLAYER_PADDING_TOP_RATIO = 0.2375
const PLAYER_HEIGHT_RATIO = 0.4761
const PLAYER_ASPECT_RATIO = 1.3342

type PlayerRect = {
  marginTop: number
  width: number
  height: number
}

const setupResizeHandler = (playerRectSetter: any) => {
  const calculatePlayerRect = (windowHeight: number): PlayerRect => {
    const marginTop = windowHeight * PLAYER_PADDING_TOP_RATIO
    const height = windowHeight * PLAYER_HEIGHT_RATIO 
    const width = height * PLAYER_ASPECT_RATIO
    return { marginTop, width, height }
  }

  playerRectSetter(calculatePlayerRect(window.innerHeight))
  window.addEventListener('resize', () => {
    playerRectSetter(calculatePlayerRect(window.innerHeight))
  })
}

const setupKeyHandler = () => {
  const handleKeyInput = (evt: any) => {
    WebRTCSession.sendKeyInput(evt.which | evt.key, evt.type === 'keydown')
  }
  
  document.addEventListener('keyup', handleKeyInput)
  document.addEventListener('keydown', handleKeyInput)
}

const extractGameId = (query: any): number | null => {
  if (query.g) {
    return parseInt(query.g as string)
  }
  return null
}

////////////////////////////////////////////////////////////////////////////////
// Design Concept
// 
// Assumption:
// - For both new and joining game, 
//   url looks like /playing?g=123 (g={gameId})
//   it makes sense because there is an unique orakki.
//
// - New game has taken place already before landing here.
//   (it might need registration form if player not found.)
//   
// - Player session can exists or not exists.
//
// Flow:
//   1. If no player found, provide registration form and create a new player.
//      Once creating a player, we can start joining game.
//      
//   2. Now player exists and we should check to be able to join the game.
//
//   3. If ok, let's go set up webrtc session and play.
////////////////////////////////////////////////////////////////////////////////
const Playing = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [modalShow, setModalShow] = useState(false)
  const [stream, setStream] = useState<MediaStream>()
  const [playerRect, setPlayerRect] = useState<PlayerRect>()

  const player = useSelector((state: RootState) => state.common.player)
  const game = useSelector((state: RootState) => state.common.game)
  const streamOpen = useSelector((state: RootState) => state.webrtc.mediaStreamOpen)

  useEffect(() => {
    setupResizeHandler(setPlayerRect)

    // To discard
    dispatch(startNewGame(1))
  }, [])

  useEffect(() => {
    if (player.current !== undefined && player.current === null) {
      setModalShow(true)
      return
    }

    // To keep 
    // const gameId = extractGameId(router.query)
    // if (!game.joinToken && gameId) {
      // dispatch(canJoinGame(gameId))
    // }
  }, [player])

  useEffect(() => {
    // To discard
    if (game.current && !game.joinToken) {
      dispatch(canJoinGame(game.current.id))
    }

    if (game.current && game.joinToken) {
      dispatch(setupSession(game.current.id, game.joinToken))
    }
  }, [game])

  useEffect(() => {
    if (streamOpen) {
      setStream(WebRTCSession.getMediaStream())
      setupKeyHandler()
    }
  }, [streamOpen])

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
      <PlayerRegisterModal show={modalShow} onHide={() => setModalShow(false)} />
    </Layout>
  )
}

export default Playing

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  // return {
    // props: {},
  // }
// })
