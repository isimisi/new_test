import { Tag } from "@customTypes/reducers/tags";
import {
  Loadings,
  TimelineTableOptions,
  TimelineNode,
} from "@customTypes/reducers/timeline";
import { NotifyActions } from "@redux/constants/notifConstants";
import { FlowElement } from "react-flow-renderer";

export const GET_TIMELINES_LOADING = "GET_TIMELINES_LOADING";
export const GET_TIMELINES_SUCCESS = "GET_TIMELINES_SUCCESS";
export const GET_TIMELINES_FAILED = "GET_TIMELINES_FAILED";

export const POST_TIMELINE_LOADING = "POST_TIMELINE_LOADING";
export const POST_TIMELINE_SUCCESS = "POST_TIMELINE_SUCCESS";
export const POST_TIMELINE_FAILED = "POST_TIMELINE_FAILED";

export const SHOW_TIMELINE_LOADING = "SHOW_TIMELINE_LOADING";
export const SHOW_TIMELINE_SUCCESS = "SHOW_TIMELINE_SUCCESS";
export const SHOW_TIMELINE_FAILED = "SHOW_TIMELINE_FAILED";

export const PUT_TIMELINE_LOADING = "PUT_TIMELINE_LOADING";
export const PUT_TIMELINE_SUCCESS = "PUT_TIMELINE_SUCCESS";
export const PUT_TIMELINE_FAILED = "PUT_TIMELINE_FAILED";

export const DELETE_TIMELINE_LOADING = "DELETE_TIMELINE_LOADING";
export const DELETE_TIMELINE_SUCCESS = "DELETE_TIMELINE_SUCCESS";
export const DELETE_TIMELINE_FAILED = "DELETE_TIMELINE_FAILED";

export const POST_TIMELINE_ELEMENT_LOADING = "POST_TIMELINE_ELEMENT_LOADING";
export const POST_TIMELINE_ELEMENT_SUCCESS = "POST_TIMELINE_ELEMENT_SUCCESS";
export const POST_TIMELINE_ELEMENT_FAILED = "POST_TIMELINE_ELEMENT_FAILED";

export const PUT_TIMELINE_ELEMENT_LOADING = "PUT_TIMELINE_ELEMENT_LOADING";
export const PUT_TIMELINE_ELEMENT_SUCCESS = "PUT_TIMELINE_ELEMENT_SUCCESS";
export const PUT_TIMELINE_ELEMENT_FAILED = "PUT_TIMELINE_ELEMENT_FAILED";

export const DELETE_TIMELINE_ELEMENTS_LOADING = "DELETE_TIMELINE_ELEMENTS_LOADING";
export const DELETE_TIMELINE_ELEMENTS_SUCCESS = "DELETE_TIMELINE_ELEMENTS_SUCCESS";
export const DELETE_TIMELINE_ELEMENTS_FAILED = "DELETE_TIMELINE_ELEMENTS_FAILED";

export const TITLE_CHANGE = "TITLE_CHANGE";
export const DESCRIPTION_CHANGE = "DESCRIPTION_CHANGE";
export const ADD_GROUP = "ADD_GROUP";
export const CHANGE_TAGS = "CHANGE_TAGS";
export const SHARE_ORG_CHANGE = "SHARE_ORG_CHANGE";

export const CREATE_ELEMENT_CHANGE = "CREATE_ELEMENT_CHANGE";
export const TIMELINE_ELEMENT_PERSON_CHANGE = "TIMELINE_ELEMENT_PERSON_CHANGE";
export const TIMELINE_ELEMENT_DOCUMENT_CHANGE = "TIMELINE_ELEMENT_DOCUMENT_CHANGE";

export const SET_TIMELINE_NODE = "SET_TIMELINE_NODE";
export const CHANGE_TIMELINE_NODE_KEY = "CHANGE_TIMELINE_NODE_KEY";

// CONTROL
export const SHOW_HANDLES_CHANGE = "SHOW_HANDLES_CHANGE";

