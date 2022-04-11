import { Tag } from "@customTypes/reducers/tags";
import { NotifyActions } from "@redux/constants/notifConstants";
import { FlowElement } from "react-flow-renderer";

export const GET_TIMELINES_SUCCESS = "GET_TIMELINES_SUCCESS";
export const GET_TIMELINES_FAILED = "GET_TIMELINES_FAILED";

export const POST_TIMELINE_LOADING = "POST_TIMELINE_LOADING";
export const POST_TIMELINE_SUCCESS = "POST_TIMELINE_SUCCESS";
export const POST_TIMELINE_FAILED = "POST_TIMELINE_FAILED";

export const TITLE_CHANGE = "TITLE_CHANGE";
export const DESCRIPTION_CHANGE = "DESCRIPTION_CHANGE";
export const ADD_GROUP = "ADD_GROUP";
export const CHANGE_TAGS = "CHANGE_TAGS";

// CONTROL
export const SHOW_HANDLES_CHANGE = "SHOW_HANDLES_CHANGE";

export interface ShowHandlesChange {
  type: typeof SHOW_HANDLES_CHANGE;
  bool: boolean;
}

export interface GetAlertsSuccess {
  type: typeof GET_TIMELINES_SUCCESS;
  alerts: any; // PersonTabelArray[];
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

export type TimelineActions =
  | NotifyActions
  | ChangeTags
  | TitleChange
  | DescriptionChange
  | AddGroup
  | ShowHandlesChange;
