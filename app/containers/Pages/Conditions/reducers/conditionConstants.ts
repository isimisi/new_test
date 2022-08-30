import {
  ConditionTableOptions,
  NodeAttribute,
  RelationshipLabel,
  TCustomEdge,
  TCustomNode,
} from "@customTypes/reducers/conditions";
import { GroupDropdown } from "@customTypes/reducers/groups";
import { Tag } from "@customTypes/reducers/tags";
import { NotifyActions } from "@redux/constants/notifConstants";

// API
export const GET_CONDITIONS_LOADING = "GET_CONDITIONS_LOADING";
export const GET_CONDITIONS_SUCCESS = "GET_CONDITIONS_SUCCESS";
export const GET_CONDITIONS_FAILED = "GET_CONDITIONS_FAILED";
export const POST_CONDITION_SUCCESS = "POST_CONDITION_SUCCESS";
export const POST_CONDITION_FAILED = "POST_CONDITION_FAILED";
export const GET_BUILD_TYPES_VALUES_SUCCESS = "GET_BUILD_TYPES_VALUES_SUCCESS";
export const GET_BUILD_TYPES_VALUES_FAILED = "GET_BUILD_TYPES_VALUES_FAILED";
export const SHOW_CONDITION_SUCCESS = "SHOW_CONDITION_SUCCESS";
export const SHOW_CONDITION_FAILED = "SHOW_CONDITION_FAILED";
export const PUT_CONDITION_SUCCESS = "PUT_CONDITION_SUCCESS";
export const PUT_CONDITION_FAILED = "PUT_CONDITION_FAILED";
export const DELETE_CONDITION_SUCCESS = "DELETE_CONDITION_SUCCESS";
export const DELETE_CONDITION_FAILED = "DELETE_CONDITION_FAILED";
export const GET_GROUP_DROPDOWN_SUCCESS = "GET_GROUP_DROPDOWN_SUCCESS";
export const GET_GROUP_DROPDOWN_FAILED = "GET_GROUP_DROPDOWN_FAILED";

export const SAVE_CONDITION_SUCCESS = "SAVE_CONDITION_SUCCESS";
export const SAVE_CONDITION_FAILED = "SAVE_CONDITION_FAILED";

export const CONDITION_ADD_ELEMENTS_LOADING = "CONDITION_ADD_ELEMENTS_LOADING";
export const CONDITION_ADD_ELEMENTS_SUCCESS = "CONDITION_ADD_ELEMENTS_SUCCESS";
export const CONDITION_ADD_ELEMENTS_FAILED = "CONDITION_ADD_ELEMENTS_FAILED";

export const GET_NODE_VALUES_SUCCESS = "GET_NODE_VALUES_SUCCESS";
export const GET_NODE_VALUES_FAILED = "GET_NODE_VALUES_FAILED";
export const GET_RELATIONSHIP_VALUES_SUCCESS = "GET_RELATIONSHIP_VALUES_SUCCESS";
export const GET_RELATIONSHIP_VALUES_FAILED = "GET_RELATIONSHIP_VALUES_FAILED";
export const CONDITION_RELATIONSHIP_ADD_TO_LIST = "CONDITION_RELATIONSHIP_ADD_TO_LIST";

export const CONDITION_POST_NODE_SUCCESS = "CONDITION_POST_NODE_SUCCESS";
export const CONDITION_POST_NODE_FAILED = "CONDITION_POST_NODE_FAILED";
export const CONDITION_PUT_NODE_SUCCESS = "CONDITION_PUT_NODE_SUCCESS";
export const CONDITION_PUT_NODE_FAILED = "CONDITION_PUT_NODE_FAILED";

export const CONDITION_PUT_EDGE_SUCCESS = "CONDITION_PUT_EDGE_SUCCESS";
export const CONDITION_PUT_EDGE_FAILED = "CONDITION_PUT_EDGE_FAILED";
export const CONDITION_POST_EDGE_SUCCESS = "CONDITION_POST_EDGE_SUCCESS";
export const CONDITION_POST_EDGE_FAILED = "CONDITION_POST_EDGE_FAILED";
export const CONDITION_NODE_ADD_TO_LIST = "CONDITION_NODE_ADD_TO_LIST";
export const CONDITION_NODE_ATTRIBUT_ADD_TO_LIST = "CONDITION_NODE_ATTRIBUT_ADD_TO_LIST";

