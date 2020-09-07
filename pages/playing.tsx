import Layout from '../components/layout'
import Head from 'next/head'
import GamePlayer from '../components/game-player'
import { wrapper } from '../redux/store'
import { useDispatch } from 'react-redux'
import { setupSession } from '../redux/webrtc/actions'

const Playing = () => {
  if (process.browser) {
    const dispatch = useDispatch()
    dispatch(setupSession())
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
