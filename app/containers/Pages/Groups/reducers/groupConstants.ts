import { Group } from "@customTypes/reducers/groups";
import { NotifyActions } from "@redux/constants/notifConstants";

// API
export const GET_GROUPS_SUCCESS = "GET_GROUPS_SUCCESS";
export const GET_GROUPS_FAILED = "GET_GROUPS_FAILED";
export const POST_GROUP_SUCCESS = "POST_GROUP_SUCCESS";
export const POST_GROUP_FAILED = "POST_GROUP_FAILED";
export const SHOW_GROUP_SUCCESS = "SHOW_GROUP_SUCCESS";
export const SHOW_GROUP_FAILED = "SHOW_GROUP_FAILED";
export const PUT_GROUP_SUCCESS = "PUT_GROUP_SUCCESS";
export const PUT_GROUP_FAILED = "PUT_GROUP_FAILED";
export const DELETE_GROUP_SUCCESS = "DELETE_GROUP_SUCCESS";
export const DELETE_GROUP_FAILED = "DELETE_GROUP_FAILED";

// OLD
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const SHOW_DETAIL_PRODUCT = "SHOW_DETAIL_PRODUCT";
export const TITLE_CHANGE = "TITLE_CHANGE";
export const DESCRIPTION_CHANGE = "DESCRIPTION_CHANGE";
export const IMAGE_CHANGE = "IMAGE_CHANGE";

export interface GetGroupSuccess {
  type: typeof GET_GROUPS_SUCCESS;
  groups: Group[];
}

export interface GetGroupFailed {
  type: typeof GET_GROUPS_FAILED;
  message: string;
}

export interface PostGroupSuccess {
  type: typeof POST_GROUP_SUCCESS;
  message: string;
}

export interface PostGroupFailed {
  type: typeof POST_GROUP_FAILED;
  message: string;
}

export interface ShowGroupSuccess {
  type: typeof SHOW_GROUP_SUCCESS;
  group: any; // TODO:
}

export interface ShowGroupFailed {
  type: typeof SHOW_GROUP_FAILED;
  message: string;
}

export interface PutGroupSuccess {
  type: typeof PUT_GROUP_SUCCESS;
}

export interface PutGroupFailed {
  type: typeof PUT_GROUP_FAILED;
  message: string;
}

export interface DeleteGroupSuccess {
  type: typeof DELETE_GROUP_SUCCESS;
  message: string;
}

export interface DeleteGroupFailed {
  type: typeof DELETE_GROUP_FAILED;
  message: string;
}

export interface SearchProduct {
  type: typeof SEARCH_PRODUCT;
  keyword: any; // TODO:
}

export interface ShowDetailProduct {
  type: typeof SHOW_DETAIL_PRODUCT;
}

export interface TitleChange {
  type: typeof TITLE_CHANGE;
  item: any; // TODO:
}

export interface DescriptionChange {
  type: typeof DESCRIPTION_CHANGE;
  item: any; // TODO:
}

export interface imageChange {
  type: typeof IMAGE_CHANGE;
  item: any; // TODO:
}

export type GroupActions =
  | GetGroupSuccess
  | GetGroupFailed
  | PostGroupSuccess
  | PostGroupFailed
  | ShowGroupSuccess
  | ShowGroupFailed
  | PutGroupSuccess
  | PutGroupFailed
  | DeleteGroupSuccess
  | DeleteGroupFailed
  | SearchProduct
  | ShowDetailProduct
  | TitleChange
  | DescriptionChange
  | imageChange
  | NotifyActions;
