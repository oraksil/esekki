import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import { CommonState, GET_MY_NAME, GET_MY_NAME_OK, GET_MY_NAME_FAILED } from './types'

const initialState: CommonState = {
  myName: 'oraksil'
}

export const commonReducer = (state: CommonState = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { initialState, ...action.payload.common }
    case GET_MY_NAME_OK:
      return { myName: action.payload.myName}
    case GET_MY_NAME_FAILED:
      return state
    default:
      return state
  }
}
