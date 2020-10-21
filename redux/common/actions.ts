import { Dispatch } from 'redux'
import axios from 'axios'

import { Jsend } from '../../types/jsend'
import { Game, Player, Joinable } from '../../types/game'

import {
  NEW_PLAYER_OK,
  NEW_PLAYER_FAILED,
  START_NEW_GAME_OK,
  START_NEW_GAME_FAILED,
  CAN_JOIN_GAME_OK,
  CAN_JOIN_GAME_FAILED
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
    .then(res => { dispatch(newPlayerOk(res.data.data)) })
    .catch(reject => { dispatch(newPlayerFailed(reject)) })
}

const canJoinGameOk = (joinable: Joinable) => {
  return {
    type: CAN_JOIN_GAME_OK,
    payload: joinable
  }
}

const canJoinGameFailed = (reject: any) => {
  return {
    type: CAN_JOIN_GAME_FAILED,
    payload: reject
  }
}

export const canJoinGame = (gameId: number) => (dispatch: Dispatch) => {
  axios.get(`/api/v1/games/${gameId}/joinable`)
    .then(res => { 
      const jsend: Jsend = res.data
      if (jsend.status === 'success') {
        dispatch(canJoinGameOk(res.data.data))
      }
    })
    .catch(reject => { dispatch(canJoinGameFailed(reject)) })
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
    .then(res => { 
      const jsend: Jsend = res.data
      if (jsend.status === 'success') {
        dispatch(startNewGameOk(jsend.data))
      }
    })
    .catch(reject => { dispatch(startNewGameFailed(reject)) })
}