export const TITLE_CHANGE_CONDITION = "TITLE_CHANGE_CONDITION";
export const DESCRIPTION_CHANGE_CONDITION = "DESCRIPTION_CHANGE_CONDITION";
export const ADD_GROUP = "ADD_GROUP";
export const CHANGE_CONDITION_ROW = "CHANGE_CONDITION_ROW";
export const CHANGE_TAGS = "CHANGE_TAGS";

export const CHANGE_NODES = "CHANGE_NODES";
export const CHANGE_EDGES = "CHANGE_EDGES";

export interface GetConditionLoading {
  type: typeof GET_CONDITIONS_LOADING;
}

export interface GetConditionSuccess {
  type: typeof GET_CONDITIONS_SUCCESS;
  conditions: ConditionTableOptions[];
}

export interface GetConditionFailed {
  type: typeof GET_CONDITIONS_FAILED;
  message: string;
}

export interface PostConditionSuccess {
  type: typeof POST_CONDITION_SUCCESS;
}

export interface PostConditionFailed {
  type: typeof POST_CONDITION_FAILED;
  message: string;
}

export interface GetBuildTypesValuesSuccess {
  type: typeof GET_BUILD_TYPES_VALUES_SUCCESS;
  nodeAttributes: NodeAttribute[];
  relationshipLabels: RelationshipLabel[];
}

export interface GetBuildTypesValuesFailed {
  type: typeof GET_BUILD_TYPES_VALUES_FAILED;
  message: string;
}

export interface ShowConditionSuccess {
  type: typeof SHOW_CONDITION_SUCCESS;
  label: string;
  description: string;
  group: string;
  nodes: TCustomNode[];
  edges: TCustomEdge[];
  tags: Tag[];
}

export interface ShowConditionFailed {
  type: typeof SHOW_CONDITION_FAILED;
  message: string;
}

export interface PutConditionSuccess {
  type: typeof PUT_CONDITION_SUCCESS;
}

export interface PutConditionFailed {
  type: typeof PUT_CONDITION_FAILED;
  message: string;
}

export interface DeleteConditionSuccess {
  type: typeof DELETE_CONDITION_SUCCESS;
  message: string;
}

export interface DeleteConditionFailed {
  type: typeof DELETE_CONDITION_FAILED;
  message: string;
}

export interface GetGroupDropdownSuccess {
  type: typeof GET_GROUP_DROPDOWN_SUCCESS;
  groups: GroupDropdown[];
}

export interface GetGroupDropdownFailed {
  type: typeof GET_GROUP_DROPDOWN_FAILED;
  message: string;
}

export interface SaveConditionSuccess {
  type: typeof SAVE_CONDITION_SUCCESS;
  message: string;
}

export interface SaveConditionFailed {
  type: typeof SAVE_CONDITION_FAILED;
  message: string;
}

export interface ConditionAddElementsLoading {
  type: typeof CONDITION_ADD_ELEMENTS_LOADING;
}

export interface ConditionAddElementSuccess {
  type: typeof CONDITION_ADD_ELEMENTS_SUCCESS;
  nodes: TCustomNode[];
  edges: TCustomEdge[];
}

export interface ConditionAddElementFailed {
  type: typeof CONDITION_ADD_ELEMENTS_FAILED;
  message: string;
}

export interface GetNodesValuesSuccess {
  type: typeof GET_NODE_VALUES_SUCCESS;
  nodes: Node[];
}

export interface GetNodesValuesFailed {
  type: typeof GET_NODE_VALUES_FAILED;
  message: string;
}

export interface GetRelationshipValuesSuccess {
  type: typeof GET_RELATIONSHIP_VALUES_SUCCESS;
  relationships: any; // TODO:
}

