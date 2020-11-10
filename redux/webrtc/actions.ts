import * as types from './types'

export const setupSession = (gameId: number, joinToken: string): types.SetupSession => {
  return {
    type: types.SETUP_SESSION,
    payload: { gameId, joinToken },
  }
}

export const iceExchangeDone = (): types.IceExchangeDone => {
  return {
    type: types.ICE_EXCHANGE_DONE,
    payload: {},
  }
}

export const sdpExchangeDone = (): types.SdpExchangeDone => {
  return {
    type: types.SDP_EXCHANGE_DONE,
    payload: {},
  }
}

export const mediaStreamOpen = (): types.MediaStreamOpen => {
  return {
    type: types.MEDIA_STREAM_OPEN,
    payload: {},
  }
}

export const dataChannelOpen = (): types.DataChannelOpen => {
  return {
    type: types.DATA_CHANNEL_OPEN,
    payload: {},
  }
}
