import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import { CommonState, GET_MY_NAME, CommonActionTypes } from './types'

const initialState: CommonState = {
  myName: 'oraksil'
}

export const commonReducer = (state: CommonState = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { initialState, ...action.payload.common }
    case GET_MY_NAME:
      return { myName: action.payload.playerId}
    default:
      return state
  }
}
