import { fromJS } from 'immutable';
import { CLOSE_NOTIF } from '@redux/constants/notifConstants';
import {
  GET_ELEMET_COUNTS_SUCCESS,
  GET_ELEMET_COUNTS_FAILED,
  GET_TIMELINE_SUCCESS,
  GET_TIMELINE_FAILED,
  POST_FEATURE_SUCCESS,
  POST_FEATURE_FAILED
} from './dashboardConstants';

const initialState = {
  elementCounts: {},
  timeline: [],
  message: '',
};


const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_ELEMET_COUNTS_SUCCESS:
      return state.withMutations((mutableState) => {
        const elementCounts = fromJS(action.elementCounts);
        mutableState.set('elementCounts', elementCounts);
      });
    case GET_ELEMET_COUNTS_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case GET_TIMELINE_SUCCESS:
      return state.withMutations((mutableState) => {
        const timeline = fromJS(action.timeline);
        mutableState.set('timeline', timeline);
      });
    case GET_TIMELINE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case POST_FEATURE_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case POST_FEATURE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('message', '');
      });
    default:
      return state;
  }
}
