import IImmutableStateMap from "@customTypes/immutable";
import { List } from "immutable";

export interface GroupDropdown {
  value: string;
  label: string;
}

export interface Group {
  created_at: string;
  description: string;
  id: number;
  image: string;
  organization_id: number;
  title: string;
  updated_at: string;
}

export interface GroupState {
  groups: List<Group>;
  activeGroup: any;
  keywordValue: string;
  title: string;
  description: string;
  image: List<unknown>;
  message: string;
}

export type IImmutableGroupState = IImmutableStateMap<GroupState>;