export interface GetRelationshipValuesFailed {
  type: typeof GET_RELATIONSHIP_VALUES_FAILED;
  message: string;
}

export interface ConditionRelationshipAddToList {
  type: typeof CONDITION_RELATIONSHIP_ADD_TO_LIST;
  relationship: any; // TODO:
}

export interface ConditionPostNodeSuccess {
  type: typeof CONDITION_POST_NODE_SUCCESS;
  node: string;
}

export interface ConditionPostNodeFailed {
  type: typeof CONDITION_POST_NODE_FAILED;
  message: string;
}

export interface ConditionPutNodeSuccess {
  type: typeof CONDITION_PUT_NODE_SUCCESS;
  node: any; // TODO:
}

export interface ConditionPutNodeFailed {
  type: typeof CONDITION_PUT_NODE_FAILED;
  message: string;
}

export interface ConditionPutEdgeSuccess {
  type: typeof CONDITION_PUT_EDGE_SUCCESS;
  edge: any; // TODO:
}

export interface ConditionPutEdgeFailed {
  type: typeof CONDITION_PUT_EDGE_FAILED;
  message: string;
}

export interface ConditionPostEdgeSuccess {
  type: typeof CONDITION_POST_EDGE_SUCCESS;
  edge: any;
}

export interface ConditionPostEdgeFailed {
  type: typeof CONDITION_POST_EDGE_FAILED;
  message: string;
}

export interface ConditionNodeAddToList {
  type: typeof CONDITION_NODE_ADD_TO_LIST;
  node: string;
}

export interface ConditionNodeAttributAddToList {
  type: typeof CONDITION_NODE_ATTRIBUT_ADD_TO_LIST;
  attribut: any; // TODO:
}

export interface TitleChangeCondition {
  type: typeof TITLE_CHANGE_CONDITION;
  title: string;
}

export interface DescriptionChangeCondition {
  type: typeof DESCRIPTION_CHANGE_CONDITION;
  description: string;
}

export interface addGroup {
  type: typeof ADD_GROUP;
  group: string;
}

export interface changeConditionRow {
  type: typeof CHANGE_CONDITION_ROW;
}

export interface changeTags {
  type: typeof CHANGE_TAGS;
  tags: any;
}

export interface ChangeNodes {
  type: typeof CHANGE_NODES;
  nodes: TCustomNode[];
}
export interface ChangeEdges {
  type: typeof CHANGE_EDGES;
  edges: TCustomEdge[];
}

export type ConditionActions =
  | GetConditionLoading
  | GetConditionSuccess
  | GetConditionFailed
  | PostConditionSuccess
  | PostConditionFailed
  | GetBuildTypesValuesSuccess
  | GetBuildTypesValuesFailed
  | ShowConditionSuccess
  | ShowConditionFailed
  | PutConditionSuccess
  | PutConditionFailed
  | DeleteConditionSuccess
  | DeleteConditionFailed
  | GetGroupDropdownSuccess
  | GetGroupDropdownFailed
  | SaveConditionSuccess
  | SaveConditionFailed
  | ConditionAddElementSuccess
  | ConditionAddElementFailed
  | ConditionAddElementsLoading
  | GetNodesValuesSuccess
  | GetNodesValuesFailed
  | GetRelationshipValuesSuccess
  | GetRelationshipValuesFailed
  | ConditionRelationshipAddToList
  | ConditionPostNodeSuccess
  | ConditionPostNodeFailed
  | ConditionPutNodeSuccess
  | ConditionPutNodeFailed
  | ConditionPutEdgeSuccess
  | ConditionPutEdgeFailed
  | ConditionPostEdgeSuccess
  | ConditionPostEdgeFailed
  | ConditionNodeAddToList
  | ConditionNodeAttributAddToList
  | TitleChangeCondition
  | DescriptionChangeCondition
  | addGroup
  | changeConditionRow
  | changeTags
  | ChangeNodes
  | ChangeEdges
  | NotifyActions;
