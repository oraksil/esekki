import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import PlayableGameCard from '../components/playable-game-card'
import { wrapper } from '../redux/store'
import { useEffect } from 'react'
import { getMyName, getMyNameAsync } from '../redux/common/actions'

const Catalog = () => {
  const games = [1, 2, 3]

  const name = useSelector((state: any) => state.common.myName)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyNameAsync("123"))
  }, [])

  return (
    <Layout>
      <Head>
        <title>Go enjoy with games!</title>
      </Head>
      {name}
      <div className="container pt-32">
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

  store.dispatch(getMyName("456"))

  return {
    props: {},
  }
})
