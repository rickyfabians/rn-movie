import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/MoviesRedux'

test('getTrendingRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.getTrendingRequest())

  expect(state.trendingFetching).toBe(true)
  expect(state.trendingError).toBe(null)
})

test('getTrendingSuccess', () => {
  const data = {
    result: []
  }
  const state = reducer(INITIAL_STATE, Actions.getTrendingSuccess(data))

  expect(state.trendingFetching).toBe(false)
  expect(state.trendingData).toStrictEqual(data)
  expect(state.trendingError).toBe(null)
})

test('getTrendingFailure', () => {
  const data = {
    errorMessage: 'error'
  }
  const state = reducer(INITIAL_STATE, Actions.getTrendingFailure(data))

  expect(state.trendingFetching).toBe(false)
  expect(state.trendingError).toStrictEqual(data)
})

test('getPopularRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.getPopularRequest())

  expect(state.popularFetching).toBe(true)
  expect(state.popularError).toBe(null)
})

test('getPopularSuccess', () => {
  const data = {
    result: []
  }
  const state = reducer(INITIAL_STATE, Actions.getPopularSuccess(data))

  expect(state.popularFetching).toBe(false)
  expect(state.popularData).toStrictEqual(data)
  expect(state.popularError).toBe(null)
})

test('getPopularFailure', () => {
  const data = {
    errorMessage: 'error'
  }
  const state = reducer(INITIAL_STATE, Actions.getPopularFailure(data))

  expect(state.popularFetching).toBe(false)
  expect(state.popularError).toStrictEqual(data)
})

test('getTopRatedRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.getTopRatedRequest())

  expect(state.topRatedFetching).toBe(true)
  expect(state.topRatedError).toBe(null)
})

test('getTopRatedSuccess', () => {
  const data = {
    result: []
  }
  const state = reducer(INITIAL_STATE, Actions.getTopRatedSuccess(data))

  expect(state.topRatedFetching).toBe(false)
  expect(state.topRatedData).toStrictEqual(data)
  expect(state.topRatedError).toBe(null)
})

test('getTopRatedFailure', () => {
  const data = {
    errorMessage: 'error'
  }
  const state = reducer(INITIAL_STATE, Actions.getTopRatedFailure(data))

  expect(state.topRatedFetching).toBe(false)
  expect(state.topRatedError).toStrictEqual(data)
})

test('getListOfMovieRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.getListOfMovieRequest())

  expect(state.listOfMovieFetching).toBe(true)
  expect(state.listOfMovieError).toBe(null)
})

test('getListOfMovieSuccess', () => {
  const data = {
    result: []
  }
  const state = reducer(INITIAL_STATE, Actions.getListOfMovieSuccess(data))

  expect(state.listOfMovieFetching).toBe(false)
  expect(state.listOfMovieData).toStrictEqual(data)
  expect(state.listOfMovieError).toBe(null)
})

test('getListOfMovieFailure', () => {
  const data = {
    errorMessage: 'error'
  }
  const state = reducer(INITIAL_STATE, Actions.getListOfMovieFailure(data))

  expect(state.listOfMovieFetching).toBe(false)
  expect(state.listOfMovieError).toStrictEqual(data)
})

test('getMovieDetailsRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.getMovieDetailsRequest())

  expect(state.movieDetailsFetching).toBe(true)
  expect(state.movieDetailsError).toBe(null)
})

test('getMovieDetailsSuccess', () => {
  const data = {
    result: []
  }
  const state = reducer(INITIAL_STATE, Actions.getMovieDetailsSuccess(data))

  expect(state.movieDetailsFetching).toBe(false)
  expect(state.movieDetailsData).toStrictEqual(data)
  expect(state.movieDetailsError).toBe(null)
})

test('getMovieDetailsFailure', () => {
  const data = {
    errorMessage: 'error'
  }
  const state = reducer(INITIAL_STATE, Actions.getMovieDetailsFailure(data))

  expect(state.movieDetailsFetching).toBe(false)
  expect(state.movieDetailsError).toStrictEqual(data)
})
