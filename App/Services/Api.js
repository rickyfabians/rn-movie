// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const API_KEY = '16920a1e34e3b08e3a720c33cfc1341c'
const create = (baseURL = 'https://api.themoviedb.org/3/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getTrending = ({ page = 1 }) => api.get(`trending/movie/day?api_key=${API_KEY}&page=${page}`)
  const getPopular = ({ page = 1 }) => api.get(`movie/popular?api_key=${API_KEY}&page=${page}`)
  const getTopRated = ({ page = 1 }) => api.get(`movie/top_rated?api_key=${API_KEY}&page=${page}`)
  const getUpComing = ({ page = 1 }) => api.get(`movie/upcoming?api_key=${API_KEY}&page=${page}`)

  const getListOfMovie = ({ page = 1, query = '' }) => api.get(`search/movie?api_key=${API_KEY}&page=${page}&query=${query}`)

  const getMovieDetails = ({ movieId = '' }) => api.get(`movie/${movieId}?api_key=${API_KEY}`)

  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', { q: username })
  const reqToken = () => api.get(`authentication/token/new?api_key=${API_KEY}`)
  const reqSession = (token) => api.post(`authentication/session/new?api_key=${API_KEY}`, { request_token: token })
  const login = (payload) => api.post(`authentication/token/validate_with_login?api_key=${API_KEY}`, payload)
  const getAccount = (sessionId) => api.get(`account?api_key=${API_KEY}&session_id=${sessionId}`)

  const getWatchList = ({ page = 1 }, accountId, sessionId) => api.get(`account/${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}&page=${page}`)
  const getFavorite = ({ page = 1 }, accountId, sessionId) => api.get(`account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}&page=${page}`)

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getFavorite,
    getWatchList,
    getAccount,
    reqSession,
    reqToken,
    login,
    getMovieDetails,
    getListOfMovie,
    getTrending,
    getPopular,
    getTopRated,
    getUpComing,
    getRoot,
    getRate,
    getUser
  }
}

// let's return back our create method as the default.
export default {
  create
}
