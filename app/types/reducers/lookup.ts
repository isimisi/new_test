import IImmutableStateMap from "@customTypes/immutable";
import { List } from "immutable";

export interface LookupState {
  lookups: List<unknown>;
  loading: boolean;
  message: string;
  company: any;
}

export type IImmutableLookupState = IImmutableStateMap<LookupState>;
