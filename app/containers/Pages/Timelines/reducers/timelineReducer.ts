import {
  TimelineState,
  IImmutableTimelineState,
  TimelineNode,
} from "@customTypes/reducers/timeline";
import { Node } from "react-flow-renderer";
import { CLOSE_NOTIF, SHOW_NOTIF } from "@redux/constants/notifConstants";
import { fromJS, List, Map } from "immutable";

import {
  SHOW_HANDLES_CHANGE,
  TimelineActions,
  GET_TIMELINES_LOADING,
  GET_TIMELINES_SUCCESS,
  GET_TIMELINES_FAILED,
  POST_TIMELINE_LOADING,
  POST_TIMELINE_SUCCESS,
  POST_TIMELINE_FAILED,
  TITLE_CHANGE,
  DESCRIPTION_CHANGE,
  ADD_GROUP,
  CHANGE_TAGS,
  SHARE_ORG_CHANGE,
  PUT_TIMELINE_SUCCESS,
  PUT_TIMELINE_FAILED,
  PUT_TIMELINE_LOADING,
  SHOW_TIMELINE_LOADING,
  SHOW_TIMELINE_FAILED,
  SHOW_TIMELINE_SUCCESS,
  CREATE_ELEMENT_CHANGE,
  TIMELINE_ELEMENT_PERSON_CHANGE,
  TIMELINE_ELEMENT_DOCUMENT_CHANGE,
  POST_TIMELINE_ELEMENT_SUCCESS,
  SET_TIMELINE_NODE,
  CHANGE_TIMELINE_NODE_KEY,
  PUT_TIMELINE_ELEMENT_LOADING,
  PUT_TIMELINE_ELEMENT_SUCCESS,
  PUT_TIMELINE_ELEMENT_FAILED,
  DELETE_TIMELINE_ELEMENTS_LOADING,
  DELETE_TIMELINE_ELEMENTS_SUCCESS,
  DELETE_TIMELINE_ELEMENTS_FAILED,
} from "./timelineConstants";

const initialLoadings = Map({
  main: false,
  post: false,
  modal: false,
});

const initialNode: TimelineNode = {
  id: "",
  title: "",
  description: "",

  date: null,
  persons: [],
  documents: [],
  tags: [],
};

const initialState: TimelineState = {
  timelines: List(),
  elements: List(),
  message: "",
  handleVisability: true,
  title: "",
  description: "",
  group: "",
  shareOrg: false,
  specificTimelineTags: List(),
  loadings: initialLoadings,
  createElementOpen: false,
  personOpen: false,
  documentOpen: false,
  timelineNode: Map(initialNode),
  isUpdatingNode: false,
};

const initialImmutableState: IImmutableTimelineState = fromJS(initialState);

