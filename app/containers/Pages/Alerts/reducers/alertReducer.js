import { fromJS, List } from 'immutable';
import { CLOSE_NOTIF } from '@redux/constants/notifConstants';
import {
  GET_ALERTS_SUCCESS,
  GET_ALERTS_FAILED,
  POST_ALERT_SUCCESS,
  POST_ALERT_FAILED,
  SHOW_ALERT_SUCCESS,
  SHOW_ALERT_FAILED,
  PUT_ALERT_SUCCESS,
  PUT_ALERT_FAILED,
  DELETE_ALERT_SUCCESS,
  DELETE_ALERT_FAILED,
  TITLE_CHANGE,
  DESCRIPTION_CHANGE,
  ADD_GROUP,
  GET_GROUP_DROPDOWN_SUCCESS,
  GET_GROUP_DROPDOWN_FAILED,
  ADD_CONDITION,
  GET_CONDITION_DROPDOWN_SUCCESS,
  GET_CONDITION_DROPDOWN_FAILED,
} from './alertConstants';

const initialState = {
  alerts: List(),
  title: '',
  description: '',
  group: '',
  condition: '',
  message: '',
  groupsDropDownOptions: List(),
  conditionsDropDownOptions: List()
};


const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_ALERTS_SUCCESS:
      return state.withMutations((mutableState) => {
        const alerts = fromJS(action.alerts);
        mutableState.set('alerts', alerts);
      });
    case GET_ALERTS_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case POST_ALERT_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set('title', '');
        mutableState.set('description', '');
        mutableState.set('group', '');
        mutableState.set('condition', '');
      });
    case POST_ALERT_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case SHOW_ALERT_SUCCESS:
      return state.withMutations((mutableState) => {
        const title = fromJS(action.title);
        const description = fromJS(action.description);
        const group = fromJS(action.group);
        const condition = fromJS(action.condition);

        mutableState.set('title', title);
        mutableState.set('description', description);
        mutableState.set('group', group);
        mutableState.set('condition', condition);
      });
    case SHOW_ALERT_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case PUT_ALERT_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case PUT_ALERT_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case DELETE_ALERT_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case DELETE_ALERT_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case GET_CONDITION_DROPDOWN_SUCCESS:
      return state.withMutations((mutableState) => {
        const conditionsDropDownOptions = fromJS(action.conditions);
        mutableState.set('conditionsDropDownOptions', conditionsDropDownOptions);
      });
    case GET_CONDITION_DROPDOWN_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case GET_GROUP_DROPDOWN_SUCCESS:
      return state.withMutations((mutableState) => {
        const groupsDropDownOptions = fromJS(action.groups);
        mutableState.set('groupsDropDownOptions', groupsDropDownOptions);
      });
    case GET_GROUP_DROPDOWN_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case TITLE_CHANGE:
      return state.withMutations((mutableState) => {
        const title = fromJS(action.title);
        mutableState.set('title', title);
      });
    case DESCRIPTION_CHANGE:
      return state.withMutations((mutableState) => {
        const description = fromJS(action.description);
        mutableState.set('description', description);
      });
    case ADD_GROUP:
      return state.withMutations((mutableState) => {
        const group = fromJS(action.group);
        mutableState.set('group', group);
      });
    case ADD_CONDITION:
      return state.withMutations((mutableState) => {
        const condition = fromJS(action.condition);
        mutableState.set('condition', condition);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('message', '');
      });
    default:
      return state;
  }
}
