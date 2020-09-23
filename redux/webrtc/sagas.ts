import axios from 'axios'

import {
  fork,
  call,
  put,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'

import {
  SETUP_SESSION,
  SEND_MESSAGE,
  SetupSessionAction,
  SendMessageAction
} from './types'

import {
  iceExchangeDone,
  sdpExchangeDone,
  mediaStreamOpen
} from './actions'

import { WebRTCSession } from '../../lib/webrtcsession'

import { SdpInfo, IceCandidate } from '../../types/signaling'

const createPeerConnection = (): RTCPeerConnection => {
	const peer = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" }
		]
	})
  
  WebRTCSession.setPeerConnection(peer)

  return peer
}

function* handleSdpExchange(peer: RTCPeerConnection, gameId: number) {
  const sdpExchange = () => new Promise(resolve => {
    peer.onnegotiationneeded = evt => {
      const offerOpt = {
        iceRestart: true,
        offerToReceiveVideo: true,
        offerToReceiveAudio: true
      }

      peer.createOffer(offerOpt).then(d => {
        peer.setLocalDescription(d)
  
        // send my description to remote
        // and get remote answer via response,
        // and then set remote description
        const b64EncodedOffer = btoa(JSON.stringify(d))
        const payload = { 'sdp_offer': b64EncodedOffer }
        axios.post(`/api/v1/games/${gameId}/signaling/sdp`, payload)
          .then(res => {
            const sdpInfo: SdpInfo = res.data.data
            const sdpAnswer = JSON.parse(atob(sdpInfo.sdp))
            peer.setRemoteDescription(sdpAnswer)
            resolve()
          })
          .catch(reject => {})
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
        const payload = { 'ice_candidate': b64EncodedIce }
        axios.post(`/api/v1/games/${gameId}/signaling/ice`, payload)
      }
    }

    peer.oniceconnectionstatechange = evt => {
      console.log(evt)
      resolve()
    }
  })
  
  let pollerHandle!: NodeJS.Timeout
  let lastSeq = 0

  const remoteIceCandidatesPoller = () => {
    // fetch remote ice candidates
    // and set them to peer connection
    const params = { last_seq: lastSeq }
    axios.get(`/api/v1/games/${gameId}/signaling/ice`, { params })
      .then(res => {
        let shouldStopPolling = false

        const candidates: Array<IceCandidate> = res.data.data
        candidates.forEach(c => {
          if (c.ice === '') {
            shouldStopPolling = true
            return
          }

          const parsedIce = JSON.parse(atob(c.ice))
          peer.addIceCandidate(parsedIce)

          lastSeq = c.seq
        })

        if (shouldStopPolling) {
          clearInterval(pollerHandle)
        }
      })
  }
  pollerHandle = setInterval(remoteIceCandidatesPoller, 1000)
  
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
  const dc = peer.createDataChannel('message')

  WebRTCSession.setDataChannel(dc)

  return dc
}

function* setupSession(action: SetupSessionAction) {
  let peer!: RTCPeerConnection
  let dc!: RTCDataChannel

  try {
    peer = createPeerConnection()

    dc = createDataChannel(peer)

    yield fork(handleSdpExchange, peer, action.payload.gameId)

    yield fork(handleIceExchange, peer, action.payload.gameId)

    yield fork(handleTrackStream, peer)

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

function* sendMessage(action: SendMessageAction) {
}

function* webrtcSaga() {
  yield takeLatest(SETUP_SESSION, setupSession)
  yield takeEvery(SEND_MESSAGE, sendMessage)
}

export default webrtcSaga
