import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import * as types from './types'

const initialState: types.WebRTCState = {
  mediaStreamOpen: false,
}

export const reducer = (state: types.WebRTCState = initialState, action: AnyAction): types.WebRTCState => {
  switch (action.type) {
    case HYDRATE: {
      return state
    }

    case types.SDP_EXCHANGE_DONE: {
      return state
    }

    case types.ICE_EXCHANGE_DONE: {
      return state
    }

    case types.MEDIA_STREAM_OPEN: {
      return { ...state, mediaStreamOpen: true }
    }

    case types.DATA_CHANNEL_OPEN: {
      return state
    }

    default:
      return state
  }
}
