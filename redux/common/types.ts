import { Game, Player } from '../../types/game'
import { Pack } from '../../types/pack'

export interface CommonState {
    player: Player | null
    game: {
        current: Game | null
    }
    packs: Pack[]
}

export const NEW_PLAYER_OK = 'NEW_PLAYER_OK'
export const NEW_PLAYER_FAILED = 'NEW_PLAYER_FAILED'

export const START_NEW_GAME_OK = 'START_NEW_GAME_OK'
export const START_NEW_GAME_FAILED = 'START_NEW_GAME_FAILED'

export const GET_PACK_LISTUP_OK = 'GET_PACK_LISTUP_OK'
export const GET_PACK_LISTUP_FAILED = 'GET_PACK_LISTUP_FAILED'
