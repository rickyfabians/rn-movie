import { createStore, applyMiddleware, compose } from 'redux'
import Config from '../Config/DebugConfig'
import createSagaMiddleware from 'redux-saga'
import Reactotron from '../Config/ReactotronConfig'
import Rehydration from '../Services/Rehydration'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = Config.useReactotron ? console.tron.createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = createStore
  if (Config.useReactotron) {
    enhancers.push(Reactotron.createEnhancer())
  }
  const store = createAppropriateStore(rootReducer, compose(...enhancers))
  Rehydration.updateReducers(store)

  // kick off root saga
  const sagasManager = sagaMiddleware.run(rootSaga)

  return {
    store,
    sagasManager,
    sagaMiddleware
  }
}
