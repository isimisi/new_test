import { fromJS, List } from "immutable";
import { CLOSE_NOTIF } from "@redux/constants/notifConstants";
import {
  GET_CONDITIONS_LOADING,
  GET_CONDITIONS_SUCCESS,
  GET_CONDITIONS_FAILED,
  PUT_CONDITION_SUCCESS,
  PUT_CONDITION_FAILED,
  POST_CONDITION_SUCCESS,
  CHANGE_NODES,
  CHANGE_EDGES,
  POST_CONDITION_FAILED,
  GET_BUILD_TYPES_VALUES_SUCCESS,
  GET_BUILD_TYPES_VALUES_FAILED,
  SHOW_CONDITION_SUCCESS,
  SHOW_CONDITION_FAILED,
  DELETE_CONDITION_SUCCESS,
  DELETE_CONDITION_FAILED,
  TITLE_CHANGE_CONDITION,
  DESCRIPTION_CHANGE_CONDITION,
  ADD_GROUP,
  GET_GROUP_DROPDOWN_SUCCESS,
  GET_GROUP_DROPDOWN_FAILED,
  GET_NODE_VALUES_SUCCESS,
  GET_NODE_VALUES_FAILED,
  GET_RELATIONSHIP_VALUES_SUCCESS,
  GET_RELATIONSHIP_VALUES_FAILED,
  CONDITION_POST_NODE_SUCCESS,
  CONDITION_POST_NODE_FAILED,
  CONDITION_PUT_EDGE_SUCCESS,
  CONDITION_PUT_EDGE_FAILED,
  SAVE_CONDITION_SUCCESS,
  SAVE_CONDITION_FAILED,
  CONDITION_PUT_NODE_SUCCESS,
  CONDITION_PUT_NODE_FAILED,
  CONDITION_POST_EDGE_SUCCESS,
  CONDITION_POST_EDGE_FAILED,
  CONDITION_RELATIONSHIP_ADD_TO_LIST,
  CONDITION_NODE_ADD_TO_LIST,
  CONDITION_NODE_ATTRIBUT_ADD_TO_LIST,
  CHANGE_TAGS,
  CONDITION_ADD_ELEMENTS_SUCCESS,
  CONDITION_ADD_ELEMENTS_FAILED,
  CONDITION_ADD_ELEMENTS_LOADING,
  DELETE_CONDITION_NODES_LOADING,
  DELETE_CONDITION_NODES_SUCCESS,
  DELETE_CONDITION_NODES_FAILED,
  DELETE_CONDITION_EDGES_LOADING,
  DELETE_CONDITION_EDGES_SUCCESS,
  DELETE_CONDITION_EDGES_FAILED,
  ConditionActions,
} from "./conditionConstants";
import {
  ConditionState,
  IImmutableConditionState,
} from "@customTypes/reducers/conditions";

const initialState: ConditionState = {
  loading: false,
  conditions: List(),
  label: "",
  description: "",
  group: "",
  nodeElements: List(),
  edgeElements: List(),
  message: "",
  groupsDropDownOptions: List(),
  nodeAttributes: List(),
  relationshipLabels: List(),
  nodes: List(),
  relationships: List(),
  conditionTags: List(),
  mouseLoading: false,
};

