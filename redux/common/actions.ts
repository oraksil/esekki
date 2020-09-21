import { Dispatch } from 'redux'
import axios from 'axios'

import { Game } from '../../types/game'

import {
  START_NEW_GAME_OK,
  START_NEW_GAME_FAILED
} from './types'

const startNewGameOk = (game: Game) => {
  return {
    type: START_NEW_GAME_OK,
    payload: game
  }
}

const startNewGameFailed = (reject: any) => {
  return {
    type: START_NEW_GAME_FAILED,
    payload: reject
  }
}

export const startNewGame = (packId: number) => (dispatch: Dispatch) => {
  axios.post(`/api/v1/packs/${packId}/new`)
    .then(res => { dispatch(startNewGameOk(res.data.data)) } )
    .catch(reject => { dispatch(startNewGameFailed(reject)) })
}


