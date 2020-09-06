import { put, takeEvery } from 'redux-saga/effects'
import { GET_MY_NAME, GetMyName } from './types'
import { getMyNameOk, getMyNameFailed } from './actions'

function* getMyName(action: GetMyName) {
  try {
    yield put(getMyNameOk(action.payload.playerId))
  } catch (e) {
    yield put(getMyNameFailed(e.message))
  }
}

function* mySaga() {
  yield takeEvery(GET_MY_NAME, getMyName)
}

export default mySaga