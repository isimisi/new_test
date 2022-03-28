import { AlertTabelArray } from "@customTypes/reducers/alert";
import { AlertAndOutputCondition } from "@customTypes/reducers/conditions";
import { GroupDropdown } from "@customTypes/reducers/groups";
import { Tag } from "@customTypes/reducers/tags";
import { NotifyActions } from "@redux/constants/notifConstants";

// API
export const GET_ALERTS_SUCCESS = "GET_ALERTS_SUCCESS";
export const GET_ALERTS_FAILED = "GET_ALERTS_FAILED";
export const POST_ALERT_SUCCESS = "POST_ALERT_SUCCESS";
export const POST_ALERT_FAILED = "POST_ALERT_FAILED";
export const SHOW_ALERT_SUCCESS = "SHOW_ALERT_SUCCESS";
export const SHOW_ALERT_FAILED = "SHOW_ALERT_FAILED";
export const PUT_ALERT_SUCCESS = "PUT_ALERT_SUCCESS";
export const PUT_ALERT_FAILED = "PUT_ALERT_FAILED";
export const DELETE_ALERT_SUCCESS = "DELETE_ALERT_SUCCESS";
export const DELETE_ALERT_FAILED = "DELETE_ALERT_FAILED";
export const GET_GROUP_DROPDOWN_SUCCESS = "GET_GROUP_DROPDOWN_SUCCESS";
export const GET_GROUP_DROPDOWN_FAILED = "GET_GROUP_DROPDOWN_FAILED";
export const GET_CONDITION_DROPDOWN_SUCCESS = "GET_CONDITION_DROPDOWN_SUCCESS";
export const GET_CONDITION_DROPDOWN_FAILED = "GET_CONDITION_DROPDOWN_FAILED";

export const TITLE_CHANGE = "TITLE_CHANGE";
export const DESCRIPTION_CHANGE = "DESCRIPTION_CHANGE";
export const ADD_GROUP = "ADD_GROUP";
export const CHANGE_TAGS = "CHANGE_TAGS";

export const ALERT_ADD_CONDITION = "ADD_CONDITION";
export const ALERT_CHANGE_CONDITION = "CHANGE_CONDITION";
export const ALERT_DELETE_CONDITION = "DELETE_CONDITION";

export interface GetAlertsSuccess {
  type: typeof GET_ALERTS_SUCCESS;
  alerts: AlertTabelArray[];
}

export interface GetAlertsFailed {
  type: typeof GET_ALERTS_FAILED;
  message: string;
}

export interface PostAlertsSuccess {
  type: typeof POST_ALERT_SUCCESS;
}

export interface PostAlertsFailed {
  type: typeof POST_ALERT_FAILED;
  message: string;
}

export interface ShowAlertsSuccess {
  type: typeof SHOW_ALERT_SUCCESS;
  title: string;
  description: string;
  group: string;
  conditions: [];
  tags: [];
}

export interface ShowAlertsFailed {
  type: typeof SHOW_ALERT_FAILED;
  message: string;
}

export interface PutAlertsSuccess {
  type: typeof PUT_ALERT_SUCCESS;
  message: string;
}

export interface PutAlertsFailed {
  type: typeof PUT_ALERT_FAILED;
  message: string;
}

export interface DeleteAlertsSuccess {
  type: typeof DELETE_ALERT_SUCCESS;
  message: string;
}

export interface DeleteAlertsFailed {
  type: typeof DELETE_ALERT_FAILED;
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

export interface GetConditionDropdownSuccess {
  type: typeof GET_CONDITION_DROPDOWN_SUCCESS;
  conditions: AlertAndOutputCondition[];
}

export interface GetConditionDropdownFailed {
  type: typeof GET_CONDITION_DROPDOWN_FAILED;
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

export interface addGroup {
  type: typeof ADD_GROUP;
  group: string;
}

export interface changeTags {
  type: typeof CHANGE_TAGS;
  tags: Tag[];
}

export interface addCondition {
  type: typeof ALERT_ADD_CONDITION;
  condition: any; // TODO:
}

export interface changeCondition {
  type: typeof ALERT_CHANGE_CONDITION;
  condition: any; // TODO:
  index: number;
}

export interface deleteCondition {
  type: typeof ALERT_DELETE_CONDITION;
  index: number;
}

export type AlertActions =
  | GetAlertsSuccess
  | GetAlertsFailed
  | PostAlertsSuccess
  | PostAlertsFailed
  | ShowAlertsSuccess
  | ShowAlertsFailed
  | PutAlertsSuccess
  | PutAlertsFailed
  | DeleteAlertsSuccess
  | DeleteAlertsFailed
  | GetGroupDropdownSuccess
  | GetGroupDropdownFailed
  | GetConditionDropdownSuccess
  | GetConditionDropdownFailed
  | titleChange
  | descriptionChange
  | addGroup
  | changeTags
  | addCondition
  | changeCondition
  | deleteCondition
  | NotifyActions;
