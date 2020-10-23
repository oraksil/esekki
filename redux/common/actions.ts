import { Dispatch } from 'redux'
import axios from 'axios'

import { Jsend } from '../../types/jsend'
import { Pack, Game, Player, Joinable } from '../../types/game'

import * as types from './types'

const getPlayerOk = (player: Player): types.GetPlayerOk => {
  return {
    type: types.GET_PLAYER_OK,
    payload: player 
  }
}

const getPlayerFailed = (): types.GetPlayerFailed => {
  return {
    type: types.GET_PLAYER_FAILED,
    payload: undefined
  }
}

export const getPlayer = () => (dispatch: Dispatch) => {
  axios.get(`/api/v1/players/me`)
    .then(res => {
      const jsend: Jsend = res.data
      if (jsend.status === 'success') {
        dispatch(getPlayerOk(jsend.data))
      } else {
        dispatch(getPlayerFailed())
      }
    })
    .catch(_ => {
      dispatch(getPlayerFailed())
    })
}

const newPlayerOk = (player: Player): types.NewPlayerOk => {
  return {
    type: types.NEW_PLAYER_OK,
    payload: player
  }
}

const newPlayerFailed = (): types.NewPlayerFailed => {
  return {
    type: types.NEW_PLAYER_FAILED,
    payload: undefined
  }
}

export const newPlayer = (name: string) => (dispatch: Dispatch) => {
  axios.post(`/api/v1/players/new`, { name })
    .then(res => { 
      const jsend: Jsend = res.data
      if (jsend.status === 'success') {
        dispatch(newPlayerOk(jsend.data))
      } else {
        dispatch(newPlayerFailed())
      }
    })
    .catch(_ => {
      dispatch(newPlayerFailed())
    })
}

const canJoinGameOk = (joinable: Joinable): types.CanJoinGameOk => {
  return {
    type: types.CAN_JOIN_GAME_OK,
    payload: joinable
  }
}

const canJoinGameFailed = (): types.CanJoinGameFailed => {
  return {
    type: types.CAN_JOIN_GAME_FAILED,
    payload: undefined
  }
}

export const canJoinGame = (gameId: number) => (dispatch: Dispatch) => {
  axios.get(`/api/v1/games/${gameId}/joinable`)
    .then(res => { 
      const jsend: Jsend = res.data
      if (jsend.status === 'success') {
        const joinable: Joinable = { ...jsend.data, gameId }
        dispatch(canJoinGameOk(joinable))
      } else {
        dispatch(canJoinGameFailed())
      }
    })
    .catch(_ => {
      dispatch(canJoinGameFailed())
    })
}

const startNewGameOk = (game: Game): types.StartNewGameOk => {
  return {
    type: types.START_NEW_GAME_OK,
    payload: game
  }
}

const startNewGameFailed = (): types.StartNewGameFailed => {
  return {
    type: types.START_NEW_GAME_FAILED,
    payload: undefined
  }
}

export const startNewGame = (packId: number) => (dispatch: Dispatch) => {
  axios.post(`/api/v1/packs/${packId}/new`)
    .then(res => { 
      const jsend: Jsend = res.data
      if (jsend.status === 'success') {
        dispatch(startNewGameOk(jsend.data))
      } else {
        dispatch(startNewGameFailed())
      }
    })
    .catch(_ => {
      dispatch(startNewGameFailed())
    })
}

const getPacksOk = (packs: Pack[]) => {
  return {
    type: types.GET_PACKS_OK,
    payload: packs,
  }
}

const getPacksFailed = () => {
  return {
    type: types.GET_PACKS_FAILED,
    payload: undefined,
  }
}

export const getPacks = (availableOnly: boolean) => (dispatch: Dispatch) => {
  axios.get('/api/v1/packs/')
    .then((res) => {
      const jsend: Jsend = res.data
      dispatch(getPacksOk(jsend.data))
    })
    .catch(_ => {
      dispatch(getPacksFailed())
    })
}
