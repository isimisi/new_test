import IImmutableStateMap from "@customTypes/immutable";
import { List } from "immutable";

export interface PersonState {
  persons: List<unknown>;
}

export type IImmutablePersonState = IImmutableStateMap<PersonState>;
