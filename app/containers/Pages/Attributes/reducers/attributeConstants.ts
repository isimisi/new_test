import { SelectOptions } from "@customTypes/data";
import { AttributTableArray } from "@customTypes/reducers/attribute";
import { GroupDropdown } from "@customTypes/reducers/groups";
import { NotifyActions } from "@redux/constants/notifConstants";

export const GET_ATTRIBUTES_LOADING = "GET_ATTRIBUTES_LOADING";
export const GET_ATTRIBUTES_SUCCESS = "GET_ATTRIBUTES_SUCCESS";
export const GET_ATTRIBUTES_FAILED = "GET_ATTRIBUTES_FAILED";
export const POST_ATTRIBUTE_SUCCESS = "POST_ATTRIBUTE_SUCCESS";
export const POST_ATTRIBUTE_FAILED = "POST_ATTRIBUTE_FAILED";
export const SHOW_ATTRIBUTE_SUCCESS = "SHOW_ATTRIBUTE_SUCCESS";
export const SHOW_ATTRIBUTE_FAILED = "SHOW_ATTRIBUTE_FAILED";
export const PUT_ATTRIBUTE_SUCCESS = "PUT_ATTRIBUTE_SUCCESS";
export const PUT_ATTRIBUTE_FAILED = "PUT_ATTRIBUTE_FAILED";
export const DELETE_ATTRIBUTE_SUCCESS = "DELETE_ATTRIBUTE_SUCCESS";
export const DELETE_ATTRIBUTE_FAILED = "DELETE_ATTRIBUTE_FAILED";
export const GET_GROUP_DROPDOWN_SUCCESS = "GET_GROUP_DROPDOWN_SUCCESS";
export const GET_GROUP_DROPDOWN_FAILED = "GET_GROUP_DROPDOWN_FAILED";

export const CURRENT_ATTRIBUTE = "CURRENT_ATTRIBUTE";
export const LABEL_CHANGE = "LABEL_CHANGE";
export const DESCRIPTION_CHANGE = "DESCRIPTION_CHANGE";
export const SELECTION_VALUES = "SELECTION_VALUES";
export const ADD_TYPE = "ADD_TYPE";
export const ADD_GROUP = "ADD_GROUP";

export interface GetAttributesLoading {
  type: typeof GET_ATTRIBUTES_LOADING;
}

export interface GetAttributeSuccess {
  type: typeof GET_ATTRIBUTES_SUCCESS;
  attributes: AttributTableArray[];
}

export interface GetAttributsFailed {
  type: typeof GET_ATTRIBUTES_FAILED;
  message: string;
}

export interface PostAttributeSuccess {
  type: typeof POST_ATTRIBUTE_SUCCESS;
  id: number;
}

export interface PostAttributeFailed {
  type: typeof POST_ATTRIBUTE_FAILED;
  message: string;
}

export interface ShowAttributeSuccess {
  type: typeof SHOW_ATTRIBUTE_SUCCESS;
  label: string;
  description: string;
  valueType: string;
  selectionOptions: SelectOptions[] | null;
  group: string;
}

export interface ShowAttributeFailed {
  type: typeof SHOW_ATTRIBUTE_FAILED;
  message: string;
}

export interface PutAttributeSuccess {
  type: typeof PUT_ATTRIBUTE_SUCCESS;
  message: string;
}

export interface PutAttributeFailed {
  type: typeof PUT_ATTRIBUTE_FAILED;
  message: string;
}

export interface DeleteAttributeSuccess {
  type: typeof DELETE_ATTRIBUTE_SUCCESS;
}

export interface DeleteAttributeFailed {
  type: typeof DELETE_ATTRIBUTE_FAILED;
}

export interface GetGroupDropdownSuccess {
  type: typeof GET_GROUP_DROPDOWN_SUCCESS;
  groups: GroupDropdown[];
}

export interface GetGroupDropdownFailed {
  type: typeof GET_GROUP_DROPDOWN_FAILED;
  message: string;
}

export interface changeCurrentAttribute {
  type: typeof CURRENT_ATTRIBUTE;
  id: number;
}

export interface labelChange {
  type: typeof LABEL_CHANGE;
  label: string;
}

export interface descriptionChange {
  type: typeof DESCRIPTION_CHANGE;
  description: string;
}

export interface changeSelectionValues {
  type: typeof SELECTION_VALUES;
  selectionOptions: SelectOptions[] | null;
}

export interface addType {
  type: typeof ADD_TYPE;
  value: string;
}

export interface addGroup {
  type: typeof ADD_GROUP;
  group: string;
}

export type AttributesActions =
  | GetAttributesLoading
  | GetAttributeSuccess
  | GetAttributsFailed
  | PostAttributeSuccess
  | PostAttributeFailed
  | ShowAttributeSuccess
  | ShowAttributeFailed
  | PutAttributeSuccess
  | PutAttributeFailed
  | DeleteAttributeSuccess
  | DeleteAttributeFailed
  | GetGroupDropdownSuccess
  | GetGroupDropdownFailed
  | changeCurrentAttribute
  | labelChange
  | descriptionChange
  | changeSelectionValues
  | addType
  | addGroup
  | NotifyActions;