const initialImmutableState: IImmutableConditionState = fromJS(initialState);
export default function reducer(
  state = initialImmutableState,
  action: ConditionActions
): IImmutableConditionState {
  switch (action.type) {
    case GET_CONDITIONS_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("loading", true);
      });
    case GET_CONDITIONS_SUCCESS:
      return state.withMutations((mutableState) => {
        const conditions = fromJS(action.conditions);
        mutableState.set("conditions", conditions);
        mutableState.set("loading", false);
      });
    case GET_CONDITIONS_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("loading", false);
      });
    case POST_CONDITION_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("label", "");
        mutableState.set("description", "");

        mutableState.set("group", "");
      });
    case POST_CONDITION_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case CONDITION_ADD_ELEMENTS_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("mouseLoading", true);
      });

    case CONDITION_ADD_ELEMENTS_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("mouseLoading", false);

        mutableState.update("nodeElements", (myList) =>
          // @ts-ignore
          myList.concat(fromJS(action.nodes))
        );
        mutableState.update("edgeElements", (myList) =>
          // @ts-ignore
          myList.concat(fromJS(action.edges))
        );
      });
    case CONDITION_ADD_ELEMENTS_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("mouseLoading", false);
      });
    case PUT_CONDITION_SUCCESS:
      return state.withMutations(() => {
        // do something
      });
    case PUT_CONDITION_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case SAVE_CONDITION_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case SAVE_CONDITION_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case SHOW_CONDITION_SUCCESS:
      return state.withMutations((mutableState) => {
        const label = fromJS(action.label);
        const description = fromJS(action.description);
        const group = fromJS(action.group);
        const nodes = fromJS(action.nodes);
        const edges = fromJS(action.edges);
        const tags = fromJS(action.tags);

        mutableState.set("label", label);
        mutableState.set("description", description);
        mutableState.set("group", group);
        mutableState.set("nodeElements", nodes);
        mutableState.set("edgeElements", edges);
        mutableState.set("conditionTags", tags);
      });
    case SHOW_CONDITION_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });

    case GET_BUILD_TYPES_VALUES_SUCCESS:
      return state.withMutations((mutableState) => {
        const nodeAttributes = fromJS(action.nodeAttributes);
        const relationshipLabels = fromJS(action.relationshipLabels);

        mutableState.set("nodeAttributes", nodeAttributes);
        mutableState.set("relationshipLabels", relationshipLabels);
      });
    case GET_BUILD_TYPES_VALUES_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case DELETE_CONDITION_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case DELETE_CONDITION_FAILED:
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
    case TITLE_CHANGE_CONDITION:
      return state.withMutations((mutableState) => {
        const title = fromJS(action.title);
        mutableState.set("label", title);
      });
    case DESCRIPTION_CHANGE_CONDITION:
      return state.withMutations((mutableState) => {
        const description = fromJS(action.description);
        mutableState.set("description", description);
      });
    case ADD_GROUP:
      return state.withMutations((mutableState) => {
        const group = fromJS(action.group);
        mutableState.set("group", group);
      });
    case CONDITION_POST_NODE_SUCCESS:
      return state.withMutations((mutableState) => {
        const node = fromJS(action.node);
        // @ts-ignore
        mutableState.update("nodeElements", (myList) => myList.push(node));
      });
    case CONDITION_POST_NODE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case CONDITION_PUT_NODE_SUCCESS:
      return state.withMutations((mutableState) => {
        // @ts-ignore
        const nodes = mutableState.get("nodeElements").toJS();
        const index = nodes.findIndex((e) => e.id === action.node.id);
        nodes[index] = action.node;

        mutableState.set("nodeElements", fromJS(nodes));
      });
    case CONDITION_PUT_NODE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case CONDITION_PUT_EDGE_SUCCESS:
      return state.withMutations((mutableState) => {
        // @ts-ignore
        const edges = mutableState.get("edgeElements").toJS();
        const index = edges.findIndex((e) => e.id === action.edge.id);
        edges[index] = action.edge;
        mutableState.set("edgeElements", fromJS(edges));
      });
    case CONDITION_PUT_EDGE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case CONDITION_POST_EDGE_SUCCESS:
      return state.withMutations((mutableState) => {
        const edge = fromJS(action.edge);
        // @ts-ignore
        mutableState.update("edgeElements", (myList) => myList.push(edge));
      });
    case CONDITION_POST_EDGE_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case DELETE_CONDITION_NODES_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("mouseLoading", true);
      });
    case DELETE_CONDITION_NODES_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("mouseLoading", false);
      });
    case DELETE_CONDITION_NODES_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("mouseLoading", false);
      });
    case DELETE_CONDITION_EDGES_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set("mouseLoading", true);
      });
    case DELETE_CONDITION_EDGES_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("mouseLoading", false);
      });
    case DELETE_CONDITION_EDGES_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
        mutableState.set("mouseLoading", false);
      });
    case CONDITION_RELATIONSHIP_ADD_TO_LIST:
      return state.withMutations((mutableState) => {
        const relationship = fromJS(action.relationship);
        // @ts-ignore
        mutableState.update("relationships", (myList) => myList.push(relationship));
      });
    case CONDITION_NODE_ADD_TO_LIST:
      return state.withMutations((mutableState) => {
        const node = fromJS(action.node);
        // @ts-ignore
        mutableState.update("nodes", (myList) => myList.push(node));
      });
    case CONDITION_NODE_ATTRIBUT_ADD_TO_LIST:
      return state.withMutations((mutableState) => {
        const attribut = fromJS(action.attribut);
        // @ts-ignore
        mutableState.update("nodeAttributes", (myList) => myList.push(attribut));
      });
    case CHANGE_TAGS:
      return state.withMutations((mutableState) => {
        const tags = fromJS(action.tags);
        mutableState.set("conditionTags", tags);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set("message", "");
      });
    case CHANGE_NODES:
      return state.withMutations((mutableState) => {
        mutableState.set("nodeElements", fromJS(action.nodes));
      });
    case CHANGE_EDGES:
      return state.withMutations((mutableState) => {
        mutableState.set("edgeElements", fromJS(action.edges));
      });
    default:
      return state;
  }
}
