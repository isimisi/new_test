import IImmutableStateMap from "@customTypes/immutable";
import { List } from "immutable";
import { Edge, Node as rfNode } from "react-flow-renderer";
import { GroupDropdown } from "./groups";
import { TagDeconstructedOnOtherElements } from "./tags";

export interface Attribut {
  created_at: string;
  description: string;
  group_id: number;
  id: number;
  label: string;
  organization_id: number;
  selectionOptions: string | null;
  type: string;
  updated_at: string;
}

export interface ConditionValue {
  attribut: Attribut;
  attribut_id: number;
  comparison_type: string;
  comparison_value: string;
  condition_node_id: number;
  created_at: string;
  id: number;
  updated_at: string;
}

export type NodeData = {
  label: string;
  conditionValues: ConditionValue[];
};

export type TCustomNode = rfNode<NodeData>;

export type EdgeData = {
  relationship_id: string;
  relationshipLabel: string;
  comparisonType: string;
  comparisonValue: string;
  relationshipType: string;
  source: string | null;
  target: string | null;
  sourceHandle: string | null;
  targetHandle: string | null;
};

export type TCustomEdge = Edge<EdgeData>;

export type ConditionTableOptions = [
  string,
  TagDeconstructedOnOtherElements,
  string,
  string,
  string
];

export interface HistoryState {
  fromContent?: boolean;
  place?: string;
  placeId?: string;
}

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

export interface ConditionValueSelector {
  conditionNodeValueId?: number;
  attribut: string | null;
  comparison_type: string;
  comparison_value: string;
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
  nodeElements: List<TCustomNode>;
  edgeElements: List<TCustomEdge>;
  message: "";
  groupsDropDownOptions: List<GroupDropdown>;
  nodeAttributes: List<NodeAttribute>;
  relationshipLabels: List<RelationshipLabel>;
  nodes: List<Node>;
  relationships: List<unknown>;
  conditionTags: List<unknown>;
  mouseLoading: boolean;
}

export type IImmutableConditionState = IImmutableStateMap<ConditionState>;
