import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import {
  CommonState,
  NEW_PLAYER_OK,
  NEW_PLAYER_FAILED,
  START_NEW_GAME_OK,
  START_NEW_GAME_FAILED
} from './types'

const initialState: CommonState = {
  player: null,
  game: {
    current: null
  }
}

export const reducer = (state: CommonState = initialState, action: AnyAction): CommonState => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.common }
    case START_NEW_GAME_OK:
      return { ...state, game: { current: action.payload } }
    case START_NEW_GAME_FAILED:
      return { ...state, game: { current: null } }
    case NEW_PLAYER_OK:
      return { ...state, player: action.payload }
    case NEW_PLAYER_FAILED:
      return { ...state, player: null }
    default:
      return state
  }
}
