import { createStore, applyMiddleware, combineReducers } from 'redux'
import { MakeStore, createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga' 
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { commonReducer } from './common/reducers'
import mySaga from './common/sagas'

const rootReducer = combineReducers({
  common: commonReducer
})

type RootState = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware()

export const makeStore: MakeStore<RootState> = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(logger, thunk, sagaMiddleware)
  )

  sagaMiddleware.run(mySaga)

  return store
}

export const wrapper = createWrapper<RootState>(makeStore, { debug: false })


