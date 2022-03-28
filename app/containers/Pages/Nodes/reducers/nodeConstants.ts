import { GroupDropdown } from "@customTypes/reducers/groups";
import { Attribut } from "@customTypes/reducers/node";
import { NotifyActions } from "@redux/constants/notifConstants";

// API
export const GET_NODES_LOADING = "GET_NODES_LOADING";
export const GET_NODES_SUCCESS = "GET_NODES_SUCCESS";
export const GET_NODES_FAILED = "GET_NODES_FAILED";
export const POST_NODE_SUCCESS = "POST_NODE_SUCCESS";
export const POST_NODE_FAILED = "POST_NODE_FAILED";
export const SHOW_NODE_SUCCESS = "SHOW_NODE_SUCCESS";
export const SHOW_NODE_FAILED = "SHOW_NODE_FAILED";
export const PUT_NODE_SUCCESS = "PUT_NODE_SUCCESS";
export const PUT_NODE_FAILED = "PUT_NODE_FAILED";
export const DELETE_NODE_SUCCESS = "DELETE_NODE_SUCCESS";
export const DELETE_NODE_FAILED = "DELETE_NODE_FAILED";
export const GET_ATTRIBUTE_DROPDOWN_SUCCESS = "GET_ATTRIBUTE_DROPDOWN_SUCCESS";
export const GET_ATTRIBUTE_DROPDOWN_FAILED = "GET_ATTRIBUTE_DROPDOWN_FAILED";
export const GET_GROUP_DROPDOWN_SUCCESS = "GET_GROUP_DROPDOWN_SUCCESS";
export const GET_GROUP_DROPDOWN_FAILED = "GET_GROUP_DROPDOWN_FAILED";

export const TITLE_CHANGE = "TITLE_CHANGE";
export const DESCRIPTION_CHANGE = "DESCRIPTION_CHANGE";
export const ADD_ATTRIBUT = "ADD_ATTRIBUT";
export const REMOVE_ATTRIBUT = "REMOVE_ATTRIBUT";
export const ADD_GROUP = "ADD_GROUP";

// STYLE
export const CHANGE_SIZE = "CHANGE_SIZE";
export const CHANGE_BACKGROUND_COLOR = "CHANGE_BACKGROUND_COLOR";
export const CHANGE_BORDER_COLOR = "CHANGE_BORDER_COLOR";

export interface GetNodesLoading {
  type: typeof GET_NODES_LOADING;
}
export interface GetNodesSuccess {
  type: typeof GET_NODES_SUCCESS;
  nodes: Node[];
}
export interface GetNodesFailed {
  type: typeof GET_NODES_FAILED;
  message: string;
}

export interface PostNodesSuccess {
  type: typeof POST_NODE_SUCCESS;
}
export interface PostNodeFailed {
  type: typeof POST_NODE_FAILED;
  message: string;
}

export interface ShowNodesSuccess {
  type: typeof SHOW_NODE_SUCCESS;
  title: string;
  description: string;
  backgroundColor: string;
  borderColor: string;
  size: number;
  group: string;
  attributes: Attribut[];
}

export interface ShowNodeFailed {
  type: typeof SHOW_NODE_FAILED;
  message: string;
}

export interface PutNodeSuccess {
  type: typeof PUT_NODE_SUCCESS;
  message: string;
}
export interface PutNodeFailed {
  type: typeof PUT_NODE_FAILED;
  message: string;
}

export interface DeleteNodeSuccess {
  type: typeof DELETE_NODE_SUCCESS;
  message: string;
}
export interface DeleteNodeFailed {
  type: typeof DELETE_NODE_FAILED;
  message: string;
}

export interface GetAttributeDropdownSuccess {
  type: typeof GET_ATTRIBUTE_DROPDOWN_SUCCESS;
  attributes: [];
}
export interface GetAttributeDropdownFailed {
  type: typeof GET_ATTRIBUTE_DROPDOWN_FAILED;
  message: string;
}

export interface GetGroupDropdownSuccess {
  type: typeof GET_GROUP_DROPDOWN_SUCCESS;
  groups: GroupDropdown[];
}
export interface GetGroupDropdownFailed {
  type: typeof GET_GROUP_DROPDOWN_FAILED;
  message: string;
}

export interface titleChange {
  type: typeof TITLE_CHANGE;
  title: string;
}

export interface descriptionChange {
  type: typeof DESCRIPTION_CHANGE;
  description: string;
}

export interface addAttribut {
  type: typeof ADD_ATTRIBUT;
  attributes: any; // TODO:
}
export interface removeAttribut {
  type: typeof REMOVE_ATTRIBUT;
  index: number;
  id: number;
}

export interface addGroup {
  type: typeof ADD_GROUP;
  group: string;
}

export interface changeSize {
  type: typeof CHANGE_SIZE;
  size: number;
}
export interface changeBackgroundColor {
  type: typeof CHANGE_BACKGROUND_COLOR;
  color: string;
}

export interface changeBorderColor {
  type: typeof CHANGE_BORDER_COLOR;
  color: string;
}

export type NodeActions =
  | GetNodesLoading
  | GetNodesSuccess
  | GetNodesFailed
  | PostNodesSuccess
  | PostNodeFailed
  | ShowNodesSuccess
  | ShowNodeFailed
  | PutNodeSuccess
  | PutNodeFailed
  | DeleteNodeSuccess
  | DeleteNodeFailed
  | GetAttributeDropdownSuccess
  | GetAttributeDropdownFailed
  | GetGroupDropdownSuccess
  | GetGroupDropdownFailed
  | titleChange
  | descriptionChange
  | addAttribut
  | removeAttribut
  | addGroup
  | changeSize
  | changeBackgroundColor
  | changeBorderColor
  | NotifyActions;
