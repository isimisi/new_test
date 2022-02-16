import { fromJS, List, Map } from "immutable";
import { CLOSE_NOTIF } from "@redux/constants/notifConstants";
import {
  LABEL_CHANGE,
  VALUES_CHANGE,
  DESCRIPTION_CHANGE,
  ADD_GROUP,
  CHANGE_COLOR,
  CHANGE_SIZE,
  GET_RELATIONSHIPS_SUCCESS,
  GET_RELATIONSHIPS_FAILED,
  POST_RELATIONSHIP_SUCCESS,
  POST_RELATIONSHIP_FAILED,
  SHOW_RELATIONSHIP_SUCCESS,
  SHOW_RELATIONSHIP_FAILED,
  PUT_RELATIONSHIP_SUCCESS,
  PUT_RELATIONSHIP_FAILED,
  DELETE_RELATIONSHIP_SUCCESS,
  DELETE_RELATIONSHIP_FAILED,
  GET_GROUP_DROPDOWN_SUCCESS,
  GET_GROUP_DROPDOWN_FAILED,
  CHANGE_USE_SUGGESTION,
} from "./relationshipConstants";

const initialState = {
  relationships: List(),
  label: "",
  values: List(),
  description: "",
  type: "",
  group: "",
  size: "Medium",
  color: Map(),
  message: "",
  groupsDropDownOptions: List(),
  useSuggestions: true,
};

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action: any) {
  switch (action.type) {
    case GET_RELATIONSHIPS_SUCCESS:
      return state.withMutations((mutableState) => {
        const relationships = fromJS(action.relationships);
        mutableState.set("relationships", relationships);
      });
    case GET_RELATIONSHIPS_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case POST_RELATIONSHIP_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("label", "");
        mutableState.set("values", List());
        mutableState.set("description", "");
        mutableState.set("type", "");
        mutableState.set("group", "");
        mutableState.set("size", "Medium");
        mutableState.set("color", Map());
      });
    case POST_RELATIONSHIP_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case SHOW_RELATIONSHIP_SUCCESS:
      return state.withMutations((mutableState) => {
        const label = fromJS(action.label);
        const values = fromJS(action.values);
        const description = fromJS(action.description);
        const relationshipType = fromJS(action.relationshipType);
        const group = fromJS(action.group);
        const size = fromJS(action.size);
        const color = fromJS(action.color);
        const useSuggestions = fromJS(action.use_suggestions);

        mutableState.set("label", label);
        mutableState.set("values", values);
        mutableState.set("description", description);
        mutableState.set("type", relationshipType);
        mutableState.set("group", group);
        mutableState.set("size", size);
        mutableState.set("color", color);
        mutableState.set("useSuggestions", useSuggestions);
      });
    case SHOW_RELATIONSHIP_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case PUT_RELATIONSHIP_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case PUT_RELATIONSHIP_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case DELETE_RELATIONSHIP_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case DELETE_RELATIONSHIP_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case GET_GROUP_DROPDOWN_SUCCESS:
      return state.withMutations((mutableState) => {
        const groupsDropDownOptions = fromJS(action.groups);
        mutableState.set("groupsDropDownOptions", groupsDropDownOptions);
      });
    case GET_GROUP_DROPDOWN_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case LABEL_CHANGE:
      return state.withMutations((mutableState) => {
        const label = fromJS(action.label);
        mutableState.set("label", label);
      });
    case DESCRIPTION_CHANGE:
      return state.withMutations((mutableState) => {
        const description = fromJS(action.description);
        mutableState.set("description", description);
      });
    case VALUES_CHANGE:
      return state.withMutations((mutableState) => {
        const values = fromJS(action.values);
        mutableState.set("values", values);
      });
    case ADD_GROUP:
      return state.withMutations((mutableState) => {
        const group = fromJS(action.group);
        mutableState.set("group", group);
      });
    case CHANGE_SIZE:
      return state.withMutations((mutableState) => {
        const size = fromJS(action.size);
        mutableState.set("size", size);
      });
    case CHANGE_COLOR:
      return state.withMutations((mutableState) => {
        const color = fromJS(action.color);
        mutableState.set("color", color);
      });
    case CHANGE_USE_SUGGESTION:
      return state.withMutations((mutableState) => {
        mutableState.update("useSuggestions", (val) => !val);
      });

    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set("message", "");
      });
    default:
      return state;
  }
}
