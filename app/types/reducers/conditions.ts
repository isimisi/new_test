import IImmutableStateMap from "@customTypes/immutable";
import { List } from "immutable";
import { GroupDropdown } from "./groups";
import { TagDeconstructedOnOtherElements } from "./tags";

export type ConditionTableOptions = [
  string,
  TagDeconstructedOnOtherElements,
  string,
  string,
  string
];

export interface NodeAttribute {
  label: string;
  value: string;
}

export interface RelationshipLabel {
  label: string;
  value: string;
}

export interface Element {
  id: string;
  type: string;
  data: {
    label: string;
    conditionValues: [];
  };
  position: {
    x: number;
    y: number;
  };
}

export interface AlertAndOutputCondition {
  id?: string;
  label: string;
  value: string;
}

export interface Node {
  id: number;
  label: string;
  description: string;
  style: string;
  atributtes: any[];
}

export interface ConditionState {
  loading: boolean;
  conditions: List<ConditionTableOptions>;
  label: "";
  description: "";
  group: "";
  elements: List<Element>;
  message: "";
  groupsDropDownOptions: List<GroupDropdown>;
  nodeAttributes: List<NodeAttribute>;
  relationshipLabels: List<RelationshipLabel>;
  nodes: List<Node>;
  relationships: List<unknown>;
  conditionTags: List<unknown>;
}

export type IImmutableConditionState = IImmutableStateMap<ConditionState>;
