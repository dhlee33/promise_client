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
  console.log(data, getToken())
  const response = yield api.post('http://localhost:8000/promises/', data)
  if (response) {
    console.log(response)
    yield put(Actions.createPromiseSuccess(response))
  }
  console.log(response)
}

export function* fetchPromiseList({id}) {
  const response = yield api.get(`http://localhost:8000/users/${id}/`)
  if (response) {
    console.log(response)
    yield put(Actions.fetchPromiseListSuccess(response))
  }
  console.log(response)
}

export function* fetchUsers() {
  const response = yield api.get('http://localhost:8000/users/')
  if (response) {
    console.log(response)
    yield put(Actions.fetchUsersSuccess(response))
  }
  console.log(response)
}

export default function* () {
  yield takeLatest(Types.LOGIN_REQUEST, login)
  yield takeLatest(Types.CREATE_PROMISE_REQUEST, createPromise)
  yield takeLatest(Types.FETCH_PROMISE_LIST_REQUEST, fetchPromiseList)
  yield takeLatest(Types.FETCH_USERS_REQUEST, fetchUsers)
}
