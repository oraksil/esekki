import { Game, Player } from '../../types/game'

export interface CommonState {
  player: Player | null
  game: {
    current: Game | null
    joinToken: string | null
  }
}

export const NEW_PLAYER_OK = 'NEW_PLAYER_OK'
export const NEW_PLAYER_FAILED = 'NEW_PLAYER_FAILED'

export const START_NEW_GAME_OK = 'START_NEW_GAME_OK'
export const START_NEW_GAME_FAILED = 'START_NEW_GAME_FAILED'

export const CAN_JOIN_GAME_OK = 'CAN_JOIN_GAME_OK'
export const CAN_JOIN_GAME_FAILED= 'CAN_JOIN_GAME_FAILED'
