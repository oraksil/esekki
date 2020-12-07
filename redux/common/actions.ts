import { Dispatch } from 'redux'
import axios from 'axios'

import { Jsend } from '../../types/jsend'
import { Pack, Game, Player, Joinable } from '../../types/game'

import * as types from './types'

const getPlayerOk = (player: Player): types.GetPlayerOk => {
  return {
    type: types.GET_PLAYER_OK,
    payload: player,
  }
}

const getPlayerFailed = (): types.GetPlayerFailed => {
  return {
    type: types.GET_PLAYER_FAILED,
    payload: undefined,
  }
}

export const getPlayer = () => async (dispatch: Dispatch) => {
  try {
    const jsend: Jsend = (await axios.get(`/api/v1/players/me`)).data
    if (jsend.status === 'success') {
      dispatch(getPlayerOk(jsend.data))
    } else {
      dispatch(getPlayerFailed())
    }
  } catch (e) {
    dispatch(getPlayerFailed())
  }
}

const newPlayerOk = (player: Player): types.NewPlayerOk => {
  return {
    type: types.NEW_PLAYER_OK,
    payload: player,
  }
}

const newPlayerFailed = (): types.NewPlayerFailed => {
  return {
    type: types.NEW_PLAYER_FAILED,
    payload: undefined,
  }
}

export const newPlayer = (name: string) => async (dispatch: Dispatch) => {
  try {
    const jsend: Jsend = (await axios.post(`/api/v1/players/new`, { name })).data
    if (jsend.status === 'success') {
      dispatch(newPlayerOk(jsend.data))
    } else {
      dispatch(newPlayerFailed())
    }
  } catch (e) {
    dispatch(newPlayerFailed())
  }
}

const canJoinGameOk = (joinable: Joinable): types.CanJoinGameOk => {
  return {
    type: types.CAN_JOIN_GAME_OK,
    payload: joinable,
  }
}

const canJoinGameFailed = (): types.CanJoinGameFailed => {
  return {
    type: types.CAN_JOIN_GAME_FAILED,
    payload: undefined,
  }
}

export const canJoinGame = (gameId: number) => async (dispatch: Dispatch) => {
  try {
    const jsend: Jsend = (await axios.get(`/api/v1/games/${gameId}/joinable`)).data
    if (jsend.status === 'success') {
      const joinable: Joinable = { ...jsend.data, gameId }
      dispatch(canJoinGameOk(joinable))
    } else {
      dispatch(canJoinGameFailed())
    }
  } catch (e) {
    dispatch(canJoinGameFailed())
  }
}

const startNewGameOk = (game: Game): types.StartNewGameOk => {
  return {
    type: types.START_NEW_GAME_OK,
    payload: game,
  }
}

const startNewGameFailed = (): types.StartNewGameFailed => {
  return {
    type: types.START_NEW_GAME_FAILED,
    payload: undefined,
  }
}

export const startNewGame = (packId: number) => async (dispatch: Dispatch) => {
  try {
    const jsend: Jsend = (await axios.post(`/api/v1/packs/${packId}/new`)).data
    if (jsend.status === 'success') {
      dispatch(startNewGameOk(jsend.data))
    } else {
      dispatch(startNewGameFailed())
    }
  } catch (e) {
    dispatch(startNewGameFailed())
  }
}

const getPacksOk = (packs: Array<Pack>): types.GetPacksOk => {
  return {
    type: types.GET_PACKS_OK,
    payload: packs,
  }
}

const getPacksFailed = (): types.GetPacksFailed => {
  return {
    type: types.GET_PACKS_FAILED,
    payload: [],
  }
}

export const getPacks = (statusFilter?: string) => async (dispatch: Dispatch) => {
  let url = '/api/v1/packs'
  if (statusFilter && ['ready', 'prepare'].includes(statusFilter)) {
    url += `?status=${statusFilter}`
  }

  try {
    const jsend: Jsend = (await axios.get(url)).data
    dispatch(getPacksOk(jsend.data))
  } catch (e) {
    dispatch(getPacksFailed())
  }
}

const newUserFeedbackOk = (): types.NewUserFeedbackOk => {
  return {
    type: types.NEW_USER_FEEDBACK_OK,
    payload: {},
  }
}

const newUserFeedbackFailed = (): types.NewUserFeedbackFailed => {
  return {
    type: types.NEW_USER_FEEDBACK_FAILED,
    payload: undefined,
  }
}

export const newUserFeedback = (feedback: string) => async (dispatch: Dispatch) => {
  try {
    const jsend: Jsend = (await axios.post(`/api/v1/feedbacks/new`, { feedback })).data
    if (jsend.status === 'success') {
      dispatch(newUserFeedbackOk())
    } else {
      dispatch(newUserFeedbackFailed())
    }
  } catch (e) {
    dispatch(newUserFeedbackFailed())
  }
}

const insertCoinOk = (
  coinsUsedInCharging: number,
  chargingStartedAt: number
): types.InsertCoinOk => {
  return {
    type: types.INSERT_COIN_OK,
    payload: { coinsUsedInCharging, chargingStartedAt },
  }
}

const insertCoinFailed = (): types.InsertCoinFailed => {
  return {
    type: types.INSERT_COIN_FAILED,
    payload: undefined,
  }
}

export const insertCoin = (okCallback: any, failedCallback: any) => async (dispatch: Dispatch) => {
  try {
    const jsend: Jsend = (await axios.post(`/api/v1/players/coins/use`)).data
    if (jsend.status === 'success') {
      const { coinsUsedInCharging, chargingStartedAt } = jsend.data
      dispatch(insertCoinOk(coinsUsedInCharging, chargingStartedAt))
      okCallback()
    } else {
      dispatch(insertCoinFailed())
      failedCallback()
    }
  } catch (e) {
    dispatch(insertCoinFailed())
    failedCallback()
  }
}
