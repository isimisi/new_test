import { fromJS, List, Map } from 'immutable';
import { CLOSE_NOTIF } from '@redux/constants/notifConstants';
import {
  TITLE_CHANGE,
  DESCRIPTION_CHANGE,
  ADD_ATTRIBUT,
  ADD_TYPE,
  ADD_GROUP,
  CHANGE_BACKGROUND_COLOR,
  CHANGE_BORDER_COLOR,
  CHANGE_SIZE
} from './nodeConstants';

const initialState = {
  title: '',
  description: '',
  attributes: List(),
  type: '',
  group: '',
  size: 'Medium',
  backgroundColor: Map(),
  borderColor: Map(),
  message: '',
};


const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
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
        const attributes = fromJS(action.attributs);
        mutableState.set('attributes', attributes);
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
