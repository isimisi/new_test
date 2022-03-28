import IImmutableStateMap from "@customTypes/immutable";
import { List } from "immutable";
import { GroupDropdown } from "./groups";

export type NodeTableOptions = [string, string, string, string, string];

export interface Attribut {
  label: null;
  value: string;
  type?: "Value" | "Selection";
}

export interface NodeState {
  loading: false;
  nodes: List<NodeTableOptions>;
  title: string;
  description: string;
  attributes: List<unknown>;
  deletedAttributes: List<unknown>;
  group: string;
  size: string;
  backgroundColor: any;
  borderColor: any;
  message: string;
  attributesDropDownOptions: List<Attribut>;
  groupsDropDownOptions: List<GroupDropdown>;
}

export type IImmutableNodeState = IImmutableStateMap<NodeState>;
