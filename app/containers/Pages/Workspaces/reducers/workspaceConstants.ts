/* eslint-disable operator-linebreak */

import { Tag } from "@customTypes/reducers/tags";
import { CompanyData, WorkspaceTableOptions } from "@customTypes/reducers/workspace";
import { NotifyActions } from "@redux/constants/notifConstants";
import { FlowElement } from "react-flow-renderer";

// API
export const GET_WORKSPACES_LOADING = "GET_WORKSPACES_LOADING";
export const GET_WORKSPACES_SUCCESS = "GET_WORKSPACES_SUCCESS";
export const GET_WORKSPACES_FAILED = "GET_WORKSPACES_FAILED";
export const POST_WORKSPACE_LOADING = "POST_WORKSPACE_LOADING";
export const POST_WORKSPACE_SUCCESS = "POST_WORKSPACE_SUCCESS";
export const POST_WORKSPACE_FAILED = "POST_WORKSPACE_FAILED";
export const SHOW_WORKSPACE_LOADING = "SHOW_WORKSPACE_LOADING";
export const SHOW_WORKSPACE_SUCCESS = "SHOW_WORKSPACE_SUCCESS";
export const SHOW_WORKSPACE_FAILED = "SHOW_WORKSPACE_FAILED";
export const PUT_WORKSPACE_SUCCESS = "PUT_WORKSPACE_SUCCESS";
export const PUT_WORKSPACE_FAILED = "PUT_WORKSPACE_FAILED";
export const DELETE_WORKSPACE_SUCCESS = "DELETE_WORKSPACE_SUCCESS";
export const DELETE_WORKSPACE_FAILED = "DELETE_WORKSPACE_FAILED";
export const GET_ATTRIBUTE_DROPDOWN_SUCCESS = "GET_ATTRIBUTE_DROPDOWN_SUCCESS";
export const GET_ATTRIBUTE_DROPDOWN_FAILED = "GET_ATTRIBUTE_DROPDOWN_FAILED";
export const GET_GROUP_DROPDOWN_SUCCESS = "GET_GROUP_DROPDOWN_SUCCESS";
export const GET_GROUP_DROPDOWN_FAILED = "GET_GROUP_DROPDOWN_FAILED";
export const GET_RELATIONSHIP_VALUES_SUCCESS = "GET_RELATIONSHIP_VALUES_SUCCESS";
export const GET_RELATIONSHIP_VALUES_FAILED = "GET_RELATIONSHIP_VALUES_FAILED";
export const GET_NODE_VALUES_SUCCESS = "GET_NODE_VALUES_SUCCESS";
export const GET_NODE_VALUES_FAILED = "GET_NODE_VALUES_FAILED";

export const WORKSPACE_ADD_ELEMENTS_LOADING = "WORKSPACE_ADD_ELEMENTS_LOADING";
export const WORKSPACE_ADD_ELEMENTS_SUCCESS = "WORKSPACE_ADD_ELEMENTS_SUCCESS";
export const WORKSPACE_ADD_ELEMENTS_FAILED = "WORKSPACE_ADD_ELEMENTS_FAILED";

export const GET_CVR_NODES_LOADING = "GET_CVR_NODES_LOADING";
export const GET_CVR_NODES_SUCCESS = "GET_CVR_NODES_SUCCESS";
export const GET_CVR_NODES_FAILED = "GET_CVR_NODES_FAILED";
export const GET_WORKSPACE_NODE_COMPANY_DATA_LOADING =
  "GET_WORKSPACE_NODE_COMPANY_DATA_LOADING";
export const GET_WORKSPACE_NODE_COMPANY_DATA_SUCCESS =
  "GET_WORKSPACE_NODE_COMPANY_DATA_SUCCESS";
export const GET_WORKSPACE_NODE_COMPANY_DATA_FAILED =
  "GET_WORKSPACE_NODE_COMPANY_DATA_FAILED";
export const GET_WORKSPACE_NODE_ADDRESS_INFO_LOADING =
  "GET_WORKSPACE_NODE_ADDRESS_INFO_LOADING";
export const GET_WORKSPACE_NODE_ADDRESS_INFO_SUCCESS =
  "GET_WORKSPACE_NODE_ADDRESS_INFO_SUCCESS";
