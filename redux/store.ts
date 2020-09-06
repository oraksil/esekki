import { createStore, applyMiddleware, combineReducers } from 'redux'
import { MakeStore, createWrapper } from 'next-redux-wrapper'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { commonReducer } from './common/reducers'

const rootReducer = combineReducers({
  common: commonReducer
})

type RootState = ReturnType<typeof rootReducer>

export const makeStore: MakeStore<RootState> = () =>
    createStore(rootReducer, applyMiddleware(logger, thunk))

export const wrapper = createWrapper<RootState>(makeStore, { debug: true })

