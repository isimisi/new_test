/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { fromJS } from 'immutable';
import LogRocket from 'logrocket';
import createReducer from './reducers';

const _logger = process.env.NODE_ENV === 'production' ? LogRocket.reduxMiddleware() : logger;

export default function configureStore(initialState = {}, history) {
  const store = createStore(
    createReducer(),
    fromJS(initialState),
    compose(applyMiddleware(thunk, routerMiddleware(history), _logger))
  );

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
