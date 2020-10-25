import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { RootState } from '../redux/store'
import { getPacks, newPlayer, startNewGame } from '../redux/common/actions'
import { Pack } from '../types/game'

import Head from 'next/head'
import Layout from '../components/layout'
import PlayableGameCard from '../components/playable-game-card'
import PlayerRegisterModal from '../components/player-register-modal'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Navbar from 'react-bootstrap/Navbar'
import CardDeck from 'react-bootstrap/CardDeck'

const Catalog = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [modalShow, setModalShow] = useState(false)
  const [selectedPack, setSelectedPack] = useState<Pack>()

  const packs = useSelector((state: RootState) => state.common.packs)
  const player = useSelector((state: RootState) => state.common.player)
  const game = useSelector((state: RootState) => state.common.game)

  const handleNewPlayer = (playerName: string) => {
    dispatch(newPlayer(playerName))
  }

  const handleGameStart = (pack: Pack) => {
    setSelectedPack(pack)
  }

  useEffect(() => {
    if (packs.length == 0) {
      dispatch(getPacks(true))
    }
  }, [])

  useEffect(() => {
    if (!selectedPack) {
      return
    }

    if (player.current === undefined) {
      return
    }

    if (player.current === null) {
      setModalShow(true)
      return
    }

    setModalShow(false)

    if (selectedPack) {
      dispatch(startNewGame(selectedPack.id))
    }
  }, [player, selectedPack])

  useEffect(() => {
    if (game?.current) {
      router.push(`/playing?g=${game.current.id}`)
    }
  }, [game])

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
          Oraksil
        </Navbar.Brand>
      </Navbar>
      <Container fluid style={{ padding: '30px 60px' }}>
        <Row>
          <h5>Available Games</h5>
        </Row>
        <Row>
          <CardDeck style={{ padding: '10px 5px' }}>
            {packs.map((pack: Pack, i: any) => (
              <PlayableGameCard key={i} pack={pack} onStart={handleGameStart} />
            ))}
          </CardDeck>
        </Row>
      </Container>
      <PlayerRegisterModal show={modalShow} onSubmit={handleNewPlayer} />
    </Layout>
  )
}

export default Catalog
