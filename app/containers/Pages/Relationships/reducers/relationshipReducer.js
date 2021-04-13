import { fromJS, List, Map } from 'immutable';
import { CLOSE_NOTIF } from '@redux/constants/notifConstants';
import {
  LABEL_CHANGE,
  DESCRIPTION_CHANGE,
  ADD_GROUP,
  CHANGE_COLOR,
  CHANGE_SIZE,
  GET_RELATIONSHIPS_SUCCESS,
  GET_RELATIONSHIPS_FAILED
} from './relationshipConstants';

const initialState = {
  relationships: List(),
  label: '',
  description: '',
  type: '',
  group: '',
  size: 'Medium',
  color: Map(),
  message: '',
  attributesDropDownOptions: List(),
  groupsDropDownOptions: List()
};


const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_RELATIONSHIPS_SUCCESS:
      return state.withMutations((mutableState) => {
        const relationships = fromJS(action.relationships);
        mutableState.set('relationships', relationships);
      });
    case GET_RELATIONSHIPS_FAILED:
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
    case CHANGE_COLOR:
      return state.withMutations((mutableState) => {
        const color = fromJS(action.color);
        mutableState.set('color', color);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('message', '');
      });
    default:
      return state;
  }
}
