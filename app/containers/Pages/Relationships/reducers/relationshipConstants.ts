import { SelectOptions } from "@customTypes/data";
import { GroupDropdown } from "@customTypes/reducers/groups";
import { RelationshipTableOptions } from "@customTypes/reducers/relationship";
import { NotifyActions } from "@redux/constants/notifConstants";

// API
export const GET_RELATIONSHIPS_SUCCESS = "GET_RELATIONSHIPS_SUCCESS";
export const GET_RELATIONSHIPS_FAILED = "GET_RELATIONSHIPS_FAILED";
export const POST_RELATIONSHIP_SUCCESS = "POST_RELATIONSHIP_SUCCESS";
export const POST_RELATIONSHIP_FAILED = "POST_RELATIONSHIP_FAILED";
export const SHOW_RELATIONSHIP_SUCCESS = "SHOW_RELATIONSHIP_SUCCESS";
export const SHOW_RELATIONSHIP_FAILED = "SHOW_RELATIONSHIP_FAILED";
export const PUT_RELATIONSHIP_SUCCESS = "PUT_RELATIONSHIP_SUCCESS";
export const PUT_RELATIONSHIP_FAILED = "PUT_RELATIONSHIP_FAILED";
export const DELETE_RELATIONSHIP_SUCCESS = "DELETE_RELATIONSHIP_SUCCESS";
export const DELETE_RELATIONSHIP_FAILED = "DELETE_RELATIONSHIP_FAILED";
export const GET_GROUP_DROPDOWN_SUCCESS = "GET_GROUP_DROPDOWN_SUCCESS";
export const GET_GROUP_DROPDOWN_FAILED = "GET_GROUP_DROPDOWN_FAILED";

export const LABEL_CHANGE = "LABEL_CHANGE";
export const VALUES_CHANGE = "VALUES_CHANGE";
export const DESCRIPTION_CHANGE = "DESCRIPTION_CHANGE";
export const ADD_GROUP = "ADD_GROUP";
export const CHANGE_USE_SUGGESTION = "CHANGE_USE_SUGGESTION";

// STYLE
export const CHANGE_SIZE = "CHANGE_SIZE";
export const CHANGE_COLOR = "CHANGE_COLOR";

export interface GetRelationshipSuccess {
  type: typeof GET_RELATIONSHIPS_SUCCESS;
  relationships: RelationshipTableOptions[];
}

export interface GetRelationshipFailed {
  type: typeof GET_RELATIONSHIPS_FAILED;
  message: string;
}

export interface PostRelationshipSuccess {
  type: typeof POST_RELATIONSHIP_SUCCESS;
}

export interface PostRelationshipFailed {
  type: typeof POST_RELATIONSHIP_FAILED;
  message: string;
}

export interface ShowRelationshipSuccess {
  type: typeof SHOW_RELATIONSHIP_SUCCESS;
  label: string;
  description: string;
  color: string;
  relationshipType: string;
  size: number;
  group: string;
  values: SelectOptions[];
  use_suggestions: 0 | 1;
}

export interface ShowRelationshipFailed {
  type: typeof SHOW_RELATIONSHIP_FAILED;
  message: string;
}

export interface PutRelationshipSuccess {
  type: typeof PUT_RELATIONSHIP_SUCCESS;
  message: string;
}

export interface PutRelationshipFailed {
  type: typeof PUT_RELATIONSHIP_FAILED;
  message: string;
}

export interface DeleteRelationshipSuccess {
  type: typeof DELETE_RELATIONSHIP_SUCCESS;
  message: string;
}

export interface DeleteRelationshipFailed {
  type: typeof DELETE_RELATIONSHIP_FAILED;
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

export interface labelChange {
  type: typeof LABEL_CHANGE;
  label: string;
}

export interface valueChange {
  type: typeof VALUES_CHANGE;
  values: string;
}

export interface descriptionChange {
  type: typeof DESCRIPTION_CHANGE;
  description: string;
}

export interface addGroup {
  type: typeof ADD_GROUP;
  group: string;
}

export interface changeSize {
  type: typeof CHANGE_SIZE;
  size: number;
}

export interface changeColor {
  type: typeof CHANGE_COLOR;
  color: string;
}

export interface changeUseSuggestions {
  type: typeof CHANGE_USE_SUGGESTION;
}

export type RelationshipActions =
  | GetRelationshipSuccess
  | GetRelationshipFailed
  | PostRelationshipSuccess
  | PostRelationshipFailed
  | ShowRelationshipSuccess
  | ShowRelationshipFailed
  | PutRelationshipSuccess
  | PutRelationshipFailed
  | GetGroupDropdownSuccess
  | GetGroupDropdownFailed
  | DeleteRelationshipSuccess
  | DeleteRelationshipFailed
  | labelChange
  | valueChange
  | descriptionChange
  | addGroup
  | changeSize
  | changeColor
  | changeUseSuggestions
  | NotifyActions;