export const GET_WORKSPACE_NODE_ADDRESS_INFO_FAILED =
  "GET_WORKSPACE_NODE_ADDRESS_INFO_FAILED";

export const ANALYSE_OUTPUT_LOADING = "ANALYSE_OUTPUT_LOADING";
export const ANALYSE_OUTPUT_SUCCESS = "ANALYSE_OUTPUT_SUCCESS";
export const ANALYSE_OUTPUT_FAILED = "ANALYSE_OUTPUT_FAILED";

export const SAVE_WORKSPACE_SUCCESS = "SAVE_WORKSPACE_SUCCESS";
export const SAVE_WORKSPACE_FAILED = "SAVE_WORKSPACE_FAILED";

export const DELETE_WORKSPACE_ELEMENTS_SUCCESS = "DELETE_WORKSPACE_ELEMENTS_SUCCESS";
export const DELETE_WORKSPACE_ELEMENTS_FAILED = "DELETE_WORKSPACE_ELEMENTS_FAILED";

export const SHARE_WORKSPACE_SUCCESS = "SHARE_WORKSPACE_SUCCESS";
export const SHARE_WORKSPACE_LOADING = "SHARE_WORKSPACE_LOADING";
export const SHARE_WORKSPACE_FAILED = "SHARE_WORKSPACE_FAILED";

export const PUBLIC_ACCESS_WORKSPACE_LOADING = "PUBLIC_ACCESS_WORKSPACE_LOADING";
export const PUBLIC_ACCESS_WORKSPACE_SUCCESS = "PUBLIC_ACCESS_WORKSPACE_SUCCESS";
export const PUBLIC_ACCESS_WORKSPACE_FAILED = "PUBLIC_ACCESS_WORKSPACE_FAILED";

export const SET_PUBLIC_ACCESS_FALSE = "SET_PUBLIC_ACCESS_FALSE";

// Workspcae Meta
export const LABEL_CHANGE = "LABEL_CHANGE";
export const DESCRIPTION_CHANGE = "DESCRIPTION_CHANGE";
export const ADD_GROUP = "ADD_GROUP";
export const CHANGE_TAGS = "CHANGE_TAGS";
export const SHARE_ORG_CHANGE = "SHARE_ORG_CHANGE";

// Edges
export const EDGE_ADD_TO_LIST = "EDGE_ADD_TO_LIST";
export const POST_EDGE_LOADING = "POST_EDGE_LOADING";
export const POST_EDGE_SUCCESS = "POST_EDGE_SUCCESS";
export const POST_EDGE_FAILED = "POST_EDGE_FAILED";
export const PUT_EDGE_LOADING = "PUT_EDGE_LOADING";
export const PUT_EDGE_SUCCESS = "PUT_EDGE_SUCCESS";
export const PUT_EDGE_FAILED = "PUT_EDGE_FAILED";

// nodes
export const WORKSPACE_POST_NODE_LOADING = "WORKSPACE_POST_NODE_LOADING";
export const WORKSPACE_POST_NODE_SUCCESS = "WORKSPACE_POST_NODE_SUCCESS";
export const WORKSPACE_POST_NODE_FAILED = "WORKSPACE_POST_NODE_FAILED";
export const WORKSPACE_PUT_NODE_LOADING = "WORKSPACE_PUT_NODE_LOADING";
export const WORKSPACE_PUT_NODE_SUCCESS = "WORKSPACE_PUT_NODE_SUCCESS";
export const WORKSPACE_PUT_NODE_FAILED = "WORKSPACE_PUT_NODE_FAILED";
export const WORKSPACE_NODE_ADD_TO_LIST = "WORKSPACE_NODE_ADD_TO_LIST";
export const WORKSPACE_NODE_ATTRIBUT_ADD_TO_LIST = "WORKSPACE_NODE_ATTRIBUT_ADD_TO_LIST";

