import { fromJS, List, Map } from 'immutable';
import { CLOSE_NOTIF } from '@redux/constants/notifConstants';
import {
  LABEL_CHANGE,
  VALUES_CHANGE,
  DESCRIPTION_CHANGE,
  ADD_GROUP,
  GET_GROUP_DROPDOWN_SUCCESS,
  GET_GROUP_DROPDOWN_FAILED,
  ADD_RELATIONSHIP,
} from './workspaceConstants';

const initialState = {
  workspaces: List(),
  label: '',
  description: '',
  group: '',
  message: '',
  groupsDropDownOptions: List(),

  // EDGE
  edges: List(),
};


const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
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
    case ADD_RELATIONSHIP:
      return state.withMutations((mutableState) => {
        const edge = fromJS(action.edge);
        const currEdges = state.get('edges');
        const edges = currEdges.concat(edge);
        mutableState.set('edges', edges);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('message', '');
      });
    default:
      return state;
  }
}
