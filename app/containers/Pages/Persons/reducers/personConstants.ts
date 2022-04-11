import { Tag } from "@customTypes/reducers/tags";

export const GET_ALERTS_SUCCESS = "GET_ALERTS_SUCCESS";
export const GET_ALERTS_FAILED = "GET_ALERTS_FAILED";

export const TITLE_CHANGE = "TITLE_CHANGE";
export const DESCRIPTION_CHANGE = "DESCRIPTION_CHANGE";
export const ADD_GROUP = "ADD_GROUP";
export const CHANGE_TAGS = "CHANGE_TAGS";

export interface GetAlertsSuccess {
  type: typeof GET_ALERTS_SUCCESS;
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

export type PersonActions = ChangeTags | TitleChange | DescriptionChange | AddGroup;
