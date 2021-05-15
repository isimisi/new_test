import { fromJS, List, Map } from 'immutable';
import { CLOSE_NOTIF } from '@redux/constants/notifConstants';
import {
  GET_WORKSPACES_SUCCESS,
  GET_WORKSPACES_FAILED,
  PUT_WORKSPACE_SUCCESS,
  PUT_WORKSPACE_FAILED,
  SHOW_WORKSPACE_SUCCESS,
  SHOW_WORKSPACE_FAILED,
  LABEL_CHANGE,
  VALUES_CHANGE,
  DESCRIPTION_CHANGE,
  ADD_GROUP,
  GET_GROUP_DROPDOWN_SUCCESS,
  GET_GROUP_DROPDOWN_FAILED,
  ADD_EDGE,
  GET_RELATIONSHIP_VALUES_SUCCESS,
  GET_RELATIONSHIP_VALUES_FAILED,
  POST_EDGE_SUCCESS,
  POST_EDGE_FAILED,
  GET_NODE_VALUES_SUCCESS,
  GET_NODE_VALUES_FAILED,
  POST_NODE_SUCCESS,
  POST_NODE_FAILED,
  SHOW_HANDLES_CHANGE,
  POST_WORKSPACE_SUCCESS,
  POST_WORKSPACE_FAILED,
  DELETE_WORKSPACE_SUCCESS,
  DELETE_WORKSPACE_FAILED
} from './workspaceConstants';

const initialState = {
  workspaces: List(),
  label: '',
  description: '',
  group: '',
  initElement: List(),
  message: '',
  groupsDropDownOptions: List(),
  relationships: List(),
  nodes: List(),
  handleVisability: true,

  // EDGE
  edges: List(),

};


const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_WORKSPACES_SUCCESS:
      return state.withMutations((mutableState) => {
        const workspaces = fromJS(action.workspaces);
        mutableState.set('workspaces', workspaces);
      });
    case GET_WORKSPACES_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case POST_WORKSPACE_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set('label', '');
        mutableState.set('description', '');
        mutableState.set('group', '');
        mutableState.set('initElement', List());
      });
    case POST_WORKSPACE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case SHOW_WORKSPACE_SUCCESS:
      return state.withMutations((mutableState) => {
        const label = fromJS(action.label);
        const description = fromJS(action.description);
        const group = fromJS(action.group);
        const initElement = fromJS(action.initElement);

        mutableState.set('label', label);
        mutableState.set('description', description);
        mutableState.set('group', group);
        mutableState.set('initElement', initElement);
      });
    case SHOW_WORKSPACE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case PUT_WORKSPACE_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case PUT_WORKSPACE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case DELETE_WORKSPACE_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case DELETE_WORKSPACE_FAILED:
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
    case VALUES_CHANGE:
      return state.withMutations((mutableState) => {
        const values = fromJS(action.values);
        mutableState.set('values', values);
      });
    case ADD_GROUP:
      return state.withMutations((mutableState) => {
        const group = fromJS(action.group);
        mutableState.set('group', group);
      });
    case POST_EDGE_SUCCESS:
      return state.withMutations((mutableState) => {
        // TODO: add edge til workspace
      });
    case POST_EDGE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case POST_NODE_SUCCESS:
      return state.withMutations((mutableState) => {
        // TODO: add node til workspace
      });
    case POST_NODE_FAILED:
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
    case ADD_EDGE:
      return state.withMutations((mutableState) => {
        const edge = fromJS(action.edge);
        const currEdges = state.get('edges');
        const edges = currEdges.concat(edge);
        mutableState.set('edges', edges);
      });
    case SHOW_HANDLES_CHANGE:
      return state.withMutations((mutableState) => {
        const visability = fromJS(action.bool);
        mutableState.set('handleVisability', visability);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('message', '');
      });
    default:
      return state;
  }
}