// anlysis
export const WORKSPACE_ANALYSIS_SAVE_SUCCESS = "WORKSPACE_ANALYSIS_SAVE_SUCCESS";
export const WORKSPACE_ANALYSIS_SAVE_FAILED = "WORKSPACE_ANALYSIS_SAVE_FAILED";
export const WORKSPACE_ANALYSIS_REVISION_SUCCESS = "WORKSPACE_ANALYSIS_REVISION_SUCCESS";
export const WORKSPACE_ANALYSIS_REVISION_FAILED = "WORKSPACE_ANALYSIS_REVISION_FAILED";

// CONTROL
export const SHOW_HANDLES_CHANGE = "SHOW_HANDLES_CHANGE";
export const LAYOUT_ELEMENTS = "LAYOUT_ELEMENTS";

export const ANALYSIS_TEXT_CHANGE = "ANALYSIS_TEXT_CHANGE";

export const SET_PUBLIC_VISITED = "SET_PUBLIC_VISITED";

export const SET_SHOW_COMPANY_DATA = "SET_SHOW_COMPANY_DATA";
export const SET_SHOW_ADDRESS_INFO = "SET_SHOW_ADDRESS_INFO";

export const RUN_INTRO_WORKSPACE = "RUN_INTRO_WORKSPACE";
export const CHANGE_STEP_INDEX_WORKSPACE = "CHANGE_STEP_INDEX_WORKSPACE";

export const HANDLE_UNCERTAIN_COMPANIES = "HANDLE_UNCERTAIN_COMPANIES";
export const STOP_LOADING = "STOP_LOADING";

export const SET_CONNECTED_USERS = "SET_CONNECTED_USERS";
export const REMOVE_CONNECTED_USERS = "REMOVE_CONNECTED_USERS";

export const DO_NOT_SHOW_INTERNATIONAL_DISCLAIMER_AGAIN =
  "DO_NOT_SHOW_INTERNATIONAL_DISCLAIMER_AGAIN";

export interface GetWorkspacesLoading {
  type: typeof GET_WORKSPACES_LOADING;
}

export interface GetWorkspacesSuccess {
  type: typeof GET_WORKSPACES_SUCCESS;
  workspaces: WorkspaceTableOptions[];
}

export interface GetWorkspacesFailed {
  type: typeof GET_WORKSPACES_FAILED;
  message: string;
}

export interface PostWorkspaceLoading {
  type: typeof POST_WORKSPACE_LOADING;
}

export interface PostWorkspacesSuccess {
  type: typeof POST_WORKSPACE_SUCCESS;
  id: string;
}

export interface PostWorkspacesFailed {
  type: typeof POST_WORKSPACE_FAILED;
  message: string;
}

export interface ShowWorkspacesLoading {
  type: typeof SHOW_WORKSPACE_LOADING;
}

export interface ShowWorkspacesSuccess {
  type: typeof SHOW_WORKSPACE_SUCCESS;
  label: string;
  description: string;
  group: string;
  elements: Element[]; // TODO:
  zoom: number;
  x_position: number;
  y_position: number;
  signed: boolean;
  signed_by: string;
  tags: Tag[];
}

export interface ShowWorkspacesFailed {
  type: typeof SHOW_WORKSPACE_FAILED;
  message: string;
}

export interface PutWorkspacesSuccess {
  type: typeof PUT_WORKSPACE_SUCCESS;
}

export interface PutWorkspacesFailed {
  type: typeof PUT_WORKSPACE_FAILED;
  message: string;
}

export interface DeleteWorkspacesSuccess {
  type: typeof DELETE_WORKSPACE_SUCCESS;
  message: string;
}

export interface DeleteWorkspacesFailed {
  type: typeof DELETE_WORKSPACE_FAILED;
  message: string;
}

export interface GetAttributeDropdownSuccess {
  type: typeof GET_ATTRIBUTE_DROPDOWN_SUCCESS;
  attributes: any;
}

export interface GetAttributeDropdownFailed {
  type: typeof GET_ATTRIBUTE_DROPDOWN_FAILED;
  message: string;
}

export interface GetGroupDropdownSuccess {
  type: typeof GET_GROUP_DROPDOWN_SUCCESS;
  groups: any; // TODO:
}

export interface GetGroupDropdownFailed {
  type: typeof GET_GROUP_DROPDOWN_FAILED;
  message: string;
}