type FailedTypes =
  | typeof GET_TIMELINES_FAILED
  | typeof POST_TIMELINE_FAILED
  | typeof SHOW_TIMELINE_FAILED
  | typeof PUT_TIMELINE_FAILED
  | typeof POST_TIMELINE_ELEMENT_FAILED
  | typeof PUT_TIMELINE_ELEMENT_FAILED
  | typeof DELETE_TIMELINE_ELEMENTS_FAILED
  | typeof DELETE_TIMELINE_FAILED;

type LoadingTypes =
  | typeof GET_TIMELINES_LOADING
  | typeof POST_TIMELINE_LOADING
  | typeof SHOW_TIMELINE_LOADING
  | typeof PUT_TIMELINE_LOADING
  | typeof PUT_TIMELINE_ELEMENT_LOADING
  | typeof DELETE_TIMELINE_ELEMENTS_LOADING
  | typeof POST_TIMELINE_ELEMENT_LOADING
  | typeof DELETE_TIMELINE_LOADING;

export interface FailedEvents {
  type: FailedTypes;
  message: string;
}

export interface LoadingEvents {
  type: LoadingTypes;
  loadingType: keyof Loadings;
}

export interface GetTimelinesSuccess {
  type: typeof GET_TIMELINES_SUCCESS;
  timelines: TimelineTableOptions;
}

export interface PostTimelineSuccess {
  type: typeof POST_TIMELINE_SUCCESS;
}

export interface ShowTimelineSuccess {
  type: typeof SHOW_TIMELINE_SUCCESS;
  title: string;
  description: string;
  group: string;
  shareOrg: boolean;
  elements: FlowElement[];
  tags: Tag[];
}

export interface PutTimelineSuccess {
  type: typeof PUT_TIMELINE_SUCCESS;
}

export interface DeleteTimelineSuccess {
  type: typeof DELETE_TIMELINE_SUCCESS;
}

export interface ShowHandlesChange {
  type: typeof SHOW_HANDLES_CHANGE;
  bool: boolean;
}

export interface TitleChange {
  type: typeof TITLE_CHANGE;
  title: string;
}

export interface DescriptionChange {
  type: typeof DESCRIPTION_CHANGE;
  description: string;
}

export interface AddGroup {
  type: typeof ADD_GROUP;
  group: string;
}

export interface ChangeTags {
  type: typeof CHANGE_TAGS;
  tags: Tag[];
}
export interface ShareOrgChange {
  type: typeof SHARE_ORG_CHANGE;
}

export interface CreateElementChange {
  type: typeof CREATE_ELEMENT_CHANGE;
  bool: boolean;
}

export interface TimelineElementPersonChange {
  type: typeof TIMELINE_ELEMENT_PERSON_CHANGE;
  bool: boolean;
}

export interface TimelineElementDocumentChange {
  type: typeof TIMELINE_ELEMENT_DOCUMENT_CHANGE;
  bool: boolean;
}

export interface PostTimelineElementSuccess {
  type: typeof POST_TIMELINE_ELEMENT_SUCCESS;
  elements: FlowElement[];
}

export interface SetTimelineNode {
  type: typeof SET_TIMELINE_NODE;
  id: string;
}

export interface ChangeTimelineNodeKey {
  type: typeof CHANGE_TIMELINE_NODE_KEY;
  val: TimelineNode[keyof TimelineNode];
  attr: keyof TimelineNode;
}

export interface PutTimelineElementSuccess {
  type: typeof PUT_TIMELINE_ELEMENT_SUCCESS;
  element: FlowElement;
}

export interface DeleteTimelineElementsSuccess {
  type: typeof DELETE_TIMELINE_ELEMENTS_SUCCESS;
  elements: string[];
}

export type TimelineActions =
  | NotifyActions
  | ChangeTags
  | TitleChange
  | ShareOrgChange
  | DescriptionChange
  | AddGroup
  | ShowHandlesChange
  | FailedEvents
  | LoadingEvents
  | GetTimelinesSuccess
  | PostTimelineSuccess
  | SetTimelineNode
  | ChangeTimelineNodeKey
  | ShowTimelineSuccess
  | PutTimelineSuccess
  | CreateElementChange
  | TimelineElementPersonChange
  | PostTimelineElementSuccess
  | TimelineElementDocumentChange
  | PutTimelineElementSuccess
  | DeleteTimelineElementsSuccess
  | DeleteTimelineSuccess;
