import IImmutableStateMap from "@customTypes/immutable";

export interface Timeline {
  id: number;
  label: string;
  description: string;
  is_private: number;
  type: string;
}

export interface elementCount {
  alerts: number;
  attributes: number;
  conditions: number;
  groups: number;
  nodes: number;
  outputs: number;
  relationships: number;
  workspaces: number;
}

export interface DashboardState {
  elementCounts: elementCount;
  timeline: Timeline[];
  message: string;
  runIntro: boolean;
  introStepIndex: number;
  notifications: any;
}

export type IImmutableDashboardState = IImmutableStateMap<DashboardState>;
