import { call, put } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'

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
  if (data.isOnlyFetch) callback?.(response)
  else {
    if (response.ok) {
      // do data conversion here if needed
      yield put(AuthActions.loginSuccess(response.data))
    } else {
      yield put(AuthActions.loginFailure())
    }
  }
}
