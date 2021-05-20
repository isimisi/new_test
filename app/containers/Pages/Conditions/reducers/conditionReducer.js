import { fromJS, List } from 'immutable';
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
  GET_GROUP_DROPDOWN_SUCCESS,
  GET_GROUP_DROPDOWN_FAILED,
  GET_NODE_VALUES_SUCCESS,
  GET_NODE_VALUES_FAILED,
  GET_RELATIONSHIP_VALUES_SUCCESS,
  GET_RELATIONSHIP_VALUES_FAILED,
  POST_NODE_SUCCESS,
  POST_NODE_FAILED,
  POST_EDGE_SUCCESS,
  POST_EDGE_FAILED
} from './conditionConstants';

const initialState = {
  conditions: List(),
  label: '',
  description: '',
  group: '',
  elements: List(),
  message: '',
  groupsDropDownOptions: List(),
  nodeAttributes: List(),
  relationshipLabels: List(),
  nodes: List(),
  relationships: List(),
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
        mutableState.set('label', '');
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
        const label = fromJS(action.label);
        const description = fromJS(action.description);
        const group = fromJS(action.group);
        const elements = fromJS(action.elements);

        mutableState.set('label', label);
        mutableState.set('description', description);
        mutableState.set('group', group);
        mutableState.set('elements', elements);
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
    case GET_NODE_VALUES_SUCCESS:
      return state.withMutations((mutableState) => {
        const nodes = fromJS(action.nodes);
        mutableState.set('nodes', nodes);
      });
    case GET_NODE_VALUES_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case GET_RELATIONSHIP_VALUES_SUCCESS:
      return state.withMutations((mutableState) => {
        const relationships = fromJS(action.relationships);
        mutableState.set('relationships', relationships);
      });
    case GET_RELATIONSHIP_VALUES_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case TITLE_CHANGE:
      return state.withMutations((mutableState) => {
        const title = fromJS(action.title);
        mutableState.set('label', title);
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
    case POST_NODE_SUCCESS:
      return state.withMutations((mutableState) => {
        const node = fromJS(action.node);
        mutableState.update('elements', myList => myList.push(node));
      });
    case POST_NODE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case POST_EDGE_SUCCESS:
      return state.withMutations((mutableState) => {
        const edge = fromJS(action.edge);
        mutableState.update('elements', myList => myList.push(edge));
      });
    case POST_EDGE_FAILED:
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
