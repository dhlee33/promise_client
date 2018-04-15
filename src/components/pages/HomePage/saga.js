import { call, put, take, select, fork, takeLatest } from 'redux-saga/effects'
import api, { parseSettings } from '../../../services/api'
import { saveToken, getToken } from '../../../utils/localStorage'
import { Actions, Types } from './reducer'
import { serverApi } from './constants'


export function* login({ data }) {
  console.log(data)
  try {
    const response = yield api.post(`${serverApi}/api-token-auth/`, data)
    console.log(response)
    saveToken(response)
    yield put(Actions.loginSuccess(response))
  } catch (error) {
    yield put(Actions.loginFailure('Login Failure'))
  }
}
export function* createPromise({ data }) {
  console.log(data, getToken())
  try {
    const response = yield api.post(`${serverApi}/promises/`, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${getToken()}`,
      },
    })
    console.log(response)
    yield put(Actions.createPromiseSuccess(response))
  } catch (error) {
    yield put(Actions.createPromiseFailure('Create Failure'))
  }
}

export function* fetchPromiseList({ id }) {
  try {
    const response = yield api.get(`${serverApi}/users/${id}/`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${getToken()}`,
      },
    })
    console.log(response)
    yield put(Actions.fetchPromiseListSuccess(response))
  } catch (error) {
    yield put(Actions.fetchPromiseListFailure('Fetch Promise List Failure'))
  }
}

export function* fetchUsers() {
  try {
    const response = yield api.get(`${serverApi}/users/`, { headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${getToken()}`,
    },
    })
    console.log(response)
    yield put(Actions.fetchUsersSuccess(response))
  } catch (error) {
    yield put(Actions.fetchUsersFailure('Fetch Users Failure'))
  }
}

export default function* () {
  yield takeLatest(Types.LOGIN_REQUEST, login)
  yield takeLatest(Types.CREATE_PROMISE_REQUEST, createPromise)
  yield takeLatest(Types.FETCH_PROMISE_LIST_REQUEST, fetchPromiseList)
  yield takeLatest(Types.FETCH_USERS_REQUEST, fetchUsers)
}
