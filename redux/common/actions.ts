import { Dispatch } from 'redux'
import axios from 'axios'

import { Game, Player } from '../../types/game'

import {
  NEW_PLAYER_OK,
  NEW_PLAYER_FAILED,
  START_NEW_GAME_OK,
  START_NEW_GAME_FAILED
} from './types'

const newPlayerOk = (player: Player) => {
  return {
    type: NEW_PLAYER_OK,
    payload: player
  }
}

const newPlayerFailed = (reject: any) => {
  return {
    type: NEW_PLAYER_FAILED,
    payload: reject
  }
}

export const newPlayer = (name: string) => (dispatch: Dispatch) => {
  axios.post(`/api/v1/players/new`, { name })
    .then(res => { dispatch(newPlayerOk(res.data.data)) } )
    .catch(reject => { dispatch(newPlayerFailed(reject)) })
}

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


