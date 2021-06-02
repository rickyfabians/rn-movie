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

export const MoviesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  movieDetailsFetching: false,
  movieDetailsData: null,
  movieDetailsError: null,
  listOfMovieFetching: false,
  listOfMovieData: null,
  listOfMovieError: null,
  trendingFetching: false,
  trendingData: null,
  trendingError: null,
  popularFetching: false,
  popularData: null,
  popularError: null,
  topRatedFetching: false,
  topRatedData: null,
  topRatedError: null
})

/* ------------- Selectors ------------- */

export const MoviesSelectors = {
  selectAvatar: state => state.github.avatar
}

/* ------------- Reducers ------------- */

export const getTrendingRequest = (state) =>
  state.merge({ trendingFetching: true, trendingError: null })

export const getTrendingSuccess = (state, {data}) => {
  return state.merge({ trendingFetching: false, trendingData: data, trendingError: null})
}

export const getTrendingFailure = (state, {data}) =>
  state.merge({ trendingFetching: false, trendingError: data})

export const getPopularRequest = (state) =>
  state.merge({ popularFetching: true, popularError: null })

export const getPopularSuccess = (state, {data}) => {
  return state.merge({ popularFetching: false, popularData: data, popularError: null})
}

export const getPopularFailure = (state, {data}) =>
  state.merge({ popularFetching: false, popularError: data})

export const getTopRatedRequest = (state) =>
  state.merge({ topRatedFetching: true, topRatedError: null })

export const getTopRatedSuccess = (state, {data}) => {
  return state.merge({ topRatedFetching: false, topRatedData: data, topRatedError: null})
}

export const getTopRatedFailure = (state, {data}) =>
  state.merge({ topRatedFetching: false, topRatedError: data})

export const getListOfMovieRequest = (state) =>
  state.merge({ listOfMovieFetching: true, listOfMovieError: null })

export const getListOfMovieSuccess = (state, {data}) => {
  return state.merge({ listOfMovieFetching: false, listOfMovieData: data, listOfMovieError: null})
}

export const getListOfMovieFailure = (state, {data}) =>
  state.merge({ listOfMovieFetching: false, listOfMovieError: data})

export const getMovieDetailsRequest = (state) =>
  state.merge({ movieDetailsFetching: true, movieDetailsError: null })

export const getMovieDetailsSuccess = (state, {data}) => {
  return state.merge({ movieDetailsFetching: false, movieDetailsData: data, movieDetailsError: null})
}

export const getMovieDetailsFailure = (state, {data}) =>
  state.merge({ movieDetailsFetching: false, movieDetailsError: data})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_MOVIE_DETAILS_REQUEST]: getMovieDetailsRequest,
  [Types.GET_MOVIE_DETAILS_SUCCESS]: getMovieDetailsSuccess,
  [Types.GET_MOVIE_DETAILS_FAILURE]: getMovieDetailsFailure,
  [Types.GET_LIST_OF_MOVIE_REQUEST]: getListOfMovieRequest,
  [Types.GET_LIST_OF_MOVIE_SUCCESS]: getListOfMovieSuccess,
  [Types.GET_LIST_OF_MOVIE_FAILURE]: getListOfMovieFailure,
  [Types.GET_TRENDING_REQUEST]: getTrendingRequest,
  [Types.GET_TRENDING_SUCCESS]: getTrendingSuccess,
  [Types.GET_TRENDING_FAILURE]: getTrendingFailure,
  [Types.GET_POPULAR_REQUEST]: getPopularRequest,
  [Types.GET_POPULAR_SUCCESS]: getPopularSuccess,
  [Types.GET_POPULAR_FAILURE]: getPopularFailure,
  [Types.GET_TOP_RATED_REQUEST]: getTopRatedRequest,
  [Types.GET_TOP_RATED_SUCCESS]: getTopRatedSuccess,
  [Types.GET_TOP_RATED_FAILURE]: getTopRatedFailure
})
