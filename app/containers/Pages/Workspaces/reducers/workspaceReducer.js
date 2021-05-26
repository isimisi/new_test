import { fromJS, List, Map } from 'immutable';
import {
  isNode,
  isEdge
} from 'react-flow-renderer';
import { CLOSE_NOTIF } from '@redux/constants/notifConstants';
import {
  GET_WORKSPACES_LOADING,
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
  POST_EDGE_LOADING,
  POST_EDGE_SUCCESS,
  POST_EDGE_FAILED,
  PUT_EDGE_LOADING,
  PUT_EDGE_SUCCESS,
  PUT_EDGE_FAILED,
  GET_NODE_VALUES_SUCCESS,
  GET_NODE_VALUES_FAILED,
  POST_NODE_LOADING,
  POST_NODE_SUCCESS,
  POST_NODE_FAILED,
  SHOW_HANDLES_CHANGE,
  POST_WORKSPACE_SUCCESS,
  POST_WORKSPACE_FAILED,
  DELETE_WORKSPACE_SUCCESS,
  DELETE_WORKSPACE_FAILED,
  SAVE_WORKSPACE_SUCCESS,
  SAVE_WORKSPACE_FAILED,
  DELETE_WORKSPACE_ELEMENTS_SUCCESS,
  DELETE_WORKSPACE_ELEMENTS_FAILED,
  PUT_NODE_LOADING,
  PUT_NODE_SUCCESS,
  PUT_NODE_FAILED
} from './workspaceConstants';

const initialState = {
  loading: false,
  workspaces: List(),
  label: '',
  description: '',
  group: '',
  elements: List(),
  message: '',
  groupsDropDownOptions: List(),
  relationships: List(),
  nodes: List(),
  handleVisability: true,
  zoom: 0,
  xPosition: 0,
  yPosition: 0,

  // EDGE
  edges: List(),

};


const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_WORKSPACES_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case GET_WORKSPACES_SUCCESS:
      return state.withMutations((mutableState) => {
        const workspaces = fromJS(action.workspaces);
        mutableState.set('workspaces', workspaces);
        mutableState.set('loading', false);
      });
    case GET_WORKSPACES_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
        mutableState.set('loading', false);
      });
    case SAVE_WORKSPACE_SUCCESS:
      return state.withMutations((mutableState) => {
        // TODO: do something
      });
    case SAVE_WORKSPACE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case DELETE_WORKSPACE_ELEMENTS_SUCCESS:
      return state.withMutations((mutableState) => {
        const elements = fromJS(action.remainingElements);
        mutableState.set('elements', elements);
      });
    case DELETE_WORKSPACE_ELEMENTS_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case POST_WORKSPACE_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set('label', '');
        mutableState.set('description', '');
        mutableState.set('group', '');
        mutableState.set('elements', List());
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
        const elements = fromJS(action.elements);
        const zoom = fromJS(action.zoom);
        const xPosition = fromJS(action.x_position);
        const yPosition = fromJS(action.y_position);

        mutableState.set('label', label);
        mutableState.set('description', description);
        mutableState.set('group', group || '');
        mutableState.set('elements', elements);
        mutableState.set('zoom', zoom);
        mutableState.set('xPosition', xPosition);
        mutableState.set('yPosition', yPosition);
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
    case POST_EDGE_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case POST_EDGE_SUCCESS:
      return state.withMutations((mutableState) => {
        const edge = fromJS(action.edge);
        mutableState.update('elements', myList => myList.push(edge));
        mutableState.set('loading', false);
      });
    case POST_EDGE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
        mutableState.set('loading', false);
      });
    case PUT_EDGE_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case PUT_EDGE_SUCCESS:
      return state.withMutations((mutableState) => {
        const elements = mutableState.get('elements').toJS();
        const index = elements.findIndex(e => e.id === action.edge.id && isEdge(e));
        elements[index] = action.edge;
        mutableState.set('elements', fromJS(elements));
        mutableState.set('loading', false);
      });
    case PUT_EDGE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
        mutableState.set('loading', false);
      });
    case POST_NODE_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case POST_NODE_SUCCESS:
      return state.withMutations((mutableState) => {
        const node = fromJS(action.node);
        mutableState.update('elements', myList => myList.push(node));
        mutableState.set('loading', false);
      });
    case POST_NODE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
        mutableState.set('loading', false);
      });
    case PUT_NODE_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case PUT_NODE_SUCCESS:
      return state.withMutations((mutableState) => {
        const elements = mutableState.get('elements').toJS();
        const index = elements.findIndex(e => e.id === action.node.id && isNode(e));
        elements[index] = action.node;

        mutableState.set('elements', fromJS(elements));
      });
    case PUT_NODE_FAILED:
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
