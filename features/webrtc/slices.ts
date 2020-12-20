import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SetupSessionParams {
  gameId: number
  joinToken: string
  turnUsername: string
  turnPassword: string
}

interface WebRTCState {
  mediaStreamOpen: boolean
}

const webrtcState: WebRTCState = {
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
          payload: { gameId, joinToken, turnUsername, turnPassword },
        }
      },
    },
    sdpExchangeDone: state => {},
    iceExchangeDone: state => {},
    mediaStreamOpen: state => {
      state.mediaStreamOpen = true
    },
    dataChannelOpen: state => {},
    resetSession: state => {
      state.mediaStreamOpen = false
    },
  },
})

export const {
  setupSession,
  sdpExchangeDone,
  iceExchangeDone,
  mediaStreamOpen,
  dataChannelOpen,
  resetSession,
} = slice.actions

export default slice.reducer
