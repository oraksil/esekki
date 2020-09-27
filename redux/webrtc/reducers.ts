import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import {
  WebRTCState,
  ICE_EXCHANGE_DONE,
  SDP_EXCHANGE_DONE,
  MEDIA_STREAM_OPEN
} from './types'

const initialState: WebRTCState = {
  mediaStreamOpen: false
}

export const reducer = (state: WebRTCState = initialState, action: AnyAction): WebRTCState => {
  switch (action.type) {
    case HYDRATE:
      return state
    case SDP_EXCHANGE_DONE:
      return state
    case ICE_EXCHANGE_DONE:
      return state
    case MEDIA_STREAM_OPEN:
      return { ...state, mediaStreamOpen: true }
    default:
      return state
  }
}
