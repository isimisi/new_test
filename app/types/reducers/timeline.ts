import IImmutableStateMap from "@customTypes/immutable";
import { List } from "immutable";
import { FlowElement } from "react-flow-renderer";

export interface TimelineState {
  timelines: List<unknown>;
  message: string;
  elements: List<FlowElement>;
  handleVisability: boolean;
  initialLoading: boolean;
  label: string;
}

export type IImmutableTimelineState = IImmutableStateMap<TimelineState>;
