import Layout from '../components/layout'
import Head from 'next/head'
import GamePlayer from '../components/game-player'

import React from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wrapper, RootState } from '../redux/store'
import { startNewGame } from '../redux/common/actions'
import { setupSession } from '../redux/webrtc/actions'

import { WebRTCSession } from '../lib/webrtcsession'

const Playing = () => {
  const [stream, setStream] = useState<MediaStream>()

  const curGame = useSelector((state: RootState) => state.common.game.current)

  const mediaStreamOpen = useSelector((state: RootState) => state.webrtc.mediaStreamOpen)

  const dispatch = useDispatch()

  const router = useRouter()

  const { id } = router.query

  const gameId = parseInt(id as string)

  if (!curGame && gameId === 999) {
    const tempPackId = 1
    dispatch(startNewGame(tempPackId))
  }

  useEffect(() => {
    if (gameId > 0 && gameId !== 999) {
      console.log('dispatch setup session 1')
      dispatch(setupSession(gameId))
    }
  }, [])

  useEffect(() => {
    if (curGame) {
    console.log('dispatch setup session 2')
      dispatch(setupSession(curGame.id))
    }
  }, [curGame]) 

  useEffect(() => {
    if (mediaStreamOpen) {
      setStream(WebRTCSession.getMediaStream())

      const handleKey = (ev: any) => {
        WebRTCSession.sendKeyInput(ev.which || ev.key, ev.type === 'keydown')
      }

      document.addEventListener('keyup', handleKey)
      document.addEventListener('keydown', handleKey)
    }
  }, [mediaStreamOpen])

  return (
    <Layout>
      <Head>
        <title>Street Fighter II</title>
      </Head>
      <div>
        <div>
          <GamePlayer stream={stream} />
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
