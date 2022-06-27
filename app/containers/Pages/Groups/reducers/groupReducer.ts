import { fromJS, List, Map } from "immutable";
import { CLOSE_NOTIF, SHOW_NOTIF } from "@redux/constants/notifConstants";
import {
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAILED,
  POST_GROUP_SUCCESS,
  POST_GROUP_FAILED,
  SHOW_GROUP_SUCCESS,
  SHOW_GROUP_FAILED,
  PUT_GROUP_FAILED,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILED,
  TITLE_CHANGE,
  DESCRIPTION_CHANGE,
  IMAGE_CHANGE,
  SEARCH_PRODUCT,
  GroupActions,
} from "./groupConstants";
import { GroupState, IImmutableGroupState } from "@customTypes/reducers/groups";

const initialState: GroupState = {
  groups: List([]),
  activeGroup: Map(),
  keywordValue: "",
  title: "",
  description: "",
  image: List(),
  message: "",
};

const initialImmutableState: IImmutableGroupState = fromJS(initialState);
export default function reducer(
  state = initialImmutableState,
  action: GroupActions
): IImmutableGroupState {
  switch (action.type) {
    case GET_GROUPS_SUCCESS:
      return state.withMutations((mutableState) => {
        const groups = fromJS(action.groups);
        mutableState.set("groups", groups);
      });
    case GET_GROUPS_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case POST_GROUP_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("title", "");
        mutableState.set("description", "");
        mutableState.set("image", List());
      });
    case POST_GROUP_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case SHOW_GROUP_SUCCESS:
      return state.withMutations((mutableState) => {
        const group = fromJS(action.group);
        mutableState.set("activeGroup", group);
      });
    case SHOW_GROUP_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case PUT_GROUP_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case DELETE_GROUP_SUCCESS:
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return state.withMutations((mutableState) => {});
    case DELETE_GROUP_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case TITLE_CHANGE:
      return state.withMutations((mutableState) => {
        const title = action.item;
        mutableState.set("title", title);
      });
    case DESCRIPTION_CHANGE:
      return state.withMutations((mutableState) => {
        const description = action.item;
        mutableState.set("description", description);
      });
    case IMAGE_CHANGE:
      return state.withMutations((mutableState) => {
        const image = fromJS(action.item);
        mutableState.set("image", image);
      });
    case SEARCH_PRODUCT:
      return state.withMutations((mutableState) => {
        action.keyword.persist();
        const keyword = action.keyword.target.value.toLowerCase();
        mutableState.set("keywordValue", keyword);
      });
    case SHOW_NOTIF:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set("message", "");
      });
    default:
      return state;
  }
}
