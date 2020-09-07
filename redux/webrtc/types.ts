
export interface WebRTCState {
}

export const SETUP_SESSION = 'SETUP_SESSION'
export const SEND_MESSAGE = 'SEND_MESSAGE'

export const ICE_EXCHANGE_DONE = 'ICE_EXCHANGE_DONE'
export const SDP_EXCHANGE_DONE = 'SDP_EXCHANGE_DONE'
export const MEDIA_STREAM_OPEN = 'MEDIA_STREAM_OPEN'

export interface SetupSessionAction {
  type: typeof SETUP_SESSION
  payload: {}
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

export interface SendMessageAction {
  type: typeof SEND_MESSAGE
  payload: {}
}

export type WebRTCActionTypes =
  SetupSessionAction |
  SendMessageAction |
  IceExchangeDoneAction |
  SdpExchangeDoneAction |
  MediaStreamOpenAction
