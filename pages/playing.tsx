import Layout from '../components/layout'
import Head from 'next/head'
import GamePlayer from '../components/game-player'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wrapper, RootState } from '../redux/store'

import { startNewGame } from '../redux/common/actions'
import { setupSession } from '../redux/webrtc/actions'

const Playing = () => {
  if (process.browser) {
    const curGame = useSelector((state: RootState) => state.common.game.current)

    const dispatch = useDispatch()

    const tempPackId = 1

    if (!curGame) {
      dispatch(startNewGame(tempPackId))
    }

    useEffect(() => {
      if (curGame) {
        dispatch(setupSession(curGame.id))
      }
    }, [curGame]) 
  }

  return (
    <Layout>
      <Head>
        <title>Street Fighter II</title>
      </Head>
      <div className="container pt-32">
        <div className="flex justify-center">
          <GamePlayer />
        </div>
      </div>
    </Layout>
  )
}

export default Playing

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  return {
    props: {},
  }
})
