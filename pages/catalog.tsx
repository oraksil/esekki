import Head from 'next/head'
import Layout from '../components/layout'
import PlayableGameCard from '../components/playable-game-card'

import { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { getPacks } from '../redux/common/actions'

import styles from './catalog.module.css'

const Catalog = () => {
  const dispatch = useDispatch()

  const packs = useSelector((state: RootState) => state.common.packs)

  if (packs.length == 0) {
    dispatch(getPacks(true))
  }

  return (
    <Layout>
      <Head>
        <title>Go enjoy with games!</title>
      </Head>
      <div className={styles['container']}>
        <div className={styles['ribbon']}>오락실 아이콘</div>
        <div className={styles['available-games']}>Available Games</div>
        <div>
          {packs.map((_: any, i: any) => (
            <PlayableGameCard pack={packs[i]} key={i}></PlayableGameCard>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Catalog
