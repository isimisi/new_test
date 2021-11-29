/* eslint-disable camelcase */
export interface Tag {
    emoji: string;
    emoji_name: string;
    name: string;
    id: number;
    workspaceTags: Array<any>;
    active: boolean
}

export enum WhereInApp {
  workspace = 'workspace',
  condition = 'condition',
  alert = 'alert',
  output = 'output',
  node = 'node',
  relationship = 'relationship',
  group = 'group',
}
