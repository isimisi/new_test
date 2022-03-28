import IImmutableStateMap from "@customTypes/immutable";
import { List } from "immutable";
import { AlertAndOutputCondition } from "./conditions";
import { GroupDropdown } from "./groups";
import { TagDeconstructedOnOtherElements } from "./tags";

export type AlertTabelArray = [
  string,
  TagDeconstructedOnOtherElements,
  string,
  string,
  string
];

export interface AlertState {
  alerts: List<AlertTabelArray>;
  title: string;
  description: string;
  group: string;
  alertConditions: List<unknown>;
  message: string;
  groupsDropDownOptions: List<GroupDropdown>;
  conditionsDropDownOptions: List<AlertAndOutputCondition>;
  alertTags: List<unknown>;
}

export type IImmutableAlertState = IImmutableStateMap<AlertState>;
