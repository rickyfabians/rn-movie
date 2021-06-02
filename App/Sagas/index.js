import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { MoviesTypes } from '../Redux/MoviesRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getTrending, getPopular, getTopRated, getUpComing, getListOfMovie, getMovieDetails } from './MoviesSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(MoviesTypes.GET_TRENDING_REQUEST, getTrending, api),
    takeLatest(MoviesTypes.GET_POPULAR_REQUEST, getPopular, api),
    takeLatest(MoviesTypes.GET_TOP_RATED_REQUEST, getTopRated, api),
    takeLatest(MoviesTypes.GET_UP_COMING_REQUEST, getUpComing, api),
    takeLatest(MoviesTypes.GET_LIST_OF_MOVIE_REQUEST, getListOfMovie, api),
    takeLatest(MoviesTypes.GET_MOVIE_DETAILS_REQUEST, getMovieDetails, api)
  ])
}
