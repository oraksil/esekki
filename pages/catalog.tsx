import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import PlayableGameCard from '../components/playable-game-card'
import { wrapper, RootState } from '../redux/store'
import {useSelector, useDispatch} from 'react-redux'
import {newPlayer} from '../redux/common/actions'

const Catalog = () => {
  if (!process.browser) {
    return null
  }

  const dispatch = useDispatch()

  const player = useSelector((state: RootState) => state.common.player)

  if (!player) {
    dispatch(newPlayer('abcd'))
  }

  const games = [1, 2, 3]

  return (
    <Layout>
      <Head>
        <title>Go enjoy with games!</title>
      </Head>
      <div className="container pt-32">
        {player?.name}
        <div className="flex justify-center">
          {games.map((_, i) => ( 
            <div key={i} className="mx-4">
              <PlayableGameCard />
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-4">
          <Link href="/hall">
            <a>
              <span className="text-sm underline">Join existing games...</span>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Catalog

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  return {
    props: {},
  }
})
