/* eslint-disable camelcase */

export enum WhereInApp {
  workspace = "workspace",
  condition = "condition",
  alert = "alert",
  output = "output",
  node = "node",
  relationship = "relationship",
  group = "group",
  timeline = "timeline",
  timelinePerson = "timelinePerson",
  timelineDocument = "timelineDocument",
}

export interface SelectOptions {
  value: string;
  label: string | JSX.Element;
}

export type setBoolState = React.Dispatch<React.SetStateAction<boolean>>;

export interface RGBA {
  r: string;
  g: string;
  b: string;
  a: string;
}

export interface SelectChoice {
  value: string;
  label: string;
  __isNew__: boolean;
}
