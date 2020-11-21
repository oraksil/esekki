import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { WebRTCSession } from '../lib/webrtcsession'
import { RootState } from '../redux/store'
import * as actions from '../redux/common/actions'
import { setupSession } from '../redux/webrtc/actions'

import Icon from '../components/icon'
import Layout from '../components/layout'
import GamePlayer from '../components/game-player'
import PlayerRegisterModal from '../components/player-register-modal'
import GuideModal from '../components/guide-modal'

import styles from './playing.module.css'

import { PlayerRect } from '../types/layout'

const PLAYER_PADDING_TOP_RATIO = 0.2375
const PLAYER_HEIGHT_RATIO = 0.4771
const PLAYER_ASPECT_RATIO = 1.3352

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

const setupKeyHandler = (keyHandler: any) => {
  document.addEventListener('keyup', keyHandler)
  document.addEventListener('keydown', keyHandler)
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
  const [guideModalShow, setGuideModalShow] = useState(false)

  const [stream, setStream] = useState<MediaStream>()
  const [playerRect, setPlayerRect] = useState<PlayerRect>()

  const player = useSelector((state: RootState) => state.common.player)
  const game = useSelector((state: RootState) => state.common.game)
  const streamOpen = useSelector((state: RootState) => state.webrtc.mediaStreamOpen)

  const coinsRef = useRef(player.numCoins)

  const handleNewPlayer = (playerName: string) => {
    dispatch(actions.newPlayer(playerName))
  }

  const handleKeyInput = (evt: any) => {
    const insertCoinKey = 49
    const key = evt.which | evt.key
    const isKeyDown = evt.type === 'keydown'
    if (key === insertCoinKey && !isKeyDown) {
      if (coinsRef.current > 0) {
        dispatch(actions.incrementCoins(-1))
      } else {
        return
      }
    }

    WebRTCSession.sendKeyInput(key, isKeyDown)
  }

  useEffect(() => {
    setupResizeHandler(setPlayerRect)
  }, [])

  useEffect(() => {
    if (player.current === undefined) {
      return
    }

    if (player.current === null) {
      setModalShow(true)
      return
    }

    coinsRef.current = player.numCoins

    setModalShow(false)

    const gameId = extractGameId(router.query)
    if (gameId && !game.joinToken) {
      dispatch(actions.canJoinGame(gameId))
    }
  }, [player])

  useEffect(() => {
    if (!streamOpen && game.current && game.joinToken) {
      dispatch(setupSession(game.current.id, game.joinToken, player.turnUsername, player.turnPassword))
    }
  }, [player, game])

  useEffect(() => {
    if (streamOpen) {
      setStream(WebRTCSession.getMediaStream())

      setupKeyHandler(handleKeyInput)
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
            <GamePlayer
              stream={stream}
              onAdsCompleted={() => {
                dispatch(actions.incrementCoins(1))
              }}
            />
            <div className={styles['orakki-switch']}>
              <div className={styles['switch-icon']}>
                <Icon
                  name='joystick'
                  onClick={() => {
                    setGuideModalShow(true)
                  }}
                />
              </div>
              <div className={styles['switch-icon']}>
                <Icon name='tickets' />
                <span className={styles['tickets-badge']}>{player.numCoins}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlayerRegisterModal show={modalShow} onSubmit={handleNewPlayer} />
      <GuideModal
        show={guideModalShow}
        handleHide={() => {
          setGuideModalShow(false)
        }}></GuideModal>
    </Layout>
  )
}

export default Playing

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
// return {
// props: {},
// }
// })
// })
