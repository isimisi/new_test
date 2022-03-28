/* eslint-disable camelcase */

export enum WhereInApp {
  workspace = "workspace",
  condition = "condition",
  alert = "alert",
  output = "output",
  node = "node",
  relationship = "relationship",
  group = "group",
}

export interface SelectOptions {
  value: string;
  label: string | JSX.Element;
}

export type setBoolState = React.Dispatch<React.SetStateAction<boolean>>;

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface SelectChoice {
  value: string;
  label: string;
  __isNew__: boolean;
}
