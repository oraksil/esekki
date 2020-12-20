import axios from 'axios'
import retry from 'async-retry'

import { PayloadAction } from '@reduxjs/toolkit'
import { fork, call, put, takeLatest } from 'redux-saga/effects'

import { WebRTCSession } from '../../lib/webrtcsession'
import { SdpInfo, IceCandidate } from '../../types/signaling'
import { Jsend } from '../../types/jsend'

import {
  setupSession,
  iceExchangeDone,
  sdpExchangeDone,
  mediaStreamOpen,
  dataChannelOpen,
  SetupSessionParams,
} from './slices'

let TURNSERVER_URLS = 'turn:35.216.52.55:3478?transport=tcp'
if (process.env.NEXT_PUBLIC_TURNSERVER_URLS) {
  TURNSERVER_URLS = process.env.NEXT_PUBLIC_TURNSERVER_URLS
}

const createPeerConnection = (
  turnUsername: string | null,
  turnPassword: string | null
): RTCPeerConnection => {
  const iceServers = []

  if (turnUsername && turnUsername.length > 0) {
    iceServers.push({
      urls: TURNSERVER_URLS,
      username: turnUsername,
      credential: turnPassword,
    } as any)
  }

  const peer = new RTCPeerConnection({ iceServers })

  WebRTCSession.setPeerConnection(peer)

  return peer
}

function* handleSdpExchange(peer: RTCPeerConnection, gameId: number, token: string) {
  const exchangeSdp = async (offerDesc: RTCSessionDescriptionInit) => {
    await peer.setLocalDescription(offerDesc)

    const b64EncodedOffer = btoa(JSON.stringify(peer.localDescription))
    const payload = { token, sdp_offer: b64EncodedOffer }

    const res = await axios.post(`/api/v1/games/${gameId}/signaling/sdp`, payload)
    const jsend: Jsend = res.data
    if (jsend.status === 'fail' || (jsend.data as SdpInfo).encoded === '') {
      throw Error('got invalid sdp, retrying..')
    }

    const sdpInfo: SdpInfo = jsend.data
    const sdpAnswer = JSON.parse(atob(sdpInfo.encoded))
    await peer.setRemoteDescription(sdpAnswer)
  }

  const sdpExchange = () =>
    new Promise(resolve => {
      const offerOpt = {
        iceRestart: true,
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      }

      peer.createOffer(offerOpt).then(d => {
        // send my description to remote
        // and get remote answer via response,
        // and then set remote description
        const retryOpt = { retries: 15, minTimeout: 1000, factor: 1.2 }
        retry((_bail, attempt) => {
          console.log(`retrying exchanging sdp at attempt ${attempt}`)
          return exchangeSdp(d)
        }, retryOpt).then(resolve)
      })
    })

  yield call(sdpExchange)
  yield put(sdpExchangeDone())
}

function* handleIceExchange(peer: RTCPeerConnection, gameId: number, token: string) {
  const iceExchange = () =>
    new Promise<void>(resolve => {
      peer.onicecandidate = evt => {
        if (evt.candidate) {
          // send my ice candidate to remote
          const b64EncodedIce = btoa(JSON.stringify(evt.candidate))
          const payload = { token, ice_candidate: b64EncodedIce }
          axios.post(`/api/v1/games/${gameId}/signaling/ice`, payload)
        }
      }

      peer.oniceconnectionstatechange = evt => {
        if ((evt.target as RTCPeerConnection).iceConnectionState === 'connected') {
          resolve()
        }
      }
    })

  let lastSeq = 0

  const remoteIceCandidatesPoller = async () => {
    // fetch remote ice candidates
    // and set them to peer connection
    const params = { token, last_seq: lastSeq }
    const res = await axios.get(`/api/v1/games/${gameId}/signaling/ice`, {
      params,
    })

    const jsend: Jsend = res.data
    if (jsend.status === 'fail') {
      throw Error('got invalid ice, retrying..')
    }

    let shouldStopPolling = false
    const candidates: Array<IceCandidate> = jsend.data
    candidates.forEach(c => {
      if (c.encoded === '') {
        shouldStopPolling = true
        return
      }

      const parsedIce = JSON.parse(atob(c.encoded))
      peer.addIceCandidate(parsedIce)

      lastSeq = c.seq
    })

    if (!shouldStopPolling) {
      throw Error('should fetch more remote ice candidates')
    }
  }

  const retryOpt = { retries: 15, minTimeout: 2000, factor: 1 }
  retry((_bail, attempt) => {
    console.log(`retrying remote ice polling at attempt ${attempt}`)
    return remoteIceCandidatesPoller()
  }, retryOpt)

  yield call(iceExchange)
  yield put(iceExchangeDone())
}

function* handleTrackStream(peer: RTCPeerConnection) {
  const handler = () =>
    new Promise<void>(resolve => {
      peer.ontrack = evt => {
        const stream = evt.streams[0]
        stream.onaddtrack = e => {
          console.log(e)
        }
        stream.onremovetrack = e => {
          console.log(e)
        }

        WebRTCSession.setMediaStream(stream)

        resolve()
      }
    })

  yield call(handler)
  yield put(mediaStreamOpen())
}

function* handleDataChannelOpen(peer: RTCPeerConnection) {
  const handler = () =>
    new Promise<void>(resolve => {
      let pingHandler: any
      const dc = peer.createDataChannel('message')
      dc.onopen = () => {
        console.log('dc open')

        pingHandler = setInterval(() => {
          dc.send('ping')
        }, 5000)

        WebRTCSession.setDataChannel(dc)

        resolve()
      }

      dc.onclose = () => {
        console.log('dc closed')

        clearInterval(pingHandler)
      }
    })

  yield call(handler)
  yield put(dataChannelOpen())
}

function* handleSetupSession({ payload }: PayloadAction<SetupSessionParams>) {
  let peer!: RTCPeerConnection

  try {
    const { turnUsername, turnPassword } = payload
    peer = createPeerConnection(turnUsername, turnPassword)

    yield fork(handleTrackStream, peer)

    yield fork(handleDataChannelOpen, peer)

    yield call(handleSdpExchange, peer, payload.gameId, payload.joinToken)

    yield call(handleIceExchange, peer, payload.gameId, payload.joinToken)
  } catch (e) {
    console.log(e)

    if (peer) {
      peer.close()
    }
  }
}

function* webrtcSaga() {
  yield takeLatest(setupSession.type, handleSetupSession)
}

export default webrtcSaga
