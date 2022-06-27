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
  mouse: boolean;
  modal: boolean;
}

interface ILoadings extends Map<string, any> {
  toJS(): Loadings;
  get<K extends keyof Loadings>(key: K): Loadings[K];
}

export interface Mail {
  mail: any;
  uri: string | null;
  index: number | null;
  customSplit: string | null;
}

interface IMail extends Map<string, any> {
  toJS(): Mail;
  get<K extends keyof Mail>(key: K): Mail[K];
}

export interface TimelineNode {
  id: string;
  title: string;
  description: string;
  content: any;
  email: IMail;
  date: MaterialUiPickersDate | null;
  time: MaterialUiPickersDate | null;
  persons: List<MixedPersonOptions>;
  documents: List<MixedDocumentOptions>;
  tags: any[];
}

export interface ITimelineNode extends Map<string, any> {
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
  goThroughSplitOpen: boolean;
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
  emailOpen: boolean;
  view: "horizontal" | "vertical";
  currSplittingEmail: string | null;
  currSplittingNodeRefference: string | null;
  splitElements: List<string>;
}

export type IImmutableTimelineState = IImmutableStateMap<TimelineState>;
