import { createActions, createReducer } from 'reduxsauce'
import { getToken, getUsername, removeTokens, removeUsername, saveUsername } from '../../../utils/localStorage'
import { WAIT_FOR_ACTION, ERROR_ACTION } from 'redux-wait-for-action'

const initialState = {
  isFetching: false,
  Promises: [],
  isAuthenticated: !!getToken(),
  errorMessage: '',
  username: getUsername() || '',
}

export const { Types, Creators: Actions } = createActions({
  createPromiseRequest: ['data'],
  createPromiseSuccess: ['payload'],
  createPromiseFailure: [],
  loginRequest: ['data'],
  loginSuccess: ['payload'],
  loginFailure: [],
  logout: null,
  fetchPromiseListRequest: [],
  fetchPromiseListSuccess: ['payload'],
  fetchPromiseListFailure: [],
})

export const loginRequest = state =>
  ({ ...state, isFetching: true, isAuthenticated: false, errorMessage: '' })
export const loginSuccess = (state, { payload }) => {
  saveUsername(payload.username)
  console.log(state)
  return { ...state, isFetching: false, isAuthenticated: true, errorMessage: '', username: payload.login }
}

export const loginFailure = (state, { errorMessage }) =>
  ({ ...state, isFetching: false, isAuthenticated: false, errorMessage })

export const logout = (state) => {
  removeTokens()
  removeUsername()
  return { ...state, isFetching: false, isAuthenticated: false, username: '' }
}

const request = state => ({ ...state, isFetching: true, errorMessage: '' })
const success = (state, { payload }) => {
  console.log(payload)
  return ({ ...state, isFetching: false, Promises: {} })
}
const failure = state => ({ ...state, isFetching: false, errorMessage: '' })

const handlers = {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
  [Types.CREATE_PROMISE_REQUEST]: request,
  [Types.CREATE_PROMISE_SUCCESS]: success,
  [Types.CREATE_PROMISE_FAILURE]: failure,
}
export default createReducer(initialState, handlers)
