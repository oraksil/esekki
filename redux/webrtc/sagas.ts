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

const createPeerConnection = (): RTCPeerConnection => {
	const peer = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" }
		]
	})
  
  WebRTCSession.setPeerConnection(peer)

  return peer
}

function* handleSdpExchange(peer: RTCPeerConnection) {
  const sdpExchange = () => new Promise(resolve => {
    peer.onnegotiationneeded = evt => {
      const offerOpt = {
        iceRestart: true,
        offerToReceiveVideo: true,
        offerToReceiveAudio: true
      }

      peer.createOffer(offerOpt).then(d => {
        peer.setLocalDescription(d)
        // TODO: send my description to remote
        // and get remote answer via response,
        // and then set remote description

        resolve()
      })
    }
  })

  yield call(sdpExchange) 
  yield put(sdpExchangeDone())
}

function* handleIceExchange(peer: RTCPeerConnection) {
  const iceExchange = () => new Promise(resolve => {
    peer.onicecandidate = evt => {
      if (evt.candidate) {
        // TODO: send my ice candidate to remote
      }
    }

    peer.oniceconnectionstatechange = evt => {
      resolve()
    }
  })
  
  let pollerHandle!: NodeJS.Timeout
  const remoteIceCandidatesPoller = () => {
    // TODO: fetch remote ice candidates
    // and set them to peer connection

    // if remote ice candidates set up properly clear interval
    // clearInterval(pollerHandle)
  }
  pollerHandle = setInterval(remoteIceCandidatesPoller, 5000)
  
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

    yield fork(handleSdpExchange, peer)

    yield fork(handleIceExchange, peer)

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
