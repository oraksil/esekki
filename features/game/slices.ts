import axios from 'axios'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

import { Jsend } from '../../types/jsend'
import { Pack, Game, Player, Joinable } from '../../types/game'

interface CoinState {
  coinsUsedInCharging: number
  chargingStartedAt: number
}

interface GameState {
  player: {
    current: Player | null
    loaded: boolean
  }
  game: {
    current: Game | null
    joinToken: string | null
  }
  packs: Array<Pack>
}

const gameState: GameState = {
  player: {
    current: null,
    loaded: false,
  },
  game: {
    current: null,
    joinToken: null,
  },
  packs: [],
}

const slice = createSlice({
  name: 'game',
  initialState: gameState,
  reducers: {
    getPlayerOk: (state, { payload }: PayloadAction<Player>) => {
      state.player.current = payload
      state.player.loaded = true
    },
    getPlayerFailed: state => {
      state.player.current = null
      state.player.loaded = true
    },
    newPlayerOk: (state, { payload }: PayloadAction<Player>) => {
      state.player.current = payload
      state.player.loaded = true
    },
    newPlayerFailed: state => {
      state.player.current = null
      state.player.loaded = true
    },
    getPacksOk: (state, { payload }: PayloadAction<Array<Pack>>) => {
      state.packs = payload
    },
    getPacksFailed: state => {
      state.packs = []
    },
    startNewGameOk: (state, { payload }: PayloadAction<Game>) => {
      state.game.current = payload
      state.game.joinToken = null
    },
    startNewGameFailed: state => {
      state.game.current = null
      state.game.joinToken = null
    },
    canJoinGameOk: (state, { payload }: PayloadAction<Joinable>) => {
      const curGame = { ...state.game.current, id: payload.gameId }
      state.game.current = curGame as Game
      state.game.joinToken = payload.token

      const curPlayer = {
        ...state.player.current,
        turnUsername: payload.username,
        turnPassword: payload.password,
      }
      state.player.current = curPlayer as Player
    },
    canJoinGameFailed: state => {
      state.game.joinToken = null
    },
    insertCoinOk: (state, { payload }: PayloadAction<CoinState>) => {
      if (state.player && state.player.current) {
        state.player.current.chargingStartedAt = payload.chargingStartedAt
        state.player.current.coinsUsedInCharging = payload.coinsUsedInCharging
      }
    },
    insertCoinFailed: state => {},
    newUserFeedbackOk: state => {},
    newUserFeedbackFailed: state => {},
  },
})

const {
  getPlayerOk,
  getPlayerFailed,
  newPlayerOk,
  newPlayerFailed,
  canJoinGameOk,
  canJoinGameFailed,
  startNewGameOk,
  startNewGameFailed,
  getPacksOk,
  getPacksFailed,
  insertCoinOk,
  insertCoinFailed,
  newUserFeedbackOk,
  newUserFeedbackFailed,
} = slice.actions

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

export const insertCoin = (okCallback: any, failedCallback: any) => async (dispatch: Dispatch) => {
  try {
    const jsend: Jsend = (await axios.post(`/api/v1/players/coins/use`)).data
    if (jsend.status === 'success') {
      dispatch(insertCoinOk(jsend.data))
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

export default slice.reducer
