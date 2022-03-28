import IImmutableStateMap from "@customTypes/immutable";
import { List } from "immutable";
import { FlowElement } from "react-flow-renderer";
import { AttributeDropdown } from "./attribute";
import { GroupDropdown } from "./groups";
import { TagDeconstructedOnOtherElements } from "./tags";

export interface WorkspaceRelationship {
  id: number;
  label: string;
  description: string;
  style: React.CSSProperties;
  values: string[];
  use_suggestions: number | 1;
}

export type WorkspaceTableOptions = [
  string,
  string,
  TagDeconstructedOnOtherElements,
  string,
  string,
  string,
  string
];

export interface WorkspaceState {
  loading: boolean;
  initialLoading: boolean;
  initialLoadingCvr: boolean;
  workspaces: List<WorkspaceTableOptions>;
  label: string;
  description: string;
  group: string;
  shareOrg: boolean;
  signed: boolean;
  signedBy: string;
  editable: boolean;
  elements: List<FlowElement>;
  message: string;
  groupsDropDownOptions: List<GroupDropdown>;
  attributesDropDownOptions: List<AttributeDropdown>;
  relationships: List<WorkspaceRelationship>;
  nodes: List<unknown>;
  handleVisability: boolean;
  zoom: number;
  xPosition: number;
  yPosition: number;
  alerts: List<unknown>;
  alertId: null;
  alertOpen: boolean;
  outputs: List<unknown>;
  companyData: any;
  publicAuthenticated: boolean;
  publicUserFirstName: string;
  publicUserLastName: string;
  publicAuthenticatedId: null;
  revisionHistory: any;
  hasVisitedPublic: boolean;
  showCompanyData: boolean;
  addressInfo: any;
  showAddressInfo: boolean;
  runIntro: boolean;
  introStepIndex: number;
  uncertainCompanies: List<unknown>;
  specificWorkspaceTags: List<unknown>;
  connectedUsers: List<unknown>;
  showInternationalDisclaimer: boolean;
}

export type IImmutableWorkspaceState = IImmutableStateMap<WorkspaceState>;
