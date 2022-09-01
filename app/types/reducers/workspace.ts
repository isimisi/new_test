import { RGBA } from "@customTypes/data";
import IImmutableStateMap from "@customTypes/immutable";
import { List } from "immutable";
import { Edge, Node } from "react-flow-renderer";
import { AttributeDropdown } from "./attribute";
import { GroupDropdown } from "./groups";
import { TagDeconstructedOnOtherElements } from "./tags";

export type Attribut = {
  label: string | null;
  value: string | null;
  show?: boolean;
  workspace_node_attribut_id?: string;
  type?: string;
  selectionOptions?: string;
};

export type NodeData = {
  label: string | null;
  id: string;
  displayName: string | null;
  figur: string | null;
  unitNumber: string | null;
  data_provider: "erst" | "firmnav";
  attributes: Attribut[];
  backgroundColor: string;
  borderColor: string;
  labelColor: string;
};

export type StickyNodeData = {
  id: string;
  text: string;
};

export type TCustomNode = Node<NodeData | StickyNodeData>;

export type EdgeData = {
  label: string | null;
  value: string;
  showLabel: boolean;
  color: RGBA;
  showArrow: boolean;
  animated: boolean;
  lineThrough: boolean;
  stroke: string | null;
};

export type TCustomEdge = Edge<EdgeData>;

export interface NodeDropdown {
  id: string;
  label: string;
  description: string;
  style: string;
  attributes: {
    label: string;
    value: string;
    type: string;
    selectionOptions: string;
  };
}

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

export interface CompanyData {
  navn: string;
  Virksomhedsdata: Virksomhedsdata;
  Tidslinje: Tidslinje[];
  Regnskab: Regnskab;
}

interface Regnskab {
  Balance: any;
  Resultat: any;
  Nøgletal: any;
}

export interface Tidslinje {
  body: string;
  date: string;
  header: string;
}

interface Virksomhedsdata {
  "CVR-nummer": string;
  Land: string;
  Medarbejdere?: any;
  Direktion: string;
  Bestyrelse: string;
  Selskabskapital: string;
  Tegningsregel: string;
  Regnskabsperiode: string;
  "Fuldt ansvarlig deltager": string;
}

export interface WorkspaceState {
  loading: boolean;
  initialLoading: boolean;
  initialLoadingCvr: boolean;
  workspaces: List<WorkspaceTableOptions>;
  workspaceId: null | string;
  label: string;
  description: string;
  group: string;
  shareOrg: boolean;
  signed: boolean;
  signedBy: string;
  editable: boolean;
  elements: any;
  nodeElements: List<NodeData>;
  edgeElements: List<EdgeData>;
  message: string;
  groupsDropDownOptions: List<GroupDropdown>;
  attributesDropDownOptions: List<AttributeDropdown>;
  relationships: List<WorkspaceRelationship>;
  nodes: List<NodeDropdown>;
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
  mouseLoading: boolean;
}

export type IImmutableWorkspaceState = IImmutableStateMap<WorkspaceState>;
