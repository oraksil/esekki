import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import * as types from './types'

const initialState: types.CommonState = {
  player: {
    current: null,
    loaded: false,
  },
  game: {
    current: null,
    joinToken: null,
  },
  packs: [],
}

export const reducer = (state: types.CommonState = initialState, action: AnyAction): types.CommonState => {
  switch (action.type) {
    case HYDRATE: {
      return { ...state }
    }

    case types.GET_PLAYER_OK: {
      const player = (action as types.GetPlayerOk).payload
      return { ...state, player: { ...state.player, current: player, loaded: true } }
    }

    case types.GET_PLAYER_FAILED: {
      return { ...state, player: { ...state.player, current: null, loaded: true } }
    }

    case types.NEW_PLAYER_OK: {
      const player = (action as types.NewPlayerOk).payload
      return { ...state, player: { ...state.player, current: player, loaded: true } }
    }

    case types.GET_PACKS_OK: {
      const packs = (action as types.GetPacksOk).payload
      return { ...state, packs }
    }

    case types.GET_PACKS_FAILED: {
      return { ...state, packs: [] }
    }

    case types.NEW_PLAYER_FAILED: {
      return { ...state, player: { ...state.player, current: null, loaded: true } }
    }

    case types.START_NEW_GAME_OK: {
      const game = (action as types.StartNewGameOk).payload
      return { ...state, game: { ...state.game, current: game, joinToken: null } }
    }

    case types.START_NEW_GAME_FAILED: {
      return { ...state, game: { ...state.game, current: null, joinToken: null } }
    }

    case types.CAN_JOIN_GAME_OK: {
      const joinable = (action as types.CanJoinGameOk).payload
      const curGame = { ...state.game.current, id: joinable.gameId }
      return {
        ...state,
        player: { ...state.player },
        game: { current: curGame, joinToken: joinable.token },
      }
    }

    case types.CAN_JOIN_GAME_FAILED: {
      return {
        ...state,
        player: { ...state.player },
        game: { current: state.game.current, joinToken: null },
      }
    }

    case types.NEW_USER_FEEDBACK_OK: {
      return state
    }

    case types.NEW_USER_FEEDBACK_FAILED: {
      return state
    }

    case types.INSERT_COIN_OK: {
      const payload = (action as types.InsertCoinOk).payload
      const curPlayer = { ...state.player.current, ...payload } as any
      return {
        ...state,
        player: { ...state.player, current: curPlayer },
      }
    }

    default:
      return state
  }
}
