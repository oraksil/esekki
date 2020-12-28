import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { Toast } from 'react-bootstrap'

import { PlayerRect } from '../types/layout'
import { WebRTCSession } from '../lib/webrtcsession'
import { RootState, wrapper } from '../features/store'
import * as actions from '../features/game/slices'
import { setupSession } from '../features/webrtc/slices'

import Icon from '../components/icon'
import Layout from '../components/layout'
import GamePlayer from '../components/game-player'
import PlayerRegisterModal from '../components/player-register-modal'
import GuideModal from '../components/guide-modal'
import CoinStatus from '../components/coin-status'

import styles from './playing.module.css'

import * as consts from '../lib/constants'

const PLAYER_PADDING_TOP_RATIO = 0.2375
const PLAYER_HEIGHT_RATIO = 0.4771
const PLAYER_ASPECT_RATIO = 1.3352

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
const Playing = (props: any) => {
  const { pageTitle, ogImgUrl, ogDesc } = props

  const dispatch = useDispatch()
  const router = useRouter()

  const [modalShow, setModalShow] = useState(false)
  const [guideModalShow, setGuideModalShow] = useState(false)
  const [coinAlertShow, setCoinAlertShow] = useState(false)

  const [stream, setStream] = useState<MediaStream>()
  const [playerRect, setPlayerRect] = useState<PlayerRect>()

  const player = useSelector((state: RootState) => state.common.player)
  const game = useSelector((state: RootState) => state.common.game)
  const streamOpen = useSelector((state: RootState) => state.webrtc.mediaStreamOpen)

  const setupResizeHandler = () => {
    const calculatePlayerRect = (windowHeight: number): PlayerRect => {
      const marginTop = windowHeight * PLAYER_PADDING_TOP_RATIO
      const height = windowHeight * PLAYER_HEIGHT_RATIO
      const width = height * PLAYER_ASPECT_RATIO
      return { marginTop, width, height }
    }

    setPlayerRect(calculatePlayerRect(window.innerHeight))
    window.addEventListener('resize', () => {
      setPlayerRect(calculatePlayerRect(window.innerHeight))
    })
  }

  const handleKeyInput = (evt: any) => {
    const insertCoinKey = 49
    const key = evt.which | evt.key
    const isKeyDown = evt.type === 'keydown'
    if (key === insertCoinKey) {
      if (isKeyDown) {
        return
      }

      dispatch(
        actions.insertCoin(
          () => {
            // emulate key down and up
            WebRTCSession.sendKeyInput(key, true)
            setTimeout(() => {
              WebRTCSession.sendKeyInput(key, false)
            }, 50)
          },
          () => {
            setCoinAlertShow(true)
          }
        )
      )
    } else {
      WebRTCSession.sendKeyInput(key, isKeyDown)
    }
  }

  const setupKeyHandler = () => {
    document.addEventListener('keyup', handleKeyInput)
    document.addEventListener('keydown', handleKeyInput)
  }

  const extractGameIdFromRouter = (): number | null => {
    if (router.query.g) {
      return parseInt(router.query.g as string)
    }
    return null
  }

  const handleNewPlayer = (playerName: string) => {
    dispatch(actions.newPlayer(playerName))
  }

  const getJoinTokenAndTurnAuth = () => {
    if (!player.loaded) {
      return
    }

    if (player.current === null) {
      setModalShow(true)
      return
    }

    setModalShow(false)

    const gameId = extractGameIdFromRouter()
    if (gameId && !game.joinToken) {
      dispatch(actions.canJoinGame(gameId))
    }
  }

  useEffect(() => {
    setupResizeHandler()
  }, [])

  useEffect(() => {
    getJoinTokenAndTurnAuth()
  }, [player, router])

  useEffect(() => {
    if (!streamOpen) {
      if (game.current && game.joinToken) {
        dispatch(
          setupSession(
            game.current.id,
            game.joinToken,
            player.current?.turnUsername,
            player.current?.turnPassword
          )
        )
      }
    } else {
      setStream(WebRTCSession.getMediaStream())
      setupKeyHandler()
    }
  }, [game, player, streamOpen])

  return (
    <Layout footer={false}>
      <Head>
        <title>{pageTitle}</title>
        <meta property='og:image' content={ogImgUrl} />
        <meta name='description' content={ogDesc} />
      </Head>
      <div className={styles.container}>
        <div className={styles.orakkiBox}>
          <div className={styles.orakkiScreen} style={{ ...playerRect }}>
            <GamePlayer stream={stream} />
            <div className={styles.orakkiSwitch}>
              <span>
                <Icon
                  name='question'
                  width='3.5vh'
                  height='3.5vh'
                  fill='black'
                  onClick={() => {
                    setGuideModalShow(true)
                  }}
                />
              </span>
              <span className={styles.coinStatus}>
                {player.current && (
                  <CoinStatus
                    coinsUsedInCharging={player.current.coinsUsedInCharging}
                    chargingStartedAt={player.current.chargingStartedAt}
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <PlayerRegisterModal show={modalShow} onSubmit={handleNewPlayer} />
      <GuideModal
        show={guideModalShow}
        handleHide={() => {
          setGuideModalShow(false)
        }}
      />
      <Toast
        onClose={() => setCoinAlertShow(false)}
        show={coinAlertShow}
        delay={2000}
        autohide
        className={styles.noCoinToast}>
        <Toast.Body>No coins.</Toast.Body>
      </Toast>
    </Layout>
  )
}

export default Playing

export const getStaticProps = wrapper.getStaticProps(async ({}) => {
  return {
    props: {
      pageTitle: 'Live Game',
      ogImgUrl: consts.OG_DEFAULT_IMG_URL,
      ogDesc: consts.OG_DEFAULT_DESC,
    },
  }
})
