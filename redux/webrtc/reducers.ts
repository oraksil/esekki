import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import * as types from './types'
import * as commonTypes from '../common/types'

const initialState: types.WebRTCState = {
  turnUsername: null,
  turnPassword: null,
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

    case commonTypes.START_NEW_GAME_OK: {
      return { ...state, mediaStreamOpen: false, turnUsername: null, turnPassword: null }
    }

    case commonTypes.CAN_JOIN_GAME_OK: {
      const joinable = (action as commonTypes.CanJoinGameOk).payload
      return { ...state, turnUsername: joinable.username, turnPassword: joinable.password }
    }

    default:
      return state
  }
}
