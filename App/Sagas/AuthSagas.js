import { call, put, select } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'

const getAuthData = state => state.auth.authData

export function * login (api, action) {
  const { data, callback } = action
  // make the call to the api
  const reqToken = yield call(api.reqToken)
  if (!reqToken.ok) return yield put(AuthActions.loginFailure())
  const payload = {
    request_token: reqToken?.data?.request_token ?? '',
    username: data.username,
    password: data.password
  }
  const response = yield call(api.login, payload)
  if (!response.ok) return yield put(AuthActions.loginFailure())
  const reqSession = yield call(api.reqSession, payload.request_token)
  if (!reqSession.ok) return yield put(AuthActions.loginFailure())
  const getAccount = yield call(api.getAccount, reqSession.data?.session_id)
  if (data.isOnlyFetch) callback?.(response)
  else {
    if (getAccount.ok) {
      // do data conversion here if needed
      const authData = {
        ...response.data,
        ...reqSession.data,
        ...getAccount.data
      }
      yield put(AuthActions.loginSuccess(authData))
    } else {
      yield put(AuthActions.loginFailure())
    }
  }
}

export function * getWatchList (api, action) {
  const { data, callback } = action
  const authData = yield select(getAuthData)
  // make the call to the api
  const response = yield call(api.getWatchList, data, authData.id, authData.session_id)

  if (response.ok) {
    // do data conversion here if needed
    if (data.page > 1) callback(response.data)
    else yield put(AuthActions.watchListSuccess(response.data))
  } else {
    yield put(AuthActions.watchListFailure())
  }
}

export function * getFavorite (api, action) {
  const { data, callback } = action
  const authData = yield select(getAuthData)
  // make the call to the api
  const response = yield call(api.getWatchList, data, authData.id, authData.session_id)

  if (response.ok) {
    // do data conversion here if needed
    if (data.page > 1) callback(response.data)
    else yield put(AuthActions.favoriteSuccess(response.data))
  } else {
    yield put(AuthActions.favoriteFailure())
  }
}
