
export interface CommonState {
  myName: string
}

export const GET_MY_NAME = 'GET_MY_NAME'
export const GET_MY_NAME_OK = 'GET_MY_NAME_OK'
export const GET_MY_NAME_FAILED = 'GET_MY_NAME_FAILED'

export interface GetMyName {
  type: typeof GET_MY_NAME
  payload: { playerId: string }
}

export interface GetMyNameOk {
  type: typeof GET_MY_NAME_OK
  payload: { myName: string }
}

export interface GetMyNameFailed {
  type: typeof GET_MY_NAME_OK
  message: string
}

export type CommonActionTypes = GetMyName | GetMyNameOk | GetMyNameFailed