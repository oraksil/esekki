import { Dispatch } from 'redux'
import axios from 'axios'

import { Jsend } from '../../types/jsend'
import { Game, Player, Joinable } from '../../types/game'

import {
  GET_PLAYER_OK,
  GET_PLAYER_FAILED,
  NEW_PLAYER_OK,
  NEW_PLAYER_FAILED,
  START_NEW_GAME_OK,
  START_NEW_GAME_FAILED,
  CAN_JOIN_GAME_OK,
  CAN_JOIN_GAME_FAILED
} from './types'

const getPlayerOk = (player: Player) => {
  return {
    type: GET_PLAYER_OK,
    payload: player
  }
}

const getPlayerFailed = (player: Player) => {
  return {
    type: GET_PLAYER_FAILED,
    payload: player
  }
}

export const getPlayer = () => (dispatch: Dispatch) => {
  axios.get(`/api/v1/players/me`)
    .then(res => {
      const jsend: Jsend = res.data
      if (jsend.status === 'success') {
        dispatch(getPlayerOk(jsend.data))
      } else {
        dispatch(getPlayerFailed(jsend.data))
      }
    })
    .catch(reject => { dispatch(getPlayerFailed(reject)) })
}

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
    .then(res => { 
      const jsend: Jsend = res.data
      if (jsend.status === 'success') {
        dispatch(newPlayerOk(jsend.data))
      } else {
        dispatch(newPlayerFailed(jsend.data))
      }
    })
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
        const joinable: Joinable = { ...jsend.data, game: { id: gameId }}
        dispatch(canJoinGameOk(joinable))
      } else {
        dispatch(canJoinGameFailed(jsend.data))
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
      } else {
        dispatch(startNewGameFailed(jsend.data))
      }
    })
    .catch(reject => { dispatch(startNewGameFailed(reject)) })
}


