
export interface CommonState {
  myName: string
}

export const GET_MY_NAME = 'GET_MY_NAME'

interface GetMyNameAction {
  type: typeof GET_MY_NAME
  payload: { playerId: string }
}

export type CommonActionTypes = GetMyNameAction