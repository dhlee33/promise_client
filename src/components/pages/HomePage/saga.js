import { call, put, take, select, fork, takeLatest } from 'redux-saga/effects'
import api, { parseSettings } from '../../../services/api'
import { saveToken, getToken } from '../../../utils/localStorage'
import { Actions, Types } from './reducer'


export function* login({ data }) {
  console.log(data)
  const response = yield api.post('http://localhost:8000/api-token-auth/', data)
  if (response) {
    console.log(response)
    saveToken(response)
    yield put(Actions.loginSuccess(response))
  }
}
export function* createPromise({ data }) {
  console.log(data)
  const response = yield api.post('http://localhost:8000/promises/', data, parseSettings())
  if (response) {
    console.log(response)
    yield put(Actions.createPromiseSuccess(response))
  }
  console.log(response)
}

export default function* () {
  yield takeLatest(Types.LOGIN_REQUEST, login)
  yield takeLatest(Types.CREATE_PROMISE_REQUEST, createPromise)
}
