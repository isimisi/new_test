import { fromJS, List } from 'immutable';
import { CLOSE_NOTIF } from '@redux/constants/notifConstants';
import {
  GET_GROUP_DROPDOWN_SUCCESS,
  GET_GROUP_DROPDOWN_FAILED,
  GET_ATTRIBUTES_SUCCESS,
  GET_ATTRIBUTES_FAILED,
  POST_ATTRIBUTE_SUCCESS,
  POST_ATTRIBUTE_FAILED,
  SHOW_ATTRIBUTE_SUCCESS,
  SHOW_ATTRIBUTE_FAILED,
  PUT_ATTRIBUTE_SUCCESS,
  PUT_ATTRIBUTE_FAILED,
  LABEL_CHANGE,
  DESCRIPTION_CHANGE,
  ADD_TYPE,
  ADD_GROUP,
  SELECTION_VALUES
} from './attributeConstants';


const initialState = {
  attributes: List(),
  message: '',
  label: '',
  description: '',
  type: 'Value',
  selectionOptions: List(),
  group: '',
  groupsDropDownOptions: List()
};


const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_ATTRIBUTES_SUCCESS:
      return state.withMutations((mutableState) => {
        const attributes = fromJS(action.attributes);
        mutableState.set('attributes', attributes);
      });
    case GET_ATTRIBUTES_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case POST_ATTRIBUTE_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set('label', '');
        mutableState.set('description', '');
        mutableState.set('type', 'Value');
        mutableState.set('group', '');
      });
    case POST_ATTRIBUTE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case SHOW_ATTRIBUTE_SUCCESS:
      return state.withMutations((mutableState) => {
        const label = fromJS(action.label);
        const description = fromJS(action.description);
        const valueType = fromJS(action.valueType);
        const selectionOptions = fromJS(action.selectionOptions);
        const group = fromJS(action.group);

        mutableState.set('label', label);
        mutableState.set('description', description);
        mutableState.set('type', valueType);
        mutableState.set('selectionOptions', selectionOptions);
        mutableState.set('group', group);
      });
    case SHOW_ATTRIBUTE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case PUT_ATTRIBUTE_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case PUT_ATTRIBUTE_FAILED:
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
    case LABEL_CHANGE:
      return state.withMutations((mutableState) => {
        const label = fromJS(action.label);
        mutableState.set('label', label);
      });
    case DESCRIPTION_CHANGE:
      return state.withMutations((mutableState) => {
        const description = fromJS(action.description);
        mutableState.set('description', description);
      });
    case SELECTION_VALUES:
      return state.withMutations((mutableState) => {
        const selectionOptions = fromJS(action.selectionOptions);
        mutableState.set('selectionOptions', selectionOptions);
      });
    case ADD_TYPE:
      return state.withMutations((mutableState) => {
        const type = fromJS(action.value);
        mutableState.set('type', type);
      });
    case ADD_GROUP:
      return state.withMutations((mutableState) => {
        const group = fromJS(action.group);
        mutableState.set('group', group);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('message', '');
      });
    default:
      return state;
  }
}
