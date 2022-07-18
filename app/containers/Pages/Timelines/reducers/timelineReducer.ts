/* eslint-disable no-plusplus */
import {
  TimelineState,
  IImmutableTimelineState,
  TimelineNode,
  ITimelineNode,
} from "@customTypes/reducers/timeline";
import { isNode, Node } from "react-flow-renderer";
import { CLOSE_NOTIF, SHOW_NOTIF } from "@redux/constants/notifConstants";
import { fromJS, List, Map } from "immutable";
import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
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
  CHANGE_VIEW,
  CHANGE_TAGS,
  VALIDATE_EMAILS_CLOSE,
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
  POST_TIMELINE_ELEMENT_FAILED,
  SET_TIMELINE_NODE,
  CHANGE_TIMELINE_NODE_KEY,
  POST_TIMELINE_ELEMENT_LOADING,
  PUT_TIMELINE_ELEMENT_LOADING,
  PUT_TIMELINE_ELEMENT_SUCCESS,
  PUT_TIMELINE_ELEMENT_FAILED,
  DELETE_TIMELINE_ELEMENTS_LOADING,
  DELETE_TIMELINE_ELEMENTS_SUCCESS,
  DELETE_TIMELINE_ELEMENTS_FAILED,
  OPEN_EMAIL_CHANGE,
  SET_IS_UPDATING,
  IMPORT_EMAILS_LOADING,
  IMPORT_EMAILS_SUCCESS,
  IMPORT_EMAILS_FAILED,
  ADD_CURR_SPLITTING_EMAIL,
  ADD_EMAIL_SPLIT,
  REMOVE_EMAIL_SPLIT,
  CUSTOM_SPLIT_LOADING,
  CUSTOM_SPLIT_SUCCESS,
  CUSTOM_SPLIT_FAILED,
  CLEAR_SPLITTING,
  GO_THROUGH_SPLIT_CHANGE,
  DELETE_TIMELINE_LOADING,
  DELETE_TIMELINE_SUCCESS,
  DELETE_TIMELINE_FAILED,
  DOWNLOAD_DOCUMENT_LOADING,
  DOWNLOAD_DOCUMENT_SUCCESS,
  DOWNLOAD_DOCUMENT_FAILED,
} from "./timelineConstants";
import moment from "moment";

const getInnerTagOptions = (elements) => {
  const tagOptions: any[] = [];
  const filteredElements = elements.filter((e) => isNode(e));

  for (let i = 0; i < filteredElements.length; i++) {
    const element = filteredElements[i];
    const _tags = element.data.tags;
    if (_tags) {
      for (let z = 0; z < _tags.length; z++) {
        console.log(_tags);
        const tag = _tags[z];
        tagOptions.push(tag);
      }
    }
  }
  return tagOptions;
};

const initialLoadings = Map({
  main: false,
  post: false,
  mouse: false,
  modal: false,
});

const initialNode: TimelineNode = {
  id: "",
  title: "",
  description: "",
  content: EditorState.createEmpty(),
  email: Map({ mail: null, uri: null, index: null, customSplit: null }),
  date: null,
  time: null,
  persons: List(),
  documents: List(),
  tags: List(),
};

