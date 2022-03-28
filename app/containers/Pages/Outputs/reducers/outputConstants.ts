import { AlertAndOutputCondition } from "@customTypes/reducers/conditions";
import { OutputTableOptions } from "@customTypes/reducers/output";
import { Tag } from "@customTypes/reducers/tags";
import { NotifyActions } from "@redux/constants/notifConstants";

// API
export const GET_OUTPUTS_SUCCESS = "GET_OUTPUTS_SUCCESS";
export const GET_OUTPUTS_FAILED = "GET_OUTPUTS_FAILED";
export const POST_OUTPUT_SUCCESS = "POST_OUTPUT_SUCCESS";
export const POST_OUTPUT_FAILED = "POST_OUTPUT_FAILED";
export const SHOW_OUTPUT_SUCCESS = "SHOW_OUTPUT_SUCCESS";
export const SHOW_OUTPUT_FAILED = "SHOW_OUTPUT_FAILED";
export const PUT_OUTPUT_SUCCESS = "PUT_OUTPUT_SUCCESS";
export const PUT_OUTPUT_FAILED = "PUT_OUTPUT_FAILED";
export const DELETE_OUTPUT_SUCCESS = "DELETE_OUTPUT_SUCCESS";
export const DELETE_OUTPUT_FAILED = "DELETE_OUTPUT_FAILED";

export const GET_CONDITION_DROPDOWN_SUCCESS = "GET_CONDITION_DROPDOWN_SUCCESS";
export const GET_CONDITION_DROPDOWN_FAILED = "GET_CONDITION_DROPDOWN_FAILED";
export const GET_GROUP_DROPDOWN_SUCCESS = "GET_GROUP_DROPDOWN_SUCCESS";
export const GET_GROUP_DROPDOWN_FAILED = "GET_GROUP_DROPDOWN_FAILED";

export const TITLE_CHANGE = "TITLE_CHANGE";
export const DESCRIPTION_CHANGE = "DESCRIPTION_CHANGE";
export const ADD_OUTPUT = "ADD_OUTPUT";
export const ADD_GROUP = "ADD_GROUP";
export const FILE_TYPE_CHANGE = "FILE_TYPE_CHANGE";
export const EDITOR_STATE_CHANGE = "EDITOR_STATE_CHANGE";
export const ADD_OUTPUT_URL = "ADD_OUTPUT_URL";

export const OUTPUT_ADD_CONDITION = "OUTPUT_ADD_CONDITION";
export const OUTPUT_CHANGE_CONDITION = "OUTPUT_CHANGE_CONDITION";
export const OUTPUT_DELETE_CONDITION = "OUTPUT_DELETE_CONDITION";
export const CHANGE_TAGS = "CHANGE_TAGS";

export interface GetOutputSuccess {
  type: typeof GET_OUTPUTS_SUCCESS;
  outputs: OutputTableOptions[];
}

export interface GetOutputFailed {
  type: typeof GET_OUTPUTS_FAILED;
  message: string;
}

export interface PostOutputSuccess {
  type: typeof POST_OUTPUT_SUCCESS;
}

export interface PostOutputFailed {
  type: typeof POST_OUTPUT_FAILED;
  message: string;
}

export interface ShowOutputSuccess {
  type: typeof SHOW_OUTPUT_SUCCESS;
  label: string;
  description: string;
  output: string;
  conditions: AlertAndOutputCondition[];
  group: string;
  file_type: string;
  output_type: string;
  tags: Tag[];
}

export interface ShowOutputFailed {
  type: typeof SHOW_OUTPUT_FAILED;
  message: string;
}

export interface PutOutputSuccess {
  type: typeof PUT_OUTPUT_SUCCESS;
  message: string;
}

export interface PutOutputFailed {
  type: typeof PUT_OUTPUT_FAILED;
  message: string;
}

export interface DeleteOutputSuccess {
  type: typeof DELETE_OUTPUT_SUCCESS;
  message: string;
}

export interface DeleteOutputFailed {
  type: typeof DELETE_OUTPUT_FAILED;
  message: string;
}

export interface GetConditionDropdownSuccess {
  type: typeof GET_CONDITION_DROPDOWN_SUCCESS;
  conditions: AlertAndOutputCondition[];
}

export interface GetConditionDropdownFailed {
  type: typeof GET_CONDITION_DROPDOWN_FAILED;
  message: string;
}

export interface GetGroupDropdownSuccess {
  type: typeof GET_GROUP_DROPDOWN_SUCCESS;
  groups: string;
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

export interface addOutput {
  type: typeof ADD_OUTPUT;
  file: any; // TODO:
}

export interface addGroup {
  type: typeof ADD_GROUP;
  group: string;
}

export interface fileTypeChange {
  type: typeof FILE_TYPE_CHANGE;
  fileType: any; // TODO:
}

export interface editorStateChange {
  type: typeof EDITOR_STATE_CHANGE;
  editor: any;
}

export interface addOutputUrl {
  type: typeof ADD_OUTPUT_URL;
  url: any;
}

export interface outputAddCondition {
  type: typeof OUTPUT_ADD_CONDITION;
  condition: any;
}

export interface outputChangeCondition {
  type: typeof OUTPUT_CHANGE_CONDITION;
  condition: any;
  index: any;
}

export interface outputDeleteConditions {
  type: typeof OUTPUT_DELETE_CONDITION;
  index: string;
}

export interface changeTags {
  type: typeof CHANGE_TAGS;
  tags: Tag[];
}

export type OutputActions =
  | GetOutputSuccess
  | GetOutputFailed
  | PostOutputSuccess
  | PostOutputFailed
  | ShowOutputSuccess
  | ShowOutputFailed
  | PutOutputSuccess
  | PutOutputFailed
  | DeleteOutputSuccess
  | DeleteOutputFailed
  | GetConditionDropdownSuccess
  | GetConditionDropdownFailed
  | GetGroupDropdownSuccess
  | GetGroupDropdownFailed
  | titleChange
  | descriptionChange
  | addOutput
  | addGroup
  | fileTypeChange
  | editorStateChange
  | addOutputUrl
  | outputAddCondition
  | outputChangeCondition
  | outputDeleteConditions
  | changeTags
  | NotifyActions;
