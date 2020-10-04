
export interface WebRTCState {
  mediaStreamOpen: boolean
}

export const SETUP_SESSION = 'SETUP_SESSION'

export const ICE_EXCHANGE_DONE = 'ICE_EXCHANGE_DONE'
export const SDP_EXCHANGE_DONE = 'SDP_EXCHANGE_DONE'
export const MEDIA_STREAM_OPEN = 'MEDIA_STREAM_OPEN'

export interface SetupSessionAction {
  type: typeof SETUP_SESSION
  payload: {
    gameId: number
  }
}

export interface IceExchangeDoneAction {
  type: typeof ICE_EXCHANGE_DONE
  payload: {}
}

export interface SdpExchangeDoneAction {
  type: typeof SDP_EXCHANGE_DONE
  payload: {}
}

export interface MediaStreamOpenAction {
  type: typeof MEDIA_STREAM_OPEN
  payload: {}
}

export type WebRTCActionTypes =
  SetupSessionAction |
  IceExchangeDoneAction |
  SdpExchangeDoneAction |
  MediaStreamOpenAction