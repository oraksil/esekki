import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import PlayableGameCard from '../components/playable-game-card'

import { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { newPlayer } from '../redux/common/actions'

const Catalog = () => {
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
      <div>
        {player?.name}
        <div>
          {games.map((_, i) => ( 
            <div key={i}>
              <PlayableGameCard />
            </div>
          ))}
        </div>
        <div>
          <Link href="/hall">
            <a>
              <span>Join existing games...</span>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Catalog

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  // return {
    // props: {},
  // }
// })
