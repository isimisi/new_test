import { SelectOptions } from "@customTypes/data";
import IImmutableStateMap from "@customTypes/immutable";
import { List } from "immutable";
import { GroupDropdown } from "./groups";

export type AttributTableArray = [string, string, string, number, string];

export interface AttributState {
  loading: boolean;
  attributes: List<AttributTableArray>;
  message: string;
  id: null | string;
  label: string;
  description: string;
  type: "Value" | "Selection";
  selectionOptions: List<SelectOptions>;
  group: string;
  groupsDropDownOptions: List<GroupDropdown>;
}

export type IImmutableAttributState = IImmutableStateMap<AttributState>;

export interface AttributeDropdown {
  value: string;
  label: string;
}
