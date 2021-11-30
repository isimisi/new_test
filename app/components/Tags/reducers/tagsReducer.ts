import { fromJS, List } from 'immutable';

import { Tag } from '@customTypes/data';
import { Immutable } from '@redux/configureStore';
import {
  TAG_INDEX_SUCCESS,
  TAG_INDEX_FAILED,
  TAG_POST_SUCCESS,
  TAG_POST_FAILED,
  TAG_UPDATE_SUCCESS,
  TAG_UPDATE_FAILED,
  TAG_DELETE_SUCCESS,
  TAG_DELETE_FAILED,
  CHANGE_TAGS_ACTIVE,
  TagActions
} from './tagsConstants';

interface TagState {
  tags: List<Tag>,
  message: string
}

export type IImmutableTagState = Immutable<TagState>

const initialState: TagState = {
  tags: List(),
  message: ''
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action: TagActions): IImmutableTagState {
  switch (action.type) {
    case TAG_INDEX_SUCCESS:
      return state.withMutations((mutableState) => {
        const tags = fromJS(action.tags);
        mutableState.set('tags', tags);
      });
    case TAG_DELETE_SUCCESS:
      return state.withMutations((mutableState) => {
        const { id } = action;
        mutableState.update('tags', myList => myList.filter(tag => tag.toJS().id !== id));
      });
    case TAG_POST_SUCCESS:
      return state.withMutations((mutableState) => {
        const tag = fromJS(action.tag);
        mutableState.update('tags', myList => myList.push(tag));
      });
    case TAG_UPDATE_SUCCESS:
      return state.withMutations((mutableState) => {
        const tag = action.tag;
        mutableState.update('tags', myList => {
          const newList = [...myList.toJS()];
          const index = newList.findIndex(item => item.id === tag.id);
          newList[index].name = tag.name;
          newList[index].emoji = tag.emoji;
          newList[index].emoji_name = tag.emoji_name;
          return fromJS(newList);
        });
      });
    case CHANGE_TAGS_ACTIVE:
      return state.withMutations((mutableState) => {
        const tag = action.tag;
        mutableState.update('tags', myList => {
          const newList = [...myList.toJS()];
          const index = newList.findIndex(item => item.id === tag.id);
          newList[index].active = !newList[index].active;
          return fromJS(newList);
        });
      });
    case TAG_POST_FAILED:
    case TAG_UPDATE_FAILED:
    case TAG_DELETE_FAILED:
    case TAG_INDEX_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    default:
      return state;
  }
}
