import {
  SETUP_SESSION,
  ICE_EXCHANGE_DONE,
  SDP_EXCHANGE_DONE,
  MEDIA_STREAM_OPEN,
  WebRTCActionTypes
} from './types'

export const setupSession = (gameId: number): WebRTCActionTypes => {
  return {
    type: SETUP_SESSION,
    payload: { gameId }
  }
}

export const iceExchangeDone = (): WebRTCActionTypes => {
  return {
    type: ICE_EXCHANGE_DONE,
    payload: {}
  }
}

export const sdpExchangeDone = (): WebRTCActionTypes => {
  return {
    type: SDP_EXCHANGE_DONE,
    payload: {}
  }
}

export const mediaStreamOpen = (): WebRTCActionTypes => {
  return {
    type: MEDIA_STREAM_OPEN,
    payload: {}
  }
}