export interface GetRelationsshipValuesSuccess {
  type: typeof GET_RELATIONSHIP_VALUES_SUCCESS;
  relationships: any; // TODO:
}

export interface GetRelationsshipValuesFailed {
  type: typeof GET_RELATIONSHIP_VALUES_FAILED;
  message: string;
}

export interface GetNodeValuesSuccess {
  type: typeof GET_NODE_VALUES_SUCCESS;
  nodes: any; // TODO:
}

export interface GetNodeValuesFailed {
  type: typeof GET_NODE_VALUES_FAILED;
  message: string;
}

export interface GetCvrNodesLoading {
  type: typeof GET_CVR_NODES_LOADING;
}

export interface GetCvrNodesSuccess {
  type: typeof GET_CVR_NODES_SUCCESS;
  elements: Element;
}

export interface GetCvrNodesFailed {
  type: typeof GET_CVR_NODES_FAILED;
  message: string;
}

export interface GetWorkspaceNodeCompanyDataLoading {
  type: typeof GET_WORKSPACE_NODE_COMPANY_DATA_LOADING;
}

export interface GetWorkspaceNodeCompanyDataSuccsess {
  type: typeof GET_WORKSPACE_NODE_COMPANY_DATA_SUCCESS;
  companyData: CompanyData;
}

export interface GetWorkspaceNodeCompanyDataFailed {
  type: typeof GET_WORKSPACE_NODE_COMPANY_DATA_FAILED;
  message: string;
}

export interface GetWorkspaceNodeCompanyAddressInfoLoading {
  type: typeof GET_WORKSPACE_NODE_ADDRESS_INFO_LOADING;
}

export interface GetWorkspaceNodeAddressInfoSuccess {
  type: typeof GET_WORKSPACE_NODE_ADDRESS_INFO_SUCCESS;
  addressInfo: string;
}

export interface GetWorkspaceNodeAddressInfoFailed {
  type: typeof GET_WORKSPACE_NODE_ADDRESS_INFO_FAILED;
  message: string;
}

export interface AnalyseOutputSuccess {
  type: typeof ANALYSE_OUTPUT_SUCCESS;
  outputs: any; // TODO:
}

export interface AnalyseOutputLoading {
  type: typeof ANALYSE_OUTPUT_LOADING;
}

export interface AnalyseOutputFailed {
  type: typeof ANALYSE_OUTPUT_FAILED;
  message: string;
}

export interface SaveWorkspaceSuccess {
  type: typeof SAVE_WORKSPACE_SUCCESS;
}

export interface SaveWorkspaceFailed {
  type: typeof SAVE_WORKSPACE_FAILED;
  message: string;
}

export interface DeleteWorkspaceElementsSuccess {
  type: typeof DELETE_WORKSPACE_ELEMENTS_SUCCESS;
  remainingElements: any; // TODO:
}

export interface DeleteWorkspaceElementsFailed {
  type: typeof DELETE_WORKSPACE_ELEMENTS_FAILED;
  message: string;
}

export interface ShareWorkspaceSuccess {
  type: typeof SHARE_WORKSPACE_SUCCESS;
}

export interface ShareWorkspaceLoading {
  type: typeof SHARE_WORKSPACE_LOADING;
}

export interface ShareWorkspaceFailed {
  type: typeof SHARE_WORKSPACE_FAILED;
  message: string;
}

export interface PublicAccessWorkspaceLoading {
  type: typeof PUBLIC_ACCESS_WORKSPACE_LOADING;
}

export interface PublicAccessWorkspaceSucces {
  type: typeof PUBLIC_ACCESS_WORKSPACE_SUCCESS;
  publicUserFirstName: string;
  publicUserLastName: string;
  workspaceId: number;
  editable: boolean;
}

export interface PublicAccessWorkspaceFailed {
  type: typeof PUBLIC_ACCESS_WORKSPACE_FAILED;
  message: string;
}

export interface SetPublicAccessFalse {
  type: typeof SET_PUBLIC_ACCESS_FALSE;
}

export interface LabelChange {
  type: typeof LABEL_CHANGE;
  label: string;
}

export interface DescriptionChange {
  type: typeof DESCRIPTION_CHANGE;
  description: string;
}

