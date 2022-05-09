import IImmutableStateMap from "@customTypes/immutable";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import { List, Map } from "immutable";
import { FlowElement } from "react-flow-renderer";
import { MixedDocumentOptions } from "./document";
import { MixedPersonOptions } from "./person";
import { TagDeconstructedOnOtherElements } from "./tags";

export interface Loadings {
  main: boolean;
  post: boolean;
  modal: boolean;
}

interface ILoadings extends Map<string, any> {
  toJS(): Loadings;
  get<K extends keyof Loadings>(key: K): Loadings[K];
}

export interface TimelineNode {
  id: string;
  title: string;
  description: string;

  date: MaterialUiPickersDate | null;
  persons: MixedPersonOptions[];
  documents: MixedDocumentOptions[];
  tags: any[];
}

interface ITimelineNode extends Map<string, any> {
  toJS(): TimelineNode;
  get<K extends keyof TimelineNode>(key: K): TimelineNode[K];
}

export type TimelineTableOptions = List<
  [string, string, TagDeconstructedOnOtherElements, string, string, string, string]
>;

export interface TimelineState {
  timelines: List<TimelineTableOptions>;
  message: string;
  elements: List<FlowElement>;
  handleVisability: boolean;
  createElementOpen: boolean;
  title: string;
  description: string;
  group: string;
  shareOrg: boolean;
  specificTimelineTags: List<unknown>;
  loadings: ILoadings;
  personOpen: boolean;
  documentOpen: boolean;
  timelineNode: ITimelineNode;
  isUpdatingNode: boolean;
}

export type IImmutableTimelineState = IImmutableStateMap<TimelineState>;
