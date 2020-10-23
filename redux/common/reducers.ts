import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import {
  CommonState,
  GET_PLAYER_OK,
  GET_PLAYER_FAILED,
  NEW_PLAYER_OK,
  NEW_PLAYER_FAILED,
  START_NEW_GAME_OK,
  START_NEW_GAME_FAILED,
  CAN_JOIN_GAME_OK,
  CAN_JOIN_GAME_FAILED
} from './types'

const initialState: CommonState = {
  player: {
    current: null,
    loaded: false
  },
  game: {
    current: null,
    joinToken: null
  }
}

export const reducer = (state: CommonState = initialState, action: AnyAction): CommonState => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.common }
    case GET_PLAYER_OK:
      return { ...state, player: { current: action.payload, loaded: true } }
    case GET_PLAYER_FAILED:
      return { ...state, player: { current: null, loaded: true } }
    case NEW_PLAYER_OK:
      return { ...state, player: { current: action.payload, loaded: true } }
    case NEW_PLAYER_FAILED:
      return { ...state, player: { current: null, loaded: true } }
    case START_NEW_GAME_OK:
      return { ...state, game: { current: action.payload, joinToken: null } }
    case START_NEW_GAME_FAILED:
      return { ...state, game: { current: null, joinToken: null } }
    case CAN_JOIN_GAME_OK:
      return { ...state, game: { current: state.game.current, joinToken: action.payload.token } } 
    case CAN_JOIN_GAME_FAILED:
      return { ...state, game: { current: state.game.current, joinToken: null } }
    default:
      return state
  }
}