export interface AddGroup {
  type: typeof ADD_GROUP;
  group: string;
}

export interface ChangeTags {
  type: typeof CHANGE_TAGS;
  tags: Tag[];
}

export interface ShareOrgChange {
  type: typeof SHARE_ORG_CHANGE;
}

export interface EdgeAddToList {
  type: typeof EDGE_ADD_TO_LIST;
  edge: any; // TODO:
}

export interface PostEdgeLoading {
  type: typeof POST_EDGE_LOADING;
}

export interface PostEdgeSuccess {
  type: typeof POST_EDGE_SUCCESS;
  edge: any; // TODO:
}

export interface PostEdgeFailed {
  type: typeof POST_EDGE_FAILED;
  message: string;
}

export interface PutEdgeLoading {
  type: typeof PUT_EDGE_LOADING;
}

export interface PutEdgeSuccess {
  type: typeof PUT_EDGE_SUCCESS;
  edge: any; // TODO:
}

export interface PutEdgeFailed {
  type: typeof PUT_EDGE_FAILED;
  message: string;
}

export interface WorkspacePostNodeLoading {
  type: typeof WORKSPACE_POST_NODE_LOADING;
}

export interface WorkspacePostNodeSuccess {
  type: typeof WORKSPACE_POST_NODE_SUCCESS;
  node: any; // TODO:
}

export interface WorkspacePostNodeFailed {
  type: typeof WORKSPACE_POST_NODE_FAILED;
  message: string;
}

export interface WorkspacePutNodeLoading {
  type: typeof WORKSPACE_PUT_NODE_LOADING;
}

export interface WorkspacePutNodeSuccess {
  type: typeof WORKSPACE_PUT_NODE_SUCCESS;
  node: any; // TODO:
}

export interface WorkspacePuttNodeFailed {
  type: typeof WORKSPACE_PUT_NODE_FAILED;
  message: string;
}

export interface WorkspaceNodeAddToList {
  type: typeof WORKSPACE_NODE_ADD_TO_LIST;
  node: any; // TODO:
}

export interface WorkspaceNodeAttributAddToList {
  type: typeof WORKSPACE_NODE_ATTRIBUT_ADD_TO_LIST;
  attribut: any; // TODO:
}

export interface WorkspaceAnalysisSaveSuccess {
  type: typeof WORKSPACE_ANALYSIS_SAVE_SUCCESS;
}

export interface WorkspaceAnalysisSaveFailed {
  type: typeof WORKSPACE_ANALYSIS_SAVE_FAILED;
  message: string;
}

export interface WorkspaceAnalysisRevisionSuccess {
  type: typeof WORKSPACE_ANALYSIS_REVISION_SUCCESS;
  revisionHistory: any; // TODO:
}

export interface WorkspaceAnalysisRevisionFailed {
  type: typeof WORKSPACE_ANALYSIS_REVISION_FAILED;
  message: string;
}

export interface ShowHandlesChange {
  type: typeof SHOW_HANDLES_CHANGE;
  bool: boolean;
}

export interface AnalysisTextChange {
  type: typeof ANALYSIS_TEXT_CHANGE;
  text: string;
  index: any;
}

export interface SetPublicVisited {
  type: typeof SET_PUBLIC_VISITED;
}

export interface SetShowCompanyData {
  type: typeof SET_SHOW_COMPANY_DATA;
  show: any; // TODO:
}

export interface SetShowAddressInfo {
  type: typeof SET_SHOW_ADDRESS_INFO;
  show: any; // TODO:
}

export interface RunInroWorkspace {
  type: typeof RUN_INTRO_WORKSPACE;
  run: any; // TODO:
}

export interface ChangeStepIndexWorkspace {
  type: typeof CHANGE_STEP_INDEX_WORKSPACE;
  index: any; // TODO:
}

export interface HandleUncertainCompanies {
  type: typeof HANDLE_UNCERTAIN_COMPANIES;
  companies: any; // TODO:
}

export interface WorkspaceAddElementsLoading {
  type: typeof WORKSPACE_ADD_ELEMENTS_LOADING;
}

export interface WorkspaceAddElementsSuccess {
  type: typeof WORKSPACE_ADD_ELEMENTS_SUCCESS;
  elements: FlowElement[];
}

