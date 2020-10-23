// State
export interface WebRTCState {
  mediaStreamOpen: boolean
}

// Action
export const SETUP_SESSION = 'SETUP_SESSION'
export interface SetupSession {
  type: typeof SETUP_SESSION
  payload: {
    gameId: number
    joinToken: string
  }
}

export const ICE_EXCHANGE_DONE = 'ICE_EXCHANGE_DONE'
export interface IceExchangeDone {
  type: typeof ICE_EXCHANGE_DONE
  payload: any
}

export const SDP_EXCHANGE_DONE = 'SDP_EXCHANGE_DONE'
export interface SdpExchangeDone {
  type: typeof SDP_EXCHANGE_DONE
  payload: any
}

export const MEDIA_STREAM_OPEN = 'MEDIA_STREAM_OPEN'
export interface MediaStreamOpen {
  type: typeof MEDIA_STREAM_OPEN
  payload: any
}
