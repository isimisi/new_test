import {
  createStore, applyMiddleware, compose, Action, AnyAction
} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import LogRocket from 'logrocket';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import immutableTransform from 'redux-persist-transform-immutable';
import history from '@utils/history';
import autoMergeLevel2Immutable from '@redux/autoMergeLevel2Immutable';
import reducer, { ApplicationState } from './reducers';

const _logger = process.env.NODE_ENV === 'production' ? LogRocket.reduxMiddleware() : logger;

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  blacklist: ['output'],
  stateReconciler: autoMergeLevel2Immutable,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const resetEnhancer = rootReducer => (state, action) => {
  if (action.type !== 'RESET') return rootReducer(state, action);

  const newState = rootReducer(undefined, {});
  newState.router = state.router;
  return newState;
};

const initialState = {};
const store = createStore<ApplicationState, any, unknown, unknown>(
  resetEnhancer(persistedReducer),
  initialState,
  compose(applyMiddleware(thunk, routerMiddleware(history)/** , _logger */))
);


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export type ThunkAction<
  R, // Return type of the thunk function
  S, // state type used by getState
  E, // any "extra argument" injected into the thunk
  A extends Action // known types of actions that can be dispatched
> = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>


export interface Immutable<T> {
  get<K extends keyof T>(name: K): T[K];
  set<S>(o: S): Immutable<T & S>;
}


export default store;
