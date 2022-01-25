/* eslint-disable camelcase */
export interface Tag {
  emoji: string;
  emoji_name: string;
  name: string;
  id: number;
  workspaceTags: Array<any>;
  active: boolean;
}

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