export interface WorkspaceAddElementsFailed {
  type: typeof WORKSPACE_ADD_ELEMENTS_FAILED;
  message: string;
}

export interface LayoutElements {
  type: typeof LAYOUT_ELEMENTS;
  elements: FlowElement[];
}

export interface SetConnectedUsers {
  type: typeof SET_CONNECTED_USERS;
  user: any;
}

export interface RemoveConnectedUsers {
  type: typeof REMOVE_CONNECTED_USERS;
  user: any;
}

export interface DoNotShowInternationalDisclaimerAgain {
  type: typeof DO_NOT_SHOW_INTERNATIONAL_DISCLAIMER_AGAIN;
}

export interface StopLoading {
  type: typeof STOP_LOADING;
}

export type WorkspaceActions =
  | GetWorkspacesLoading
  | GetWorkspacesSuccess
  | GetWorkspacesFailed
  | PostWorkspaceLoading
  | PostWorkspacesSuccess
  | PostWorkspacesFailed
  | ShowWorkspacesLoading
  | ShowWorkspacesSuccess
  | ShowWorkspacesFailed
  | PutWorkspacesSuccess
  | PutWorkspacesFailed
  | DeleteWorkspacesSuccess
  | DeleteWorkspacesFailed
  | GetAttributeDropdownSuccess
  | GetAttributeDropdownFailed
  | GetGroupDropdownSuccess
  | GetGroupDropdownFailed
  | GetRelationsshipValuesSuccess
  | GetRelationsshipValuesFailed
  | GetNodeValuesSuccess
  | GetNodeValuesFailed
  | GetCvrNodesLoading
  | GetCvrNodesSuccess
  | GetCvrNodesFailed
  | GetWorkspaceNodeCompanyDataLoading
  | GetWorkspaceNodeCompanyDataSuccsess
  | GetWorkspaceNodeCompanyDataFailed
  | GetWorkspaceNodeCompanyAddressInfoLoading
  | GetWorkspaceNodeAddressInfoSuccess
  | GetWorkspaceNodeAddressInfoFailed
  | AnalyseOutputSuccess
  | AnalyseOutputLoading
  | AnalyseOutputFailed
  | SaveWorkspaceSuccess
  | SaveWorkspaceFailed
  | DeleteWorkspaceElementsSuccess
  | DeleteWorkspaceElementsFailed
  | ShareWorkspaceSuccess
  | ShareWorkspaceLoading
  | ShareWorkspaceFailed
  | PublicAccessWorkspaceLoading
  | PublicAccessWorkspaceSucces
  | PublicAccessWorkspaceFailed
  | SetPublicAccessFalse
  | LabelChange
  | DescriptionChange
  | AddGroup
  | ChangeTags
  | ShareOrgChange
  | EdgeAddToList
  | PostEdgeLoading
  | PostEdgeSuccess
  | PostEdgeFailed
  | PutEdgeLoading
  | PutEdgeSuccess
  | PutEdgeFailed
  | WorkspacePostNodeLoading
  | WorkspacePostNodeSuccess
  | WorkspacePostNodeFailed
  | WorkspacePutNodeLoading
  | WorkspacePutNodeSuccess
  | WorkspacePuttNodeFailed
  | WorkspaceNodeAddToList
  | WorkspaceNodeAttributAddToList
  | WorkspaceAnalysisSaveSuccess
  | WorkspaceAnalysisSaveFailed
  | WorkspaceAnalysisRevisionSuccess
  | WorkspaceAnalysisRevisionFailed
  | ShowHandlesChange
  | AnalysisTextChange
  | SetPublicVisited
  | SetShowCompanyData
  | SetShowAddressInfo
  | RunInroWorkspace
  | ChangeStepIndexWorkspace
  | HandleUncertainCompanies
  | WorkspaceAddElementsLoading
  | WorkspaceAddElementsSuccess
  | WorkspaceAddElementsFailed
  | NotifyActions
  | LayoutElements
  | SetConnectedUsers
  | RemoveConnectedUsers
  | DoNotShowInternationalDisclaimerAgain
  | StopLoading;
