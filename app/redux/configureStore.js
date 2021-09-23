/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import LogRocket from 'logrocket';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import immutableTransform from 'redux-persist-transform-immutable';

import autoMergeLevel2Immutable from './autoMergeLevel2Immutable';
import createReducer from './reducers';

const _logger = process.env.NODE_ENV === 'production' ? LogRocket.reduxMiddleware() : logger;

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  blacklist: ['output'],
  stateReconciler: autoMergeLevel2Immutable,
};


const persistedReducer = persistReducer(persistConfig, createReducer());


export default function configureStore(initialState = {}, history) {
  const store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(thunk, routerMiddleware(history), _logger))
  );

  const persistor = persistStore(store);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return { store, persistor };
}
