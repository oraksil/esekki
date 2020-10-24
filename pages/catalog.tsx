import Head from 'next/head'
import Layout from '../components/layout'
import PlayableGameCard from '../components/playable-game-card'

import { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { getPacks } from '../redux/common/actions'

import styles from './catalog.module.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Navbar from 'react-bootstrap/Navbar'
import CardDeck from 'react-bootstrap/CardDeck'

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
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>
          <img
            alt=''
            src='/assets/icons/orakki-icon.svg'
            width='28'
            height='28'
            className='d-inline-block align-top mr-2'
          />{' '}
          O r a k s i l
        </Navbar.Brand>
      </Navbar>
      <Container fluid>
        <Row>
          <h5 style={{ margin: '10px' }}>Available Games</h5>
        </Row>
        <Row>
          <CardDeck style={{ padding: '5px 20px' }}>
            {packs.map((_: any, i: any) => (
              <PlayableGameCard pack={packs[i]} key={i}></PlayableGameCard>
            ))}
          </CardDeck>
        </Row>
      </Container>
    </Layout>
  )
}

export default Catalog
