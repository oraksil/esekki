import { Game, Player, Joinable } from '../../types/game'

// State
export interface CommonState {
  player: {
    current: Player | undefined | null
  },
  game: {
    current: Game | undefined | null
    joinToken: string | undefined | null
  }
}

// Actions
type ActionType = string

export const GET_PLAYER_OK: ActionType = 'GET_PLAYER_OK'
export interface GetPlayerOk {
  type: ActionType
  payload: Player
}

export const GET_PLAYER_FAILED = 'GET_PLAYER_FAILED'
export interface GetPlayerFailed {
  type: ActionType
  payload: undefined
}

export const NEW_PLAYER_OK = 'NEW_PLAYER_OK'
export interface NewPlayerOk {
  type: ActionType
  payload: Player
}

export const NEW_PLAYER_FAILED = 'NEW_PLAYER_FAILED'
export interface NewPlayerFailed {
  type: ActionType
  payload: undefined
}

export const START_NEW_GAME_OK = 'START_NEW_GAME_OK'
export interface StartNewGameOk {
  type: ActionType
  payload: Game
}

export const START_NEW_GAME_FAILED = 'START_NEW_GAME_FAILED'
export interface StartNewGameFailed {
  type: ActionType
  payload: undefined
}

export const CAN_JOIN_GAME_OK = 'CAN_JOIN_GAME_OK'
export interface CanJoinGameOk {
  type: ActionType
  payload: Joinable
}

export const CAN_JOIN_GAME_FAILED= 'CAN_JOIN_GAME_FAILED'
export interface CanJoinGameFailed {
  type: ActionType
  payload: undefined
}

