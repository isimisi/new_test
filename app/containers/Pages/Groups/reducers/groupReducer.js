import { fromJS, List } from 'immutable';
import { CLOSE_NOTIF } from '@redux/constants/notifConstants';
import {
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAILED,
  POST_GROUP_SUCCESS,
  POST_GROUP_FAILED,
  TITLE_CHANGE,
  DESCRIPTION_CHANGE,
  IMAGE_CHANGE,
  SHOW_DETAIL_PRODUCT,
  SEARCH_PRODUCT
} from './groupConstants';

const initialState = {
  groups: List([]),
  cart: List([]),
  totalItems: 0,
  totalPrice: 0,
  productIndex: 0,
  keywordValue: '',
  title: '',
  description: '',
  image: List(),
  message: '',
};

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_GROUPS_SUCCESS:
      return state.withMutations((mutableState) => {
        const groups = fromJS(action.groups);
        mutableState.set('groups', groups);
      });
    case GET_GROUPS_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case POST_GROUP_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case POST_GROUP_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case TITLE_CHANGE:
      return state.withMutations((mutableState) => {
        const title = action.item;
        mutableState.set('title', title);
      });
    case DESCRIPTION_CHANGE:
      return state.withMutations((mutableState) => {
        const description = action.item;
        mutableState.set('description', description);
      });
    case IMAGE_CHANGE:
      return state.withMutations((mutableState) => {
        const image = fromJS(action.item);
        mutableState.set('image', image);
      });
    case SEARCH_PRODUCT:
      return state.withMutations((mutableState) => {
        action.keyword.persist();
        const keyword = action.keyword.target.value.toLowerCase();
        mutableState.set('keywordValue', keyword);
      });
    case SHOW_DETAIL_PRODUCT:
      return state.withMutations((mutableState) => {
        const index = state.get('productList').indexOf(action.item);
        mutableState.set('productIndex', index);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('message', '');
      });
    default:
      return state;
  }
}
