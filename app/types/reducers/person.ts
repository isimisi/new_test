import IImmutableStateMap from "@customTypes/immutable";
import { List, Map } from "immutable";
import { GroupDropdown } from "./groups";
import { TagDeconstructedOnOtherElements } from "./tags";

export interface Loadings {
  main: boolean;
  post: boolean;
}

interface ILoadings extends Map<string, any> {
  toJS(): Loadings;
  get<K extends keyof Loadings>(key: K): Loadings[K];
}

export interface Person {
  id: number | null;
  name: string | null;
  person_icon: string | null;
  company: string | null;
  affiliation: string | null;
  email: string | null;
  phone: string | null;
  description: string | null;
  address: string | null;
  organization_id: number | null;
  group_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  group: string | null;
  tags: List<TagDeconstructedOnOtherElements[]>;
}

export interface PersonSelectOption {
  value: string | null;
  label: JSX.Element | null;
  __isNew__?: boolean;
}

export interface PersonCleanOption {
  id: string;
  icon: string;
  name: string;
}

export type MixedPersonOptions = PersonSelectOption | PersonCleanOption;

export interface IPerson extends Map<string, any> {
  toJS(): Person;
  get<K extends keyof Person>(key: K): Person[K];
}

export type PersonTableOptions = List<[string, string, string, string, string, string]>;

export interface PersonState {
  persons: List<PersonTableOptions>;
  loadings: ILoadings;
  personOptions: List<PersonCleanOption>;
  groupsDropDownOptions: List<GroupDropdown>;
  person: IPerson;
  message: string;
}

export type IImmutablePersonState = IImmutableStateMap<PersonState>;
