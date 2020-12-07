import { Pack, Game, Player, Joinable } from '../../types/game'

// State
export interface CommonState {
  player: {
    current: Player | null
    loaded: boolean
  }
  game: {
    current: Game | null
    joinToken: string | null
  }
  packs: Array<Pack>
}

// Actions
export const GET_PLAYER_OK = 'GET_PLAYER_OK'
export interface GetPlayerOk {
  type: typeof GET_PLAYER_OK
  payload: Player
}

export const GET_PLAYER_FAILED = 'GET_PLAYER_FAILED'
export interface GetPlayerFailed {
  type: typeof GET_PLAYER_FAILED
  payload: undefined
}

export const NEW_PLAYER_OK = 'NEW_PLAYER_OK'
export interface NewPlayerOk {
  type: typeof NEW_PLAYER_OK
  payload: Player
}

export const NEW_PLAYER_FAILED = 'NEW_PLAYER_FAILED'
export interface NewPlayerFailed {
  type: typeof NEW_PLAYER_FAILED
  payload: undefined
}

export const START_NEW_GAME_OK = 'START_NEW_GAME_OK'
export interface StartNewGameOk {
  type: typeof START_NEW_GAME_OK
  payload: Game
}

export const START_NEW_GAME_FAILED = 'START_NEW_GAME_FAILED'
export interface StartNewGameFailed {
  type: typeof START_NEW_GAME_FAILED
  payload: undefined
}

export const CAN_JOIN_GAME_OK = 'CAN_JOIN_GAME_OK'
export interface CanJoinGameOk {
  type: typeof CAN_JOIN_GAME_OK
  payload: Joinable
}

export const CAN_JOIN_GAME_FAILED = 'CAN_JOIN_GAME_FAILED'
export interface CanJoinGameFailed {
  type: typeof CAN_JOIN_GAME_FAILED
  payload: undefined
}

export const GET_PACKS_OK = 'GET_PACKS_OK'
export interface GetPacksOk {
  type: typeof GET_PACKS_OK
  payload: Array<Pack>
}

export const GET_PACKS_FAILED = 'GET_PACKS_FAILED'
export interface GetPacksFailed {
  type: typeof GET_PACKS_FAILED
  payload: Array<Pack>
}

export const NEW_USER_FEEDBACK_OK = 'NEW_USER_FEEDBACK_OK'
export interface NewUserFeedbackOk {
  type: typeof NEW_USER_FEEDBACK_OK
  payload: any
}

export const NEW_USER_FEEDBACK_FAILED = 'NEW_USER_FEEDBACK_FAILED'
export interface NewUserFeedbackFailed {
  type: typeof NEW_USER_FEEDBACK_FAILED
  payload: undefined
}

export const INSERT_COIN = 'INSERT_COIN'
export interface InsertCoin {
  type: typeof INSERT_COIN
  payload: undefined
}

export const INSERT_COIN_OK = 'INSERT_COIN_OK'
export interface InsertCoinOk {
  type: typeof INSERT_COIN_OK
  payload: {
    coinsUsedInCharging: number
    chargingStartedAt: number
  }
}

export const INSERT_COIN_FAILED = 'INSERT_COIN_FAILED'
export interface InsertCoinFailed {
  type: typeof INSERT_COIN_FAILED
  payload: undefined
}
