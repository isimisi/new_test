import { Tag } from "@customTypes/reducers/tags";
import {
  Loadings,
  TimelineTableOptions,
  TimelineNode,
  EmailsFromImport,
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

export const IMPORT_EMAILS_LOADING = "IMPORT_EMAILS_LOADING";
export const IMPORT_EMAILS_SUCCESS = "IMPORT_EMAILS_SUCCESS";
export const IMPORT_EMAILS_FAILED = "IMPORT_EMAILS_FAILED";

export const CUSTOM_SPLIT_LOADING = "CUSTOM_SPLIT_LOADING";
export const CUSTOM_SPLIT_SUCCESS = "CUSTOM_SPLIT_SUCCESS";
export const CUSTOM_SPLIT_FAILED = "CUSTOM_SPLIT_FAILED";

export const DOWNLOAD_DOCUMENT_LOADING = "DOWNLOAD_DOCUMENT_LOADING";
export const DOWNLOAD_DOCUMENT_SUCCESS = "DOWNLOAD_DOCUMENT_SUCCESS";
export const DOWNLOAD_DOCUMENT_FAILED = "DOWNLOAD_DOCUMENT_FAILED";

export const TITLE_CHANGE = "TITLE_CHANGE";
export const DESCRIPTION_CHANGE = "DESCRIPTION_CHANGE";
export const ADD_GROUP = "ADD_GROUP";
export const CHANGE_TAGS = "CHANGE_TAGS";
export const SHARE_ORG_CHANGE = "SHARE_ORG_CHANGE";

export const CHANGE_VIEW = "CHANGE_VIEW";

export const CREATE_ELEMENT_CHANGE = "CREATE_ELEMENT_CHANGE";
export const GO_THROUGH_SPLIT_CHANGE = "GO_THROUGH_SPLIT_CHANGE";
export const TIMELINE_ELEMENT_PERSON_CHANGE = "TIMELINE_ELEMENT_PERSON_CHANGE";
export const TIMELINE_ELEMENT_DOCUMENT_CHANGE = "TIMELINE_ELEMENT_DOCUMENT_CHANGE";

export const SET_TIMELINE_NODE = "SET_TIMELINE_NODE";
export const CHANGE_TIMELINE_NODE_KEY = "CHANGE_TIMELINE_NODE_KEY";

// CONTROL
export const SHOW_HANDLES_CHANGE = "SHOW_HANDLES_CHANGE";

export const OPEN_EMAIL_CHANGE = "OPEN_EMAIL_CHANGE";

export const SET_IS_UPDATING = "SET_IS_UPDATING";

export const ADD_CURR_SPLITTING_EMAIL = "ADD_CURR_SPLITTING_EMAIL";
export const ADD_EMAIL_SPLIT = "ADD_EMAIL_SPLIT";
export const REMOVE_EMAIL_SPLIT = "REMOVE_EMAIL_SPLIT";
export const CLEAR_SPLITTING = "CLEAR_SPLITTING";
export const VALIDATE_EMAILS_CLOSE = "VALIDATE_EMAILS_CLOSE";
export const OPEN_TAG = "OPEN_TAG";
export const CLOSE_TAG = "CLOSE_TAG";
export const FILTER_TIMELINE = "FILTER_TIMELINE";
export const CLEAR_FILTER = "CLEAR_FILTER";

type FailedTypes =
  | typeof GET_TIMELINES_FAILED
  | typeof POST_TIMELINE_FAILED
  | typeof SHOW_TIMELINE_FAILED
  | typeof PUT_TIMELINE_FAILED
  | typeof POST_TIMELINE_ELEMENT_FAILED
  | typeof PUT_TIMELINE_ELEMENT_FAILED
  | typeof IMPORT_EMAILS_FAILED
  | typeof DELETE_TIMELINE_ELEMENTS_FAILED
  | typeof CUSTOM_SPLIT_FAILED
  | typeof DOWNLOAD_DOCUMENT_FAILED
  | typeof DELETE_TIMELINE_FAILED;

type LoadingTypes =
  | typeof DOWNLOAD_DOCUMENT_LOADING
  | typeof GET_TIMELINES_LOADING
  | typeof POST_TIMELINE_LOADING
  | typeof CUSTOM_SPLIT_LOADING
  | typeof SHOW_TIMELINE_LOADING
  | typeof PUT_TIMELINE_LOADING
  | typeof IMPORT_EMAILS_LOADING
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
  message: string;
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

export interface GoThroughSplitChange {
  type: typeof GO_THROUGH_SPLIT_CHANGE;
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
  isVertical: boolean;
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
  elements: FlowElement[];
}

export interface OpenEmailChange {
  type: typeof OPEN_EMAIL_CHANGE;
  bool: boolean;
}

export interface ChangeView {
  type: typeof CHANGE_VIEW;
  direction: "vertical" | "horizontal";
  elements: FlowElement[];
}

export interface ImportEmailsSuccess {
  type: typeof IMPORT_EMAILS_SUCCESS;
  elements: FlowElement[];
  emails: EmailsFromImport[];
}

export interface SetIsUpdating {
  type: typeof SET_IS_UPDATING;
  bool: boolean;
}

export interface AddCurrSplittingEmail {
  type: typeof ADD_CURR_SPLITTING_EMAIL;
  email: string;
}

export interface AddEmailSplit {
  type: typeof ADD_EMAIL_SPLIT;
  splitElement: string;
}

export interface OpenTag {
  type: typeof OPEN_TAG;
  tag: string;
}

export interface CloseTag {
  type: typeof CLOSE_TAG;
}

export interface RemoveEmailSplit {
  type: typeof REMOVE_EMAIL_SPLIT;
  splitElement: string;
}

export interface ClearSplitting {
  type: typeof CLEAR_SPLITTING;
}

export interface ValidateEmailsClose {
  type: typeof VALIDATE_EMAILS_CLOSE;
}

export interface CustomSplitSuccess {
  type: typeof CUSTOM_SPLIT_SUCCESS;
  elements: FlowElement[];
}

export interface FilterTimeline {
  type: typeof FILTER_TIMELINE;
  filter: string;
}

export interface ClearFilter {
  type: typeof CLEAR_FILTER;
}

export interface DownloadDocumentSuccess {
  type: typeof DOWNLOAD_DOCUMENT_SUCCESS;
}

export type TimelineActions =
  | NotifyActions
  | SetIsUpdating
  | ChangeTags
  | TitleChange
  | ShareOrgChange
  | ImportEmailsSuccess
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
  | ChangeView
  | DownloadDocumentSuccess
  | DeleteTimelineElementsSuccess
  | OpenEmailChange
  | CustomSplitSuccess
  | DeleteTimelineSuccess
  | AddCurrSplittingEmail
  | AddEmailSplit
  | RemoveEmailSplit
  | GoThroughSplitChange
  | ValidateEmailsClose
  | OpenTag
  | CloseTag
  | ClearFilter
  | FilterTimeline
  | ClearSplitting;