const initialState: TimelineState = {
  timelines: List(),
  elements: List(),
  elementsTagOptions: List(),
  emailsToValidate: List(),
  message: "",
  handleVisability: true,
  title: "",
  description: "",
  group: "",
  shareOrg: false,
  specificTimelineTags: List(),
  loadings: initialLoadings,
  createElementOpen: false,
  goThroughSplitOpen: false,
  personOpen: false,
  documentOpen: false,
  timelineNode: Map(initialNode),
  isUpdatingNode: false,
  emailOpen: false,
  view: "horizontal",
  currSplittingEmail: null,
  currSplittingNodeRefference: null,
  splitElements: List(),
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
    case IMPORT_EMAILS_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(["loadings", "modal"], false);
        mutableState.set("elements", fromJS(action.elements));
        mutableState.set("emailsToValidate", fromJS(action.emails));
      });
    case PUT_TIMELINE_ELEMENT_SUCCESS:
      return state.withMutations((mutableState) => {
        const newEl = action.element as Node;
        // @ts-ignore
        const elements = mutableState.get("elements").toJS();
        const index = elements.findIndex((e) => e.id === action.element.id);
        newEl.position = elements[index].position;
        // @ts-ignore
        newEl.type = mutableState.get("view");
        elements[index] = newEl;
        mutableState.set("elements", fromJS(elements));
        mutableState.setIn(["loadings", "post"], false);
      });
    case DELETE_TIMELINE_ELEMENTS_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("elements", fromJS(action.elements));
        mutableState.setIn(["loadings", "mouse"], false);
        mutableState.set("createElementOpen", false);
        mutableState.set("timelineNode", Map(initialNode));
      });
    case POST_TIMELINE_LOADING:
      return state.withMutations((mutableState) => {
        const loadingType = action.loadingType;
        mutableState.setIn(["loadings", loadingType], true);
        mutableState.set("title", "");
        mutableState.set("description", "");
        mutableState.set("group", "");
        mutableState.set("shareOrg", false);
        mutableState.set("specificTimelineTags", List());
      });
    case GET_TIMELINES_LOADING:
    case POST_TIMELINE_ELEMENT_LOADING:
    case PUT_TIMELINE_ELEMENT_LOADING:
    case SHOW_TIMELINE_LOADING:
    case CUSTOM_SPLIT_LOADING:
    case IMPORT_EMAILS_LOADING:
    case DOWNLOAD_DOCUMENT_LOADING:
    case DELETE_TIMELINE_ELEMENTS_LOADING:
    case DELETE_TIMELINE_LOADING:
      return state.withMutations((mutableState) => {
        const loadingType = action.loadingType;
        mutableState.setIn(["loadings", loadingType], true);
      });
    case GET_TIMELINES_FAILED:
    case POST_TIMELINE_FAILED:
    case POST_TIMELINE_ELEMENT_FAILED:
    case PUT_TIMELINE_FAILED:
    case CUSTOM_SPLIT_FAILED:
    case SHOW_TIMELINE_FAILED:
    case IMPORT_EMAILS_FAILED:
    case DELETE_TIMELINE_FAILED:
    case DELETE_TIMELINE_SUCCESS:
    case DOWNLOAD_DOCUMENT_FAILED:
    case PUT_TIMELINE_ELEMENT_FAILED:
    case DELETE_TIMELINE_ELEMENTS_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("loadings", initialLoadings);
      });
    case DOWNLOAD_DOCUMENT_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("loadings", initialLoadings);
      });
    case CUSTOM_SPLIT_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(["loadings", "post"], false);
        mutableState.set("elements", fromJS(action.elements));
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
    case GO_THROUGH_SPLIT_CHANGE:
      return state.withMutations((mutableState) => {
        mutableState.set("goThroughSplitOpen", action.bool);
      });
    case TIMELINE_ELEMENT_PERSON_CHANGE:
      return state.withMutations((mutableState) => {
        mutableState.set("personOpen", action.bool);
      });
    case TIMELINE_ELEMENT_DOCUMENT_CHANGE:
      return state.withMutations((mutableState) => {
        mutableState.set("documentOpen", action.bool);
      });
    case OPEN_EMAIL_CHANGE:
      return state.withMutations((mutableState) => {
        mutableState.set("emailOpen", action.bool);
      });
    case POST_TIMELINE_ELEMENT_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("elements", fromJS(action.elements));
        mutableState.set("timelineNode", Map(initialNode));
        mutableState.setIn(["loadings", "post"], false);
      });
    case SET_TIMELINE_NODE:
      return state.withMutations((mutableState) => {
        const id = action.id;
        const isVertical = action.isVertical;

        if (id) {
          // @ts-ignore
          const elements = mutableState.get("elements").toJS();
          const element = elements.find((el) => el.id === id);

          const tagOptions = getInnerTagOptions(elements);
          mutableState.set("elementsTagOptions", fromJS(tagOptions));

          let editorState = EditorState.createEmpty();
          if (element.data.content) {
            const blocksFromHtml = htmlToDraft(element.data.content);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(
              contentBlocks,
              entityMap
            );
            editorState = EditorState.createWithContent(contentState);
          }

          const node = {
            id: element.id,
            title: element.data.label,
            content: editorState,
            email: element.data.email,
            description: element.data.description,
            date: moment(element.data.date),
            time: moment(element.data.date),
            persons: fromJS(
              element.data.persons.map((p) => ({
                icon: p.person_icon,
                id: p.id,
                name: p.name,
              }))
            ),
            documents: fromJS(
              element.data.documents.map((d) => ({
                id: d.id,
                title: d.title,
              }))
            ),
            tags: fromJS(element.data.tags),
          };
          mutableState.set("timelineNode", fromJS(node));
          if (!isVertical) {
            mutableState.set("isUpdatingNode", true);
          }
        } else {
          mutableState.set("timelineNode", Map(initialNode));
          mutableState.set("isUpdatingNode", false);
        }
      });
    case CHANGE_TIMELINE_NODE_KEY:
      return state.withMutations((mutableState) => {
        let val = action.val;
        if (["persons", "documents", "email", "tags"].includes(action.attr)) {
          val = fromJS(action.val);
        }

        mutableState.setIn(["timelineNode", action.attr], val);
      });
    case SET_IS_UPDATING:
      return state.withMutations((mutableState) => {
        mutableState.set("isUpdatingNode", action.bool);
      });
    case VALIDATE_EMAILS_CLOSE:
      return state.withMutations((mutableState) => {
        mutableState.set("emailsToValidate", List());
      });
    case CHANGE_VIEW:
      return state.withMutations((mutableState) => {
        mutableState.set("view", action.direction);
        mutableState.set("elements", fromJS(action.elements));
      });
    case ADD_CURR_SPLITTING_EMAIL:
      return state.withMutations((mutableState) => {
        const currSplit = mutableState.get("currSplittingEmail");
        if (!currSplit) {
          const timelineNode = (mutableState.get(
            "timelineNode"
          ) as unknown) as ITimelineNode;
          mutableState.set("currSplittingEmail", action.email);
          mutableState.set("currSplittingNodeRefference", timelineNode.get("id"));
        }
      });
    case ADD_EMAIL_SPLIT:
      return state.withMutations((mutableState) => {
        mutableState.update("splitElements", (myList: any) =>
          myList.push(action.splitElement)
        );
      });
    case REMOVE_EMAIL_SPLIT:
      return state.withMutations((mutableState) => {
        mutableState.update("splitElements", (myList: any) =>
          myList.filter((x: string) => action.splitElement !== x)
        );
      });
    case CLEAR_SPLITTING:
      return state.withMutations((mutableState) => {
        mutableState.set("currSplittingEmail", null);
        mutableState.set("currSplittingNodeRefference", null);
        mutableState.set("splitElements", List());
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
