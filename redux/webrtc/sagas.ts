import axios from 'axios'
import retry from 'async-retry'

import { fork, call, put, takeLatest } from 'redux-saga/effects'
import { WebRTCSession } from '../../lib/webrtcsession'

import { SETUP_SESSION, SetupSessionAction } from './types'
import { iceExchangeDone, sdpExchangeDone, mediaStreamOpen } from './actions'
import { SdpInfo, IceCandidate } from '../../types/signaling'
import { Jsend } from '../../types/jsend'

const createPeerConnection = (): RTCPeerConnection => {
	const peer = new RTCPeerConnection({
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
      // { urls: 'turn:211.107.108.230:3478?transport=tcp', username: 'gamz', credential: 'gamz' }
		]
	})
  
  WebRTCSession.setPeerConnection(peer)

  return peer
}

var token = '0'

function* handleSdpExchange(peer: RTCPeerConnection, gameId: number) {
  const exchangeSdp = async (offerDesc: RTCSessionDescriptionInit) => {
    const b64EncodedOffer = btoa(JSON.stringify(offerDesc))
    const payload = { token, 'sdp_offer': b64EncodedOffer }

    const res = await axios.post(`/api/v1/games/${gameId}/signaling/sdp`, payload)
    const jsend: Jsend = res.data
    if (jsend.status === 'fail' || (jsend.data as SdpInfo).encoded === '') {
      throw Error('got invalid sdp, retrying..')
    }

    const sdpInfo: SdpInfo = jsend.data
    peer.setLocalDescription(offerDesc)

    const sdpAnswer = JSON.parse(atob(sdpInfo.encoded))
    peer.setRemoteDescription(sdpAnswer)
  }

  const sdpExchange = () => new Promise(resolve => {
    peer.onnegotiationneeded = () => {
      const offerOpt = {
        iceRestart: true,
        offerToReceiveVideo: true,
        offerToReceiveAudio: true
      }

      peer.createOffer(offerOpt).then(d => { 
        // send my description to remote
        // and get remote answer via response,
        // and then set remote description
        const retryOpt = { retries: 3, minTimeout: 4000, factor: 1 }
        retry((_bail, attempt) => {
          console.log(`retrying at attempt ${attempt}`)
          exchangeSdp(d)
        }, retryOpt).then(resolve)
      })
    }
  })

  yield call(sdpExchange) 
  yield put(sdpExchangeDone())
}

function* handleIceExchange(peer: RTCPeerConnection, gameId: number) {
  const iceExchange = () => new Promise(resolve => {
    peer.onicecandidate = evt => {
      if (evt.candidate) {
        // send my ice candidate to remote
        const b64EncodedIce = btoa(JSON.stringify(evt.candidate))
        const payload = { token, 'ice_candidate': b64EncodedIce }
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
    const res = await axios.get(`/api/v1/games/${gameId}/signaling/ice`, { params })

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
  retry(remoteIceCandidatesPoller, retryOpt)

  yield call(iceExchange)
  yield put(iceExchangeDone())
}

function* handleTrackStream(peer: RTCPeerConnection) {
  const handler = () => new Promise(resolve => {
    peer.ontrack = evt => {
      const stream = evt.streams[0]
      stream.onaddtrack = e => { console.log(e) }
      stream.onremovetrack = e => { console.log(e) }

      WebRTCSession.setMediaStream(stream)

      resolve()
    }
  })

  yield call(handler)
  yield put(mediaStreamOpen())
}

const createDataChannel = (peer: RTCPeerConnection): RTCDataChannel => {
  let pingHandler: any

  const dc = peer.createDataChannel('message')
  dc.onopen = () => { 
    console.log('dc open')

    dc.send('ping')
    pingHandler = setInterval(() => { dc.send('ping') }, 5000)
  }

  dc.onclose = () => {
    console.log('dc closed')

    clearInterval(pingHandler)
  }

  WebRTCSession.setDataChannel(dc)

  return dc
}

function* setupSession(action: SetupSessionAction) {
  let peer!: RTCPeerConnection
  let dc!: RTCDataChannel

  token = `${Math.floor(Math.random() * 1000000) + 100}`

  try {
    peer = createPeerConnection()

    dc = createDataChannel(peer)

    yield fork(handleTrackStream, peer)

    yield call(handleSdpExchange, peer, action.payload.gameId)

    yield call(handleIceExchange, peer, action.payload.gameId)

  } catch (e) {
    console.log(e)

    if (peer) {
      peer.close()
    }

    if (dc) {
      dc.close()
    }
  }
}

function* webrtcSaga() {
  yield takeLatest(SETUP_SESSION, setupSession)
}

export default webrtcSaga
