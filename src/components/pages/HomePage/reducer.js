import { createActions, createReducer } from 'reduxsauce'
import {
  getToken, getUserId, getUsername, removeTokens, removeUsername,
  saveUsername, saveUserId, removeUserId,
} from '../../../utils/localStorage'

const initialState = {
  isFetching: false,
  promises_as_inviter: [],
  promises_as_invitee: [],
  isAuthenticated: !!getToken(),
  errorMessage: '',
  username: getUsername() || '',
  userId: getUserId() || '',
  users: [],
}

export const { Types, Creators: Actions } = createActions({
  createPromiseRequest: ['data'],
  createPromiseSuccess: ['payload'],
  createPromiseFailure: ['errorMessage'],
  loginRequest: ['data'],
  loginSuccess: ['payload'],
  loginFailure: ['errorMessage'],
  logout: null,
  fetchPromiseListRequest: ['id'],
  fetchPromiseListSuccess: ['payload'],
  fetchPromiseListFailure: ['errorMessage'],
  fetchUsersRequest: [],
  fetchUsersSuccess: ['payload'],
  fetchUsersFailure: ['errorMessage'],
})

export const loginRequest = state =>
  ({ ...state, isFetching: true, isAuthenticated: false, errorMessage: '' })
export const loginSuccess = (state, { payload }) => {
  saveUsername(payload.username)
  saveUserId(payload.id)
  console.log(state)
  return { ...state, isFetching: false, isAuthenticated: true, errorMessage: '', username: payload.username, userId: payload.id }
}
export const loginFailure = (state, { errorMessage }) =>

  ({ ...state, isFetching: false, isAuthenticated: false, errorMessage })

export const logout = (state) => {
  removeTokens()
  removeUsername()
  removeUserId()
  return { ...state, isFetching: false, isAuthenticated: false, username: '', userId: '' }
}

const fetchPromiseListRequest = state => ({ ...state, isFetching: true, errorMessage: '' })
const fetchPromiseListSuccess = (state, { payload }) => {
  console.log(payload)
  return ({ ...state, isFetching: false, promises_as_inviter: payload.promises_as_inviter, promises_as_invitee: payload.promises_as_invitee })
}
const fetchPromiseListFailure = (state, {errorMessage}) => ({ ...state, isFetching: false, errorMessage })

const createPromiseRequest = state => ({ ...state, isFetching: true, errorMessage: '' })
const createPromiseSuccess = (state, { payload }) => {
  console.log('create', payload)
  return ({ ...state, isFetching: false, promises_as_inviter: [...state.promises_as_inviter, payload.id] })
}
const createPromiseFailure = (state, { errorMessage }) => ({ ...state, isFetching: false, errorMessage })

const fetchUsersRequest = state => ({
  ...state, isFetching: true,
})

const fetchUsersSuccess = (state, { payload }) => ({
  ...state, isFetching: false, users: payload,
})

const fetchUsersFailure = (state, { errorMessage }) => ({
  ...state, isFetching: false, errorMessage,
})
const handlers = {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
  [Types.CREATE_PROMISE_REQUEST]: createPromiseRequest,
  [Types.CREATE_PROMISE_SUCCESS]: createPromiseSuccess,
  [Types.CREATE_PROMISE_FAILURE]: createPromiseFailure,
  [Types.FETCH_PROMISE_LIST_REQUEST]: fetchPromiseListRequest,
  [Types.FETCH_PROMISE_LIST_SUCCESS]: fetchPromiseListSuccess,
  [Types.FETCH_PROMISE_LIST_FAILURE]: fetchPromiseListFailure,
  [Types.FETCH_USERS_REQUEST]: fetchUsersRequest,
  [Types.FETCH_USERS_SUCCESS]: fetchUsersSuccess,
  [Types.FETCH_USERS_FAILURE]: fetchUsersFailure,
}
export default createReducer(initialState, handlers)
