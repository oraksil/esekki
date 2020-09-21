import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import {
  CommonState,
  START_NEW_GAME_OK,
  START_NEW_GAME_FAILED
} from './types'

const initialState: CommonState = {
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
    default:
      return state
  }
}
