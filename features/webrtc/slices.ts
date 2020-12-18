import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Joinable } from '../../types/game'

export interface SetupSessionParams {
  gameId: number
  joinToken: string
  turnUsername: string
  turnPassword: string
}

interface WebRTCState {
  mediaStreamOpen: boolean
  turnUsername: string | null
  turnPassword: string | null
}

const webrtcState: WebRTCState = {
  turnUsername: null,
  turnPassword: null,
  mediaStreamOpen: false,
}

const slice = createSlice({
  name: 'webrtc',
  initialState: webrtcState,
  reducers: {
    setupSession: {
      reducer: (state, { payload }: PayloadAction<SetupSessionParams>) => {},
      prepare: (gameId, joinToken, turnUsername, turnPassword) => {
        return {
          payload: { gameId, joinToken, turnUsername, turnPassword }
        }
      }
    },
    sdpExchangeDone: state => {},
    iceExchangeDone: state => {},
    mediaStreamOpen: state => {
        state.mediaStreamOpen = true
    },
    dataChannelOpen: state => {},
    startNewGameOk: state => {
      state.mediaStreamOpen = false
      state.turnUsername = null
      state.turnPassword = null
    },
    canJoinGameOk: (state, { payload }: PayloadAction<Joinable>) => {
      state.turnUsername = payload.username
      state.turnPassword = payload.password
    }
  }
})

export const {
  setupSession,
  sdpExchangeDone,
  iceExchangeDone,
  mediaStreamOpen,
  dataChannelOpen,
} = slice.actions

export default slice.reducer