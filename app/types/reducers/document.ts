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

export interface Document {
  id: number | null;
  title: string | null;
  description: string | null;
  link: any;
  organization_id: number | null;
  group_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  group: string | null;
  file?: any;
  initial?: boolean;
  tags: List<TagDeconstructedOnOtherElements[]>;
}

export interface IDocument extends Map<string, any> {
  toJS(): Document;
  get<K extends keyof Document>(key: K): Document[K];
}

export interface DocumentSelectOption {
  value: string;
  label: JSX.Element;
  __isNew__?: boolean;
}

export interface DocumentCleanOption {
  id: string;
  title: string;
}

export type MixedDocumentOptions = DocumentSelectOption | DocumentCleanOption;

export type DocumentTableOptions = List<[string, string, string, string, string, string]>;

export interface DocumentState {
  documents: List<DocumentTableOptions>;
  loadings: ILoadings;
  message: string;
  documentOptions: List<DocumentCleanOption>;
  groupsDropDownOptions: List<GroupDropdown>;
  document: IDocument;
}

export type IImmutableDocumentState = IImmutableStateMap<DocumentState>;
