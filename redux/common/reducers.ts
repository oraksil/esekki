import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import * as types from './types'

const initialState: types.CommonState = {
  player: {
    current: undefined
  },
  game: {
    current: undefined,
    joinToken: undefined
  },
  packs: []
}

export const reducer = (state: types.CommonState = initialState, action: AnyAction): types.CommonState => {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload.common }
    }

    case types.GET_PLAYER_OK: {
      const player = (action as types.GetPlayerOk).payload
      return { ...state, player: { current: player } }
    }

    case types.GET_PLAYER_FAILED: {
      return { ...state, player: { current: null } }
    }

    case types.NEW_PLAYER_OK: {
      const player = (action as types.NewPlayerOk).payload
      return { ...state, player: { current: player } }
    }

    case types.NEW_PLAYER_FAILED: {
      return { ...state, player: { current: null } }
    }

    case types.START_NEW_GAME_OK: {
      const game = (action as types.StartNewGameOk).payload
      return { ...state, game: { ...state.game, current: game } }
    }

    case types.START_NEW_GAME_FAILED: {
      return { ...state, game: { ...state.game, current: null } }
    }

    case types.CAN_JOIN_GAME_OK: {
      const joinable = (action as types.CanJoinGameOk).payload
      const curGame = { ...state.game.current, id: joinable.gameId }
      return { ...state, game: { current: curGame, joinToken: joinable.token } } 
    }

    case types.CAN_JOIN_GAME_FAILED: {
      return { ...state, game: { current: state.game.current, joinToken: null } }
    }

    case types.GET_PACKS_OK: {
      return { ...state, packs: action.payload }
    }

    case types.GET_PACKS_FAILED: {
      return {
        ...state,
        packs: [
          {
            id: 0,
            maker: 'test',
            maxPlayer: 5,
            title: 'test',
            desc: 'test',
          }
        ]
      }
    }

    default:
      return state
  }


