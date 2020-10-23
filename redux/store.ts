import { createStore, applyMiddleware, combineReducers } from 'redux'
import { MakeStore, createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducer as commonReducer } from './common/reducers'
import { reducer as webrtcReducer } from './webrtc/reducers'
// import { catalogReducer } from './common/reducers';

import mySaga from './common/sagas'
import webrtcSaga from './webrtc/sagas'

const rootReducer = combineReducers({
  common: commonReducer,
  webrtc: webrtcReducer,
  // catalog: catalogReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})

export const makeStore: MakeStore<RootState> = () => {
  const store: any = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
  )

  store.mySaga = sagaMiddleware.run(mySaga)
  store.webrtcSaga = sagaMiddleware.run(webrtcSaga)

  return store
}

export const wrapper = createWrapper<RootState>(makeStore, { debug: false })
