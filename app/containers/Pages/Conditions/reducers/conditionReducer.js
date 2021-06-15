import { fromJS, List } from 'immutable';
import { CLOSE_NOTIF } from '@redux/constants/notifConstants';
import {
  isNode,
  isEdge
} from 'react-flow-renderer';
import {
  GET_CONDITIONS_LOADING,
  GET_CONDITIONS_SUCCESS,
  GET_CONDITIONS_FAILED,
  PUT_CONDITION_SUCCESS,
  PUT_CONDITION_FAILED,
  POST_CONDITION_SUCCESS,
  POST_CONDITION_FAILED,
  GET_BUILD_TYPES_VALUES_SUCCESS,
  GET_BUILD_TYPES_VALUES_FAILED,
  SHOW_CONDITION_SUCCESS,
  SHOW_CONDITION_FAILED,
  DELETE_CONDITION_SUCCESS,
  DELETE_CONDITION_FAILED,
  TITLE_CHANGE_CONDITION,
  DESCRIPTION_CHANGE_CONDITION,
  ADD_GROUP,
  GET_GROUP_DROPDOWN_SUCCESS,
  GET_GROUP_DROPDOWN_FAILED,
  GET_NODE_VALUES_SUCCESS,
  GET_NODE_VALUES_FAILED,
  GET_RELATIONSHIP_VALUES_SUCCESS,
  GET_RELATIONSHIP_VALUES_FAILED,
  CONDITION_POST_NODE_SUCCESS,
  CONDITION_POST_NODE_FAILED,
  CONDITION_PUT_EDGE_SUCCESS,
  CONDITION_PUT_EDGE_FAILED,
  SAVE_CONDITION_SUCCESS,
  SAVE_CONDITION_FAILED,
  CONDITION_PUT_NODE_SUCCESS,
  CONDITION_PUT_NODE_FAILED,
  CONDITION_POST_EDGE_SUCCESS,
  CONDITION_POST_EDGE_FAILED,
  DELETE_CONDITION_ELEMENTS_SUCCESS,
  DELETE_CONDITION_ELEMENTS_FAILED,
  CONDITION_RELATIONSHIP_ADD_TO_LIST,
  CONDITION_NODE_ADD_TO_LIST,
  CONDITION_NODE_ATTRIBUT_ADD_TO_LIST
} from './conditionConstants';

const initialState = {
  loading: false,
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
    case GET_CONDITIONS_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case GET_CONDITIONS_SUCCESS:
      return state.withMutations((mutableState) => {
        const conditions = fromJS(action.conditions);
        mutableState.set('conditions', conditions);
        mutableState.set('loading', false);
      });
    case GET_CONDITIONS_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
        mutableState.set('loading', false);
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
    case PUT_CONDITION_SUCCESS:
      return state.withMutations((mutableState) => {
        // do something
      });
    case PUT_CONDITION_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case SAVE_CONDITION_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case SAVE_CONDITION_FAILED:
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
    case DELETE_CONDITION_ELEMENTS_SUCCESS:
      return state.withMutations((mutableState) => {
        const elements = fromJS(action.remainingElements);
        mutableState.set('elements', elements);
      });
    case DELETE_CONDITION_ELEMENTS_FAILED:
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
    case TITLE_CHANGE_CONDITION:
      return state.withMutations((mutableState) => {
        const title = fromJS(action.title);
        mutableState.set('label', title);
      });
    case DESCRIPTION_CHANGE_CONDITION:
      return state.withMutations((mutableState) => {
        const description = fromJS(action.description);
        mutableState.set('description', description);
      });
    case ADD_GROUP:
      return state.withMutations((mutableState) => {
        const group = fromJS(action.group);
        mutableState.set('group', group);
      });
    case CONDITION_POST_NODE_SUCCESS:
      return state.withMutations((mutableState) => {
        const node = fromJS(action.node);
        mutableState.update('elements', myList => myList.push(node));
      });
    case CONDITION_POST_NODE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case CONDITION_PUT_NODE_SUCCESS:
      return state.withMutations((mutableState) => {
        const elements = mutableState.get('elements').toJS();
        const index = elements.findIndex(e => e.id === action.node.id && isNode(e));
        elements[index] = action.node;

        mutableState.set('elements', fromJS(elements));
      });
    case CONDITION_PUT_NODE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case CONDITION_PUT_EDGE_SUCCESS:
      return state.withMutations((mutableState) => {
        const elements = mutableState.get('elements').toJS();
        const index = elements.findIndex(e => e.id === action.edge.id && isEdge(e));
        elements[index] = action.edge;
        mutableState.set('elements', fromJS(elements));
      });
    case CONDITION_PUT_EDGE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case CONDITION_POST_EDGE_SUCCESS:
      return state.withMutations((mutableState) => {
        const edge = fromJS(action.edge);
        mutableState.update('elements', myList => myList.push(edge));
      });
    case CONDITION_POST_EDGE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case CONDITION_RELATIONSHIP_ADD_TO_LIST:
      return state.withMutations((mutableState) => {
        const relationship = fromJS(action.relationship);
        mutableState.update('relationships', myList => myList.push(relationship));
      });
    case CONDITION_NODE_ADD_TO_LIST:
      return state.withMutations((mutableState) => {
        const node = fromJS(action.node);
        mutableState.update('nodes', myList => myList.push(node));
      });
    case CONDITION_NODE_ATTRIBUT_ADD_TO_LIST:
      return state.withMutations((mutableState) => {
        const attribut = fromJS(action.attribut);
        mutableState.update('nodeAttributes', myList => myList.push(attribut));
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('message', '');
      });
    default:
      return state;
  }
}
