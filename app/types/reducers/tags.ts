import IImmutableStateMap from "@customTypes/immutable";
import { List } from "immutable";

export interface Tag {
  emoji: string;
  emoji_name: string;
  name: string;
  id: number;
  actionTags?: Array<any>;
  workspaceTags?: Array<any>;
  alertTags?: Array<any>;
  conditionTags?: Array<any>;
  active: boolean;
}

export interface TagSelectOption {
  value: string;
  label: JSX.Element;
  __isNew__?: boolean;
}

export interface TagCleanOption {
  id: string;
  emoji: string;
  name: string;
}

export type MixedTagOptions = TagSelectOption | TagCleanOption;

interface TagForDeconstruction {
  id: number;
  name: string;
  emoji: string;
  emoji_name?: any;
  organization_id: number;
  created_at: string;
  updated_at: string;
}

export interface TagDeconstructedOnOtherElements {
  id: number;
  tag_id: number;
  alert_id: number;
  created_at: string;
  updated_at: string;
  tag: TagForDeconstruction;
}

export interface TagState {
  tags: List<Tag>;
  message: string;
}

export type IImmutableTagState = IImmutableStateMap<TagState>;
