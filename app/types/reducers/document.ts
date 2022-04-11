import IImmutableStateMap from "@customTypes/immutable";
import { List } from "immutable";

export interface DocumentState {
  documents: List<unknown>;
}

export type IImmutableDocumentState = IImmutableStateMap<DocumentState>;
