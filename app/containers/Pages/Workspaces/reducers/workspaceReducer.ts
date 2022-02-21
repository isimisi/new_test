/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */
import { fromJS, List, Map } from "immutable";
import { isNode, isEdge } from "react-flow-renderer";
import { CLOSE_NOTIF, SHOW_NOTIF } from "@redux/constants/notifConstants";

import {
  GET_WORKSPACES_LOADING,
  GET_WORKSPACES_SUCCESS,
  GET_WORKSPACES_FAILED,
  PUT_WORKSPACE_SUCCESS,
  PUT_WORKSPACE_FAILED,
  SHOW_WORKSPACE_LOADING,
  SHOW_WORKSPACE_SUCCESS,
  SHOW_WORKSPACE_FAILED,
  LABEL_CHANGE,
  VALUES_CHANGE,
  DESCRIPTION_CHANGE,
  ADD_GROUP,
  CHANGE_TAGS,
  SHARE_ORG_CHANGE,
  GET_GROUP_DROPDOWN_SUCCESS,
  GET_GROUP_DROPDOWN_FAILED,
  GET_ATTRIBUTE_DROPDOWN_SUCCESS,
  GET_ATTRIBUTE_DROPDOWN_FAILED,
  EDGE_ADD_TO_LIST,
  GET_RELATIONSHIP_VALUES_SUCCESS,
  GET_RELATIONSHIP_VALUES_FAILED,
  POST_EDGE_LOADING,
  POST_EDGE_SUCCESS,
  POST_EDGE_FAILED,
  PUT_EDGE_LOADING,
  PUT_EDGE_SUCCESS,
  PUT_EDGE_FAILED,
  GET_NODE_VALUES_SUCCESS,
  GET_NODE_VALUES_FAILED,
  WORKSPACE_POST_NODE_LOADING,
  WORKSPACE_POST_NODE_SUCCESS,
  WORKSPACE_POST_NODE_FAILED,
  SHOW_HANDLES_CHANGE,
  POST_WORKSPACE_SUCCESS,
  POST_WORKSPACE_FAILED,
  DELETE_WORKSPACE_SUCCESS,
  DELETE_WORKSPACE_FAILED,
  SAVE_WORKSPACE_SUCCESS,
  SAVE_WORKSPACE_FAILED,
  DELETE_WORKSPACE_ELEMENTS_SUCCESS,
  DELETE_WORKSPACE_ELEMENTS_FAILED,
  STOP_LOADING,
  WORKSPACE_PUT_NODE_LOADING,
  WORKSPACE_PUT_NODE_SUCCESS,
  WORKSPACE_PUT_NODE_FAILED,
  ANALYSE_OUTPUT_LOADING,
  ANALYSE_OUTPUT_SUCCESS,
  ANALYSE_OUTPUT_FAILED,
  WORKSPACE_NODE_ADD_TO_LIST,
  WORKSPACE_NODE_ATTRIBUT_ADD_TO_LIST,
  GET_CVR_NODES_LOADING,
  GET_CVR_NODES_SUCCESS,
  GET_CVR_NODES_FAILED,
  GET_WORKSPACE_NODE_COMPANY_DATA_LOADING,
  GET_WORKSPACE_NODE_COMPANY_DATA_SUCCESS,
  GET_WORKSPACE_NODE_COMPANY_DATA_FAILED,
  SHARE_WORKSPACE_LOADING,
  SHARE_WORKSPACE_SUCCESS,
  SHARE_WORKSPACE_FAILED,
  PUBLIC_ACCESS_WORKSPACE_LOADING,
  PUBLIC_ACCESS_WORKSPACE_SUCCESS,
  PUBLIC_ACCESS_WORKSPACE_FAILED,
  SET_PUBLIC_ACCESS_FALSE,
  WORKSPACE_ANALYSIS_SAVE_SUCCESS,
  WORKSPACE_ANALYSIS_SAVE_FAILED,
  WORKSPACE_ANALYSIS_REVISION_SUCCESS,
  WORKSPACE_ANALYSIS_REVISION_FAILED,
  ANALYSIS_TEXT_CHANGE,
  SET_PUBLIC_VISITED,
  SET_SHOW_COMPANY_DATA,
  GET_WORKSPACE_NODE_ADDRESS_INFO_LOADING,
  GET_WORKSPACE_NODE_ADDRESS_INFO_SUCCESS,
  GET_WORKSPACE_NODE_ADDRESS_INFO_FAILED,
  SET_SHOW_ADDRESS_INFO,
  RUN_INTRO_WORKSPACE,
  CHANGE_STEP_INDEX_WORKSPACE,
  HANDLE_UNCERTAIN_COMPANIES,
  WORKSPACE_ADD_ELEMENTS,
  WORKSPACE_UPDATE_ELEMENTS,
  LAYOUT_ELEMENTS,
  SET_CONNECTED_USERS,
  REMOVE_CONNECTED_USERS,
} from "./workspaceConstants";

