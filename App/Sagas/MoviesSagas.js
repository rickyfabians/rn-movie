import { call, put } from 'redux-saga/effects'
import MoviesActions from '../Redux/MoviesRedux'

export function * getTrending (api, action) {
  const { data, callback } = action
  // make the call to the api
  const response = yield call(api.getTrending, data)
  if (data.isOnlyFetch) callback?.(response)
  else {
    if (response.ok) {
      // do data conversion here if needed
      yield put(MoviesActions.getTrendingSuccess(response.data))
    } else {
      yield put(MoviesActions.getTrendingFailure())
    }
  }
}

export function * getPopular (api, action) {
  const { page } = action
  // make the call to the api
  const response = yield call(api.getPopular, { page })

  if (response.ok) {
    // do data conversion here if needed
    yield put(MoviesActions.getPopularSuccess(response.data))
  } else {
    yield put(MoviesActions.getPopularFailure())
  }
}

export function * getTopRated (api, action) {
  const { page } = action
  // make the call to the api
  const response = yield call(api.getTopRated, { page })

  if (response.ok) {
    // do data conversion here if needed
    yield put(MoviesActions.getTopRatedSuccess(response.data))
  } else {
    yield put(MoviesActions.getTopRatedFailure())
  }
}

export function * getUpComing (api, action) {
  const { page } = action
  // make the call to the api
  const response = yield call(api.getUpComing, { page })

  if (response.ok) {
    // do data conversion here if needed
    yield put(MoviesActions.getUpComingSuccess(response.data))
  } else {
    yield put(MoviesActions.getUpComingFailure())
  }
}

export function * getListOfMovie (api, action) {
  const { data, callback } = action
  // make the call to the api
  const response = yield call(api.getListOfMovie, data)
  if (response.ok) {
    // do data conversion here if needed
    if (data.page > 1) callback(response.data)
    else yield put(MoviesActions.getListOfMovieSuccess(response.data))
  } else {
    yield put(MoviesActions.getListOfMovieFailure())
  }
}

export function * getMovieDetails (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getMovieDetails, data)
  if (response.ok) {
    // do data conversion here if needed
    yield put(MoviesActions.getMovieDetailsSuccess(response.data))
  } else {
    yield put(MoviesActions.getMovieDetailsFailure())
  }
}
