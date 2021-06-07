import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['data'],
  loginSuccess: ['data'],
  loginFailure: ['data'],
  favoriteRequest: ['data'],
  favoriteSuccess: ['data'],
  favoriteFailure: ['data'],
  watchListRequest: ['data'],
  watchListSuccess: ['data'],
  watchListFailure: ['data']

})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  authFetching: false,
  authData: null,
  authError: null,
  favoriteFetching: false,
  favoriteData: null,
  favoriteError: null
})

/* ------------- Reducers ------------- */

export const loginRequest = (state) =>
  state.merge({ authFetching: true, authError: null })

export const loginSuccess = (state, { data }) => {
  return state.merge({ authFetching: false, authData: data, authError: null })
}

export const loginFailure = (state, { data }) =>
  state.merge({ authFetching: false, authError: data })

export const favoriteRequest = (state) =>
  state.merge({ favoriteFetching: true, favoriteError: null })

export const favoriteSuccess = (state, { data }) => {
  return state.merge({ favoriteFetching: false, favoriteData: data, favoriteError: null })
}

export const favoriteFailure = (state, { data }) =>
  state.merge({ favoriteFetching: false, favoriteError: data })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.FAVORITE_REQUEST]: favoriteRequest,
  [Types.FAVORITE_SUCCESS]: favoriteSuccess,
  [Types.FAVORITE_FAILURE]: favoriteFailure
})
