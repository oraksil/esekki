import { Game } from '../../types/game'

export interface CommonState {
  game: {
    current: Game | null
  }
}

export const START_NEW_GAME_OK = 'START_NEW_GAME_OK'
export const START_NEW_GAME_FAILED = 'START_NEW_GAME_FAILED'