export default function reducer(
  state = initialImmutableState,
  action: TimelineActions
): IImmutableTimelineState {
  switch (action.type) {
    case GET_TIMELINES_SUCCESS:
      return state.withMutations((mutableState) => {
        const timelines = fromJS(action.timelines);
        mutableState.set("timelines", timelines);
        mutableState.setIn(["loadings", "main"], false);
      });
    case POST_TIMELINE_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(["loadings", "post"], false);
      });
    case PUT_TIMELINE_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(["loadings", "modal"], false);
      });
    case SHOW_TIMELINE_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("title", action.title);
        mutableState.set("description", action.description);
        mutableState.set("group", action.group);
        mutableState.set("shareOrg", action.shareOrg);
        mutableState.set("specificTimelineTags", fromJS(action.tags));
        mutableState.setIn(["loadings", "main"], false);
        mutableState.set("elements", fromJS(action.elements));
      });
    case PUT_TIMELINE_ELEMENT_SUCCESS:
      return state.withMutations((mutableState) => {
        const newEl = action.element as Node;
        // @ts-ignore
        const elements = mutableState.get("elements").toJS();
        const index = elements.findIndex((e) => e.id === action.element.id);
        newEl.position = elements[index].position;
        elements[index] = newEl;
        mutableState.set("elements", fromJS(elements));
        mutableState.setIn(["loadings", "post"], false);
      });
    case DELETE_TIMELINE_ELEMENTS_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("elements", fromJS(action.elements));
        mutableState.setIn(["loadings", "post"], false);
        mutableState.set("createElementOpen", false);
      });

    case GET_TIMELINES_LOADING:
    case POST_TIMELINE_LOADING:
    case PUT_TIMELINE_LOADING:
    case PUT_TIMELINE_ELEMENT_LOADING:
    case SHOW_TIMELINE_LOADING:
    case DELETE_TIMELINE_ELEMENTS_LOADING:
      return state.withMutations((mutableState) => {
        const loadingType = action.loadingType;
        mutableState.setIn(["loadings", loadingType], true);
      });
    case GET_TIMELINES_FAILED:
    case POST_TIMELINE_FAILED:
    case PUT_TIMELINE_FAILED:
    case SHOW_TIMELINE_FAILED:
    case PUT_TIMELINE_ELEMENT_FAILED:
    case DELETE_TIMELINE_ELEMENTS_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("loadings", initialLoadings);
      });
    case TITLE_CHANGE:
      return state.withMutations((mutableState) => {
        const title = fromJS(action.title);
        mutableState.set("title", title);
      });
    case DESCRIPTION_CHANGE:
      return state.withMutations((mutableState) => {
        const description = fromJS(action.description);
        mutableState.set("description", description);
      });
    case ADD_GROUP:
      return state.withMutations((mutableState) => {
        const group = fromJS(action.group);
        mutableState.set("group", group);
      });
    case CHANGE_TAGS:
      return state.withMutations((mutableState) => {
        const tags = fromJS(action.tags);
        mutableState.set("specificTimelineTags", tags);
      });
    case SHARE_ORG_CHANGE:
      return state.withMutations((mutableState) => {
        mutableState.update("shareOrg", (val) => !val);
      });
    case SHOW_HANDLES_CHANGE:
      return state.withMutations((mutableState) => {
        const visability = fromJS(action.bool);
        mutableState.set("handleVisability", visability);
      });
    case CREATE_ELEMENT_CHANGE:
      return state.withMutations((mutableState) => {
        mutableState.set("createElementOpen", action.bool);
      });
    case TIMELINE_ELEMENT_PERSON_CHANGE:
      return state.withMutations((mutableState) => {
        mutableState.set("personOpen", action.bool);
      });
    case TIMELINE_ELEMENT_DOCUMENT_CHANGE:
      return state.withMutations((mutableState) => {
        mutableState.set("documentOpen", action.bool);
      });
    case POST_TIMELINE_ELEMENT_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("elements", fromJS(action.elements));
      });
    case SET_TIMELINE_NODE:
      return state.withMutations((mutableState) => {
        const id = action.id;

        if (id) {
          // @ts-ignore
          const elements = mutableState.get("elements").toJS();
          const element = elements.find((el) => el.id === id);

          const node = {
            id: element.id,
            title: element.data.label,
            description: element.data.description,
            date: element.data.date,
            persons: element.data.persons.map((p) => ({
              icon: p.person_icon,
              id: p.id,
              name: p.name,
            })),
            documents: element.data.documents.map((d) => ({
              id: d.id,
              title: d.title,
            })),
            tags: [],
          };
          mutableState.set("timelineNode", fromJS(node));
          mutableState.set("isUpdatingNode", true);
        } else {
          mutableState.set("timelineNode", Map(initialNode));
          mutableState.set("isUpdatingNode", false);
        }
      });
    case CHANGE_TIMELINE_NODE_KEY:
      return state.withMutations((mutableState) => {
        console.log(action.val);
        mutableState.setIn(["timelineNode", action.attr], action.val);
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
