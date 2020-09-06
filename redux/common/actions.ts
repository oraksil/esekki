import { Dispatch } from 'redux'
import { GET_MY_NAME, CommonActionTypes } from './types'

export const getMyName = (playerId: string): CommonActionTypes => {
  return {
    type: GET_MY_NAME,
    payload: { playerId }
  }
}

export const getMyNameAsync = (playerId: string) => (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch(getMyName(playerId))
  }, 5000)
}