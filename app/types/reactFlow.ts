import { RGBA } from "./data";

export interface NodeDropdownInstance {
  id: number;
  label: string;
  description: string;
  style: any; // TODO: fix later
  attributes: any; // TODO: fix later
}

export enum ContextTypes {
  Node = "node",
  Pane = "pane",
  Edge = "edge",
  Selection = "selection",
}

export interface EdgeData {
  relationship_id: string;
  relationshipLabel: string;
  relationshipValue: string;
  relationshipColor: RGBA;
  relationshipType: string | null;
  showArrow: boolean;
  animatedLine: boolean;
  showLabel: boolean;
  lineThrough: boolean;
  source: string | null;
  target: string | null;
  sourceHandle: string | null;
  targetHandle: string | null;
}

export interface ConditionEdgeData {
  relationship_id: string;
  relationshipLabel: string;
  comparisonType: string;
  comparisonValue: string;
  relationshipType: string;
  source: string | null;
  target: string | null;
  sourceHandle: string | null;
  targetHandle: string | null;
}