const initialState = {
  loading: false,
  initialLoading: false,
  initialLoadingCvr: false,
  workspaces: List(),
  label: "",
  description: "",
  group: "",
  shareOrg: false,
  signed: false,
  signedBy: "",
  editable: false,
  elements: List(),
  message: "",
  groupsDropDownOptions: List(),
  attributesDropDownOptions: List(),
  relationships: List(),
  nodes: List(),
  handleVisability: true,
  zoom: 0,
  xPosition: 0,
  yPosition: 0,
  alerts: List(),
  alertId: null,
  alertOpen: false,
  outputs: List(),
  companyData: {},
  publicAuthenticated: false,
  publicUserFirstName: "",
  publicUserLastName: "",
  publicAuthenticatedId: null,
  revisionHistory: Map(),
  hasVisitedPublic: false,
  showCompanyData: false,
  addressInfo: {},
  showAddressInfo: false,
  runIntro: true,
  introStepIndex: 0,
  uncertainCompanies: List(),
  specificWorkspaceTags: List(),
  connectedUsers: List(),
};

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action: any) {
  switch (action.type) {
    case GET_WORKSPACES_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", true);
      });
    case GET_WORKSPACES_SUCCESS:
      return state.withMutations((mutableState) => {
        const workspaces = fromJS(action.workspaces);
        mutableState.set("workspaces", workspaces);
        mutableState.set("loading", false);
      });
    case GET_WORKSPACES_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("loading", false);
      });
    case SAVE_WORKSPACE_SUCCESS:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return state.withMutations((mutableState) => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
      });
    case SAVE_WORKSPACE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case WORKSPACE_ADD_ELEMENTS:
      return state.withMutations((mutableState) => {
        const newElements = action.elements;

        const orgElements = mutableState.get("elements").toJS();
        const elements = fromJS([...orgElements, ...newElements]);
        mutableState.set("elements", elements);
      });
    case WORKSPACE_UPDATE_ELEMENTS:
      return state.withMutations((mutableState) => {
        const { nodesWithOrgId, edgesWithOrgId } = action;
        const elements = mutableState.get("elements").toJS();
        const elementsToEdit = elements.filter((el) => el.id.includes("edit"));
        const remainingElements = elements.filter((el) => !el.id.includes("edit"));
        const nodesToEdit = elementsToEdit.filter((el) => isNode(el));
        const edgesToEdit = elementsToEdit.filter((el) => isEdge(el));
        nodesToEdit.map((node) => {
          node.id = nodesWithOrgId[node.id];
          return node;
        });
        edgesToEdit.map((edge) => {
          edge.id = edgesWithOrgId[edge.id];
          edge.source = nodesWithOrgId[edge.source];
          edge.target = nodesWithOrgId[edge.target];
          return edge;
        });

        const newElements = [...remainingElements, ...nodesToEdit, ...edgesToEdit];

        mutableState.set("elements", fromJS(newElements));
      });
    case DELETE_WORKSPACE_ELEMENTS_SUCCESS:
      return state.withMutations((mutableState) => {
        const elements = fromJS(action.remainingElements);
        mutableState.set("elements", elements);
      });
    case DELETE_WORKSPACE_ELEMENTS_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case POST_WORKSPACE_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("label", "");
        mutableState.set("description", "");
        mutableState.set("group", "");
        mutableState.set("elements", List());
      });
    case POST_WORKSPACE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case SHOW_WORKSPACE_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("initialLoading", true);
        mutableState.set("elements", List());
      });
    case SHOW_WORKSPACE_SUCCESS:
      return state.withMutations((mutableState) => {
        const label = fromJS(action.label);
        const description = fromJS(action.description);
        const group = fromJS(action.group);
        const elements = fromJS(action.elements);
        const zoom = fromJS(action.zoom);
        const xPosition = fromJS(action.x_position);
        const yPosition = fromJS(action.y_position);
        const signed = fromJS(action.signed);
        const signedBy = fromJS(action.signed_by);
        const tags = fromJS(action.tags);

        mutableState.set("label", label);
        mutableState.set("description", description);
        mutableState.set("group", group || "");
        mutableState.set("elements", elements);
        mutableState.set("zoom", zoom);
        mutableState.set("xPosition", xPosition);
        mutableState.set("yPosition", yPosition);
        mutableState.set("signed", signed);
        mutableState.set("signedBy", signedBy);
        mutableState.set("specificWorkspaceTags", tags);
        mutableState.set("initialLoading", false);
      });
    case SHOW_WORKSPACE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("initialLoading", false);
      });
    case PUT_WORKSPACE_SUCCESS:
      return state.withMutations(() => {});
    case PUT_WORKSPACE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case DELETE_WORKSPACE_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case DELETE_WORKSPACE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case GET_GROUP_DROPDOWN_SUCCESS:
      return state.withMutations((mutableState) => {
        const groupsDropDownOptions = fromJS(action.groups);
        mutableState.set("groupsDropDownOptions", groupsDropDownOptions);
      });
    case GET_GROUP_DROPDOWN_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case GET_ATTRIBUTE_DROPDOWN_SUCCESS:
      return state.withMutations((mutableState) => {
        const attributesDropDownOptions = fromJS(action.attributes);
        mutableState.set("attributesDropDownOptions", attributesDropDownOptions);
      });
    case GET_ATTRIBUTE_DROPDOWN_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case LABEL_CHANGE:
      return state.withMutations((mutableState) => {
        const label = fromJS(action.label);
        mutableState.set("label", label);
      });
    case DESCRIPTION_CHANGE:
      return state.withMutations((mutableState) => {
        const description = fromJS(action.description);
        mutableState.set("description", description);
      });
    case VALUES_CHANGE:
      return state.withMutations((mutableState) => {
        const values = fromJS(action.values);
        mutableState.set("values", values);
      });
    case ADD_GROUP:
      return state.withMutations((mutableState) => {
        const group = fromJS(action.group);
        mutableState.set("group", group);
      });
    case CHANGE_TAGS:
      return state.withMutations((mutableState) => {
        const tags = fromJS(action.tags);
        mutableState.set("specificWorkspaceTags", tags);
      });
    case SHARE_ORG_CHANGE:
      return state.withMutations((mutableState) => {
        mutableState.update("shareOrg", (val) => !val);
      });
    case POST_EDGE_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", true);
      });
    case POST_EDGE_SUCCESS:
      return state.withMutations((mutableState) => {
        const edge = fromJS(action.edge);
        mutableState.update("elements", (myList) => myList.push(edge));
        mutableState.set("loading", false);
      });
    case POST_EDGE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("loading", false);
      });
    case PUT_EDGE_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", true);
      });
    case PUT_EDGE_SUCCESS:
      return state.withMutations((mutableState) => {
        const elements = mutableState.get("elements").toJS();
        const index = elements.findIndex((e) => e.id === action.edge.id && isEdge(e));
        elements[index] = action.edge;
        mutableState.set("elements", fromJS(elements));
        mutableState.set("loading", false);
      });
    case PUT_EDGE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("loading", false);
      });
    case WORKSPACE_POST_NODE_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", true);
      });
    case WORKSPACE_POST_NODE_SUCCESS:
      return state.withMutations((mutableState) => {
        const node = fromJS(action.node);
        mutableState.update("elements", (myList) => myList.push(node));
        mutableState.set("loading", false);
      });
    case WORKSPACE_POST_NODE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("loading", false);
      });
    case WORKSPACE_PUT_NODE_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", true);
      });
    case WORKSPACE_PUT_NODE_SUCCESS:
      return state.withMutations((mutableState) => {
        const elements = mutableState.get("elements").toJS();
        const index = elements.findIndex((e) => e.id === action.node.id && isNode(e));
        elements[index] = action.node;

        mutableState.set("elements", fromJS(elements));
        mutableState.set("loading", false);
      });
    case WORKSPACE_PUT_NODE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("loading", false);
      });
    case GET_NODE_VALUES_SUCCESS:
      return state.withMutations((mutableState) => {
        const nodes = fromJS(action.nodes);
        mutableState.set("nodes", nodes);
      });
    case GET_NODE_VALUES_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case GET_RELATIONSHIP_VALUES_SUCCESS:
      return state.withMutations((mutableState) => {
        const relationships = fromJS(action.relationships);
        mutableState.set("relationships", relationships);
      });
    case GET_RELATIONSHIP_VALUES_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });

    case ANALYSE_OUTPUT_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", true);
      });
    case ANALYSE_OUTPUT_SUCCESS:
      return state.withMutations((mutableState) => {
        const outputs = fromJS(action.outputs);
        mutableState.set("outputs", outputs);
        mutableState.set("loading", false);
      });
    case ANALYSE_OUTPUT_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("loading", false);
      });
    case GET_CVR_NODES_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", true);
        mutableState.set("initialLoadingCvr", true);
      });
    case GET_CVR_NODES_SUCCESS:
      return state.withMutations((mutableState) => {
        const elements = fromJS(action.elements);
        mutableState.set("elements", elements);
        mutableState.set("loading", false);
        mutableState.set("initialLoadingCvr", false);
      });
    case GET_CVR_NODES_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("loading", false);
        mutableState.set("initialLoadingCvr", false);
      });
    case LAYOUT_ELEMENTS:
      return state.withMutations((mutableState) => {
        const elements = fromJS(action.elements);
        mutableState.set("elements", elements);
      });
    case GET_WORKSPACE_NODE_COMPANY_DATA_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", true);
      });
    case GET_WORKSPACE_NODE_COMPANY_DATA_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("companyData", action.companyData);
        mutableState.set("loading", false);
      });
    case GET_WORKSPACE_NODE_COMPANY_DATA_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("loading", false);
      });
    case GET_WORKSPACE_NODE_ADDRESS_INFO_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", true);
      });
    case GET_WORKSPACE_NODE_ADDRESS_INFO_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("addressInfo", action.addressInfo);
        mutableState.set("showAddressInfo", true);
        mutableState.set("loading", false);
      });
    case GET_WORKSPACE_NODE_ADDRESS_INFO_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("loading", false);
      });
    case SHARE_WORKSPACE_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", true);
      });
    case SHARE_WORKSPACE_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", false);
      });
    case SHARE_WORKSPACE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("loading", false);
      });
    case PUBLIC_ACCESS_WORKSPACE_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", true);
      });
    case PUBLIC_ACCESS_WORKSPACE_SUCCESS:
      return state.withMutations((mutableState) => {
        const publicUserFirstName = fromJS(action.publicUserFirstName);
        const publicUserLastName = fromJS(action.publicUserLastName);
        const publicAuthenticatedId = fromJS(action.workspaceId);
        const editable = fromJS(action.editable);

        mutableState.set("publicAuthenticated", true);
        mutableState.set("publicAuthenticatedId", publicAuthenticatedId);
        mutableState.set("publicUserFirstName", publicUserFirstName);
        mutableState.set("publicUserLastName", publicUserLastName);
        mutableState.set("editable", editable);
        mutableState.set("loading", false);
      });

    case PUBLIC_ACCESS_WORKSPACE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("loading", false);
      });
    case WORKSPACE_ANALYSIS_SAVE_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", false);
      });
    case WORKSPACE_ANALYSIS_SAVE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case WORKSPACE_ANALYSIS_REVISION_SUCCESS:
      return state.withMutations((mutableState) => {
        const revisionHistory = fromJS(action.revisionHistory);
        mutableState.set("revisionHistory", revisionHistory);
      });
    case WORKSPACE_ANALYSIS_REVISION_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case EDGE_ADD_TO_LIST:
      return state.withMutations((mutableState) => {
        const edge = fromJS(action.edge);
        mutableState.update("relationships", (myList) => myList.push(edge));
      });
    case WORKSPACE_NODE_ADD_TO_LIST:
      return state.withMutations((mutableState) => {
        const node = fromJS(action.node);
        mutableState.update("nodes", (myList) => myList.push(node));
      });
    case WORKSPACE_NODE_ATTRIBUT_ADD_TO_LIST:
      return state.withMutations((mutableState) => {
        const attribut = fromJS(action.attribut);
        mutableState.update("attributesDropDownOptions", (myList) =>
          myList.push(attribut)
        );
      });
    case SHOW_HANDLES_CHANGE:
      return state.withMutations((mutableState) => {
        const visability = fromJS(action.bool);
        mutableState.set("handleVisability", visability);
      });
    case SET_PUBLIC_ACCESS_FALSE:
      return state.withMutations((mutableState) => {
        mutableState.set("publicAuthenticatedId", null);
        mutableState.set("publicAuthenticated", false);
      });
    case ANALYSIS_TEXT_CHANGE:
      return state.withMutations((mutableState) => {
        const outputs = mutableState.get("outputs").toJS();
        outputs[action.index].action.output = action.text;

        mutableState.set("outputs", fromJS(outputs));
      });
    case SHOW_NOTIF:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set("message", "");
      });
    case SET_PUBLIC_VISITED:
      return state.withMutations((mutableState) => {
        mutableState.set("hasVisitedPublic", true);
      });
    case SET_SHOW_COMPANY_DATA:
      return state.withMutations((mutableState) => {
        const show = fromJS(action.show);
        mutableState.set("showCompanyData", show);
      });
    case SET_SHOW_ADDRESS_INFO:
      return state.withMutations((mutableState) => {
        const show = fromJS(action.show);
        mutableState.set("showAddressInfo", show);
      });
    case RUN_INTRO_WORKSPACE:
      return state.withMutations((mutableState) => {
        const run = fromJS(action.run);
        mutableState.set("runIntro", run);
      });
    case CHANGE_STEP_INDEX_WORKSPACE:
      return state.withMutations((mutableState) => {
        const index = fromJS(action.index);
        mutableState.set("introStepIndex", index);
      });
    case HANDLE_UNCERTAIN_COMPANIES:
      return state.withMutations((mutableState) => {
        const companies = fromJS(action.companies);
        mutableState.set("uncertainCompanies", companies);
        mutableState.set("loading", false);
      });
    case SET_CONNECTED_USERS:
      return state.withMutations((mutableState) => {
        const user = fromJS(action.edge);
        mutableState.update("connectedUsers", (myList) => myList.push(user));
      });
    case REMOVE_CONNECTED_USERS:
      return state.withMutations((mutableState) => {
        const user = fromJS(action.edge);
        mutableState.update("connectedUsers", (myList) =>
          myList.filter((x) => user.id !== x.id)
        );
      });
    case STOP_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", false);
        mutableState.set("initialLoadingCvr", false);
      });
    default:
      return state;
  }
}
