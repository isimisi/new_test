import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import LogRocket from 'logrocket';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import immutableTransform from 'redux-persist-transform-immutable';
import history from '@utils/history';
import autoMergeLevel2Immutable from '@redux/autoMergeLevel2Immutable';
import reducer from './reducers';

const _logger = process.env.NODE_ENV === 'production' ? LogRocket.reduxMiddleware() : logger;

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  blacklist: ['output'],
  stateReconciler: autoMergeLevel2Immutable,
};


const persistedReducer = persistReducer(persistConfig, reducer);

const initialState = {};
const store = createStore(
  persistedReducer,
  initialState,
  compose(applyMiddleware(thunk, routerMiddleware(history), _logger))
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
