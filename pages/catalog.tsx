import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { RootState } from '../redux/store'
import { getPacks, newPlayer, startNewGame, newUserFeedback } from '../redux/common/actions'
import { Pack } from '../types/game'

import Head from 'next/head'
import Layout from '../components/layout'
import PlayableGameCard from '../components/playable-game-card'
import PlayerRegisterModal from '../components/player-register-modal'
import PreparingGameCard from '../components/preparing-game-card'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Navbar from 'react-bootstrap/Navbar'
import UserFeedbackModal from '../components/user-feedback-modal'

const Catalog = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [newPlayerModalShow, setNewPlayerModalShow] = useState(false)
  const [feedbackModalShow, setFeedbackModalShow] = useState(false)
  const [selectedPack, setSelectedPack] = useState<Pack>()

  const packs = useSelector((state: RootState) => state.common.packs)
  const player = useSelector((state: RootState) => state.common.player)
  const game = useSelector((state: RootState) => state.common.game)

  const handleNewPlayerSubmit = (playerName: string) => {
    dispatch(newPlayer(playerName))
  }

  const handleGameStart = (pack: Pack) => {
    setSelectedPack(pack)
  }

  const handleUserFeedback = () => {
    setFeedbackModalShow(true)
  }

  const handleUserFeedbackSubmit = (feedback: string) => {
    dispatch(newUserFeedback(feedback))
    setFeedbackModalShow(false)
  }

  useEffect(() => {
    if (packs.length == 0) {
      dispatch(getPacks())
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
      setNewPlayerModalShow(true)
      return
    }

    setNewPlayerModalShow(false)

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
          <h5 style={{ margin: '20px 0px' }}>Available Games</h5>
        </Row>
        <Row>
          {packs
            .filter(p => p.status === 'ready')
            .map((pack: Pack, i: any) => (
              <div key={i} style={{ paddingBottom: '10px', paddingRight: '30px', width: '16rem' }}>
                <PlayableGameCard pack={pack} onStart={handleGameStart} />
              </div>
            ))}
        </Row>
        <Row>
          <h5 style={{ marginTop: '60px', marginBottom: '20px' }}>Coming Soon...</h5>
        </Row>
        <Row>
          {packs
            .filter(p => p.status === 'prepare')
            .map((pack: Pack, i: any) => (
              <div key={i} style={{ paddingRight: '30px', width: '16rem' }}>
                <PreparingGameCard key={i} pack={pack} />
              </div>
            ))}
          <div style={{ paddingRight: '30px', width: '16rem' }}>
            <PreparingGameCard key={99} flip={true} onSuggest={handleUserFeedback} />
          </div>
        </Row>
      </Container>
      <PlayerRegisterModal show={newPlayerModalShow} onSubmit={handleNewPlayerSubmit} />
      <UserFeedbackModal
        show={feedbackModalShow}
        onSubmit={handleUserFeedbackSubmit}
        onHide={() => setFeedbackModalShow(false)}
      />
    </Layout>
  )
}

export default Catalog
