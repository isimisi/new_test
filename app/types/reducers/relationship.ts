import { SelectOptions } from "@customTypes/data";
import IImmutableStateMap from "@customTypes/immutable";
import { List } from "immutable";
import { GroupDropdown } from "./groups";

export type RelationshipTableOptions = [string, string, string, string, string];

export interface RelationshipState {
  relationships: List<RelationshipTableOptions>;
  label: string;
  values: List<SelectOptions>;
  description: string;
  type: string;
  group: string;
  size: string;
  color: any;
  message: string;
  groupsDropDownOptions: List<GroupDropdown>;
  useSuggestions: true;
}

export type IImmutableRelationshipState = IImmutableStateMap<RelationshipState>;
