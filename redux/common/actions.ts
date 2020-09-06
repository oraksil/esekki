import { Dispatch } from 'redux'
import { GET_MY_NAME, GET_MY_NAME_OK, GET_MY_NAME_FAILED, CommonActionTypes } from './types'

export const getMyName = (playerId: string): CommonActionTypes => {
  return {
    type: GET_MY_NAME,
    payload: { playerId }
  }
}

export const getMyNameOk = (myName: string): CommonActionTypes => {
  return {
    type: GET_MY_NAME_OK,
    payload: { myName }
  }
}

export const getMyNameFailed = (message: string): CommonActionTypes => {
  return {
    type: GET_MY_NAME_OK,
    message
  }
}

export const getMyNameAsync = (playerId: string) => (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch(getMyName(playerId))
  }, 5000)
}