import { fromJS, List, Map } from 'immutable';
import { CLOSE_NOTIF } from '@redux/constants/notifConstants';
import {
  TITLE_CHANGE,
  DESCRIPTION_CHANGE,
  ADD_ATTRIBUT,
  REMOVE_ATTRIBUT,
  ADD_GROUP,
  CHANGE_BACKGROUND_COLOR,
  CHANGE_BORDER_COLOR,
  CHANGE_SIZE,
  GET_NODES_SUCCESS,
  GET_NODES_FAILED,
  POST_NODE_SUCCESS,
  POST_NODE_FAILED,
  SHOW_NODE_SUCCESS,
  SHOW_NODE_FAILED,
  PUT_NODE_SUCCESS,
  PUT_NODE_FAILED,
  DELETE_NODE_SUCCESS,
  DELETE_NODE_FAILED,
  GET_ATTRIBUTE_DROPDOWN_SUCCESS,
  GET_ATTRIBUTE_DROPDOWN_FAILED,
  GET_GROUP_DROPDOWN_SUCCESS,
  GET_GROUP_DROPDOWN_FAILED,
} from './nodeConstants';

const initialAttribute = [Map({
  label: null,
  value: '',
  type: 'Value'
})];

const initialState = {
  nodes: List(),
  title: '',
  description: '',
  attributes: List(initialAttribute),
  deletedAttributes: List(),
  group: '',
  size: 'Medium',
  backgroundColor: Map({
    r: 255, g: 255, b: 255, a: 1
  }),
  borderColor: Map({
    r: 0, g: 0, b: 0, a: 1
  }),
  message: '',
  attributesDropDownOptions: List(),
  groupsDropDownOptions: List()
};


const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_NODES_SUCCESS:
      return state.withMutations((mutableState) => {
        const nodes = fromJS(action.nodes);
        mutableState.set('nodes', nodes);
      });
    case GET_NODES_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case POST_NODE_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set('title', '');
        mutableState.set('description', '');
        mutableState.set('attributes', List(initialAttribute));
        mutableState.set('group', '');
        mutableState.set('size', 'Medium');
        mutableState.set('backgroundColor', Map());
        mutableState.set('borderColor', Map());
      });
    case POST_NODE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case SHOW_NODE_SUCCESS:
      return state.withMutations((mutableState) => {
        const title = fromJS(action.title);
        const description = fromJS(action.description);
        const attributes = fromJS(action.attributes);
        const group = fromJS(action.group);
        const size = fromJS(action.size);
        const backgroundColor = fromJS(action.backgroundColor);
        const borderColor = fromJS(action.borderColor);


        mutableState.set('title', title);
        mutableState.set('description', description);
        mutableState.set('attributes', attributes);
        mutableState.set('group', group);
        mutableState.set('size', size);
        mutableState.set('backgroundColor', backgroundColor);
        mutableState.set('borderColor', borderColor);
      });
    case SHOW_NODE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case PUT_NODE_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case PUT_NODE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case DELETE_NODE_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case DELETE_NODE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case GET_ATTRIBUTE_DROPDOWN_SUCCESS:
      return state.withMutations((mutableState) => {
        const attributesDropDownOptions = fromJS(action.attributes);
        mutableState.set('attributesDropDownOptions', attributesDropDownOptions);
      });
    case GET_ATTRIBUTE_DROPDOWN_FAILED:
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
    case ADD_ATTRIBUT:
      return state.withMutations((mutableState) => {
        const attributes = fromJS(action.attributes);
        mutableState.set('attributes', attributes);
      });
    case REMOVE_ATTRIBUT:
      return state.withMutations((mutableState) => {
        mutableState.update('attributes', myList => myList.filter((v, i) => i !== action.index));
        if (action.id) {
          mutableState.update('deletedAttributes', list => list.push(action.id));
        }
      });
    case ADD_GROUP:
      return state.withMutations((mutableState) => {
        const group = fromJS(action.group);
        mutableState.set('group', group);
      });
    case CHANGE_SIZE:
      return state.withMutations((mutableState) => {
        const size = fromJS(action.size);
        mutableState.set('size', size);
      });
    case CHANGE_BACKGROUND_COLOR:
      return state.withMutations((mutableState) => {
        const color = fromJS(action.color);
        mutableState.set('backgroundColor', color);
      });
    case CHANGE_BORDER_COLOR:
      return state.withMutations((mutableState) => {
        const color = fromJS(action.color);
        mutableState.set('borderColor', color);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('message', '');
      });
    default:
      return state;
  }
}
