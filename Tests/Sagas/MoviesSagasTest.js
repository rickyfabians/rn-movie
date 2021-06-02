import FixtureAPI from '../../App/Services/FixtureApi'
import { put, call } from 'redux-saga/effects'
import { getMovieDetails } from '../../App/Sagas/MoviesSagas'
import MoviesActions from '../../App/Redux/MoviesRedux'
import { path } from 'ramda'

const stepper = (fn) => (mock) => fn.next(mock).value

test('first calls API', () => {
  const step = stepper(getMovieDetails(FixtureAPI, {data: {movieId: 337404}}))
  // first yield is API
  expect(step()).toEqual(call(FixtureAPI.getMovieDetails, {movieId: 337404}))
})

test('success path', () => {
  const response = FixtureAPI.getMovieDetails({movieId: 337404})
  const step = stepper(getMovieDetails(FixtureAPI, {data: {movieId: 337404}}))
  // first step API
  step()
  // Second step successful return
  const stepResponse = step(response)
  expect(stepResponse).toEqual(put(MoviesActions.getMovieDetailsSuccess(response.data)))
})

test('failure path', () => {
  const response = {ok: false}
  const step = stepper(getMovieDetails(FixtureAPI, {data: {movieId: 337404}}))
  // first step API
  step()
  // Second step failed response
  expect(step(response)).toEqual(put(MoviesActions.getMovieDetailsFailure()))
})
