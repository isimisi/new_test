import IImmutableStateMap from "@customTypes/immutable";

import { List } from "immutable";
import { AlertAndOutputCondition } from "./conditions";
import { GroupDropdown } from "./groups";
import { TagDeconstructedOnOtherElements } from "./tags";

export type OutputTableOptions = [
  string,
  string,
  TagDeconstructedOnOtherElements,
  string,
  number,
  string,
  string
];

export interface OutputState {
  outputs: List<OutputTableOptions>;
  outputFile: any;
  title: string;
  description: string;
  outputType: string;
  group: string;
  outputConditions: List<unknown>;
  message: string;
  editorState: any;
  conditionsDropDownOptions: List<AlertAndOutputCondition>;
  groupsDropDownOptions: List<GroupDropdown>;
  outputTags: List<unknown>;
}

export type IImmutableOutputState = IImmutableStateMap<OutputState>;
