import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk, { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { MakeStore, createWrapper } from 'next-redux-wrapper'
import { Action } from '@reduxjs/toolkit'

import gameReducer from './game/slices'
import webrtcReducer from './webrtc/slices'

import mySaga from './game/sagas'
import webrtcSaga from './webrtc/sagas'

const debug = process.env.NODE_ENV !== 'production'

const rootReducer = combineReducers({
  common: gameReducer,
  webrtc: webrtcReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware()

let middlewares = applyMiddleware(thunk, sagaMiddleware)
if (debug) {
  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  })
  middlewares = composeEnhancers(middlewares)
}

export const makeStore: MakeStore<RootState> = () => {
  const store: any = createStore(rootReducer, middlewares)
  store.mySaga = sagaMiddleware.run(mySaga)
  store.webrtcSaga = sagaMiddleware.run(webrtcSaga)
  return store
}

export const wrapper = createWrapper<RootState>(makeStore, { debug })

export type Store = ReturnType<typeof makeStore>
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
