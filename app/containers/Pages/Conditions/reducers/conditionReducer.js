import { fromJS, List, Map } from 'immutable';
import { CLOSE_NOTIF } from '@redux/constants/notifConstants';
import {
  GET_CONDITIONS_SUCCESS,
  GET_CONDITIONS_FAILED,
  POST_CONDITION_SUCCESS,
  POST_CONDITION_FAILED,
  GET_BUILD_TYPES_VALUES_SUCCESS,
  GET_BUILD_TYPES_VALUES_FAILED,
  SHOW_CONDITION_SUCCESS,
  SHOW_CONDITION_FAILED,
  DELETE_CONDITION_SUCCESS,
  DELETE_CONDITION_FAILED,
  TITLE_CHANGE,
  DESCRIPTION_CHANGE,
  ADD_GROUP,
  ADD_TYPE,
  ADD_CONDITION_ROW,
  CHANGE_CONDITION_ROW,
  GET_GROUP_DROPDOWN_SUCCESS,
  GET_GROUP_DROPDOWN_FAILED,
  DELETE_CONDITION_ROW
} from './conditionConstants';

const initionConditionValue = [Map({
  build_value: null,
  comparison_type: 'is equal to',
  comparison_value: ''
})];

const initialState = {
  conditions: List(),
  title: '',
  description: '',
  type: '',
  group: '',
  conditionValues: List(initionConditionValue),
  message: '',
  groupsDropDownOptions: List(),
  nodeAttributes: List(),
  relationshipLabels: List(),
};


const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_CONDITIONS_SUCCESS:
      return state.withMutations((mutableState) => {
        const conditions = fromJS(action.conditions);
        mutableState.set('conditions', conditions);
      });
    case GET_CONDITIONS_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case POST_CONDITION_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set('title', '');
        mutableState.set('description', '');
        mutableState.set('type', '');
        mutableState.set('group', '');
      });
    case POST_CONDITION_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case SHOW_CONDITION_SUCCESS:
      return state.withMutations((mutableState) => {
        const title = fromJS(action.title);
        const description = fromJS(action.description);
        const group = fromJS(action.group);
        const type = fromJS(action.conditionType);
        const values = fromJS(action.values);

        mutableState.set('title', title);
        mutableState.set('description', description);
        mutableState.set('group', group);
        mutableState.set('type', type);
        mutableState.set('conditionValues', values);
      });
    case SHOW_CONDITION_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case GET_BUILD_TYPES_VALUES_SUCCESS:
      return state.withMutations((mutableState) => {
        const nodeAttributes = fromJS(action.nodeAttributes);
        const relationshipLabels = fromJS(action.relationshipLabels);

        mutableState.set('nodeAttributes', nodeAttributes);
        mutableState.set('relationshipLabels', relationshipLabels);
      });
    case GET_BUILD_TYPES_VALUES_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case DELETE_CONDITION_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case DELETE_CONDITION_FAILED:
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
    case ADD_TYPE:
      return state.withMutations((mutableState) => {
        const value = fromJS(action.value);
        mutableState.set('type', value);
      });
    case CHANGE_CONDITION_ROW:
      return state.withMutations((mutableState) => {
        const condition = fromJS(action.condition);
        mutableState.set('conditionValues', condition);
      });
    case ADD_CONDITION_ROW:
      return state.withMutations((mutableState) => {
        mutableState.update('conditionValues', myList => myList.push(initionConditionValue));
      });
    case DELETE_CONDITION_ROW:
      return state.withMutations((mutableState) => {
        mutableState.update('conditionValues', myList => myList.filter((v, i) => i !== action.index));
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('message', '');
      });
    default:
      return state;
  }
}
