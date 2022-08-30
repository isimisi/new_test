/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from "axios";
import * as notification from "@redux/constants/notifConstants";
import { baseUrl, authHeader, genericErrorMessage } from "@api/constants";

import { changeCondition } from "../../Alerts/reducers/alertActions";
import { changeCondition as outputAddCondition } from "../../Outputs/reducers/outputActions";
import * as types from "./conditionConstants";
import { User } from "@auth0/auth0-react";
import { History } from "history";
import { ConditionEdgeData } from "@customTypes/reactFlow";
import { ThunkDispatch } from "redux-thunk";
import {
  HistoryState,
  IImmutableConditionState,
  TCustomEdge,
  TCustomNode,
} from "@customTypes/reducers/conditions";
import { ConditionActions } from "./conditionConstants";
const CONDITIONS = "conditions";

export const getConditions =
  (user: User) =>
  async (dispatch: ThunkDispatch<IImmutableConditionState, any, ConditionActions>) => {
    dispatch({ type: types.GET_CONDITIONS_LOADING });
    const url = `${baseUrl}/${CONDITIONS}`;
    const header = authHeader(user);
    try {
      const response = await axios.get(url, header);
      const conditions = response.data;
      dispatch({ type: types.GET_CONDITIONS_SUCCESS, conditions });
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.GET_CONDITIONS_FAILED, message });
    }
  };

export const postCondition =
  (user: User, history: History, fromContent = false) =>
  async (dispatch: ThunkDispatch<IImmutableConditionState, any, ConditionActions>) => {
    const url = `${baseUrl}/${CONDITIONS}`;
    const body = {};
    const header = authHeader(user);
    try {
      const response = await axios.post(url, body, header);
      const id = response.data;
      dispatch({ type: types.POST_CONDITION_SUCCESS });
      const place = history.location.pathname.split("/")[2];
      const placeId = history.location.pathname.split("/")[3];
      history.push(`/app/conditions/${id}`, { fromContent, place, placeId });
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.POST_CONDITION_FAILED, message });
    }
  };

export const addElements =
  (user: User, id: string, elements: Array<TCustomNode | TCustomEdge>) =>
  async (dispatch: ThunkDispatch<IImmutableConditionState, any, ConditionActions>) => {
    dispatch({ type: types.CONDITION_ADD_ELEMENTS_LOADING });
    const url = `${baseUrl}/${CONDITIONS}/addElements/${id}`;
    const body = { elements: JSON.stringify(elements) };
    const header = authHeader(user);
    try {
      const response = await axios.post(url, body, header);
      const { nodes, edges } = response.data;
      dispatch({ type: types.CONDITION_ADD_ELEMENTS_SUCCESS, nodes, edges });
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.CONDITION_ADD_ELEMENTS_FAILED, message });
    }
  };

export const showCondition =
  (user: User, id: string, setMetaOpen: React.Dispatch<React.SetStateAction<boolean>>) =>
  async (dispatch: ThunkDispatch<IImmutableConditionState, any, ConditionActions>) => {
    const url = `${baseUrl}/${CONDITIONS}/${id}`;
    const header = authHeader(user);

    try {
      const response = await axios.get(url, header);

      const { label, description, group, nodes, edges, tags } = response.data;

      if (
        (!label || label?.length === 0) &&
        (!description || description?.length === 0) &&
        !group
      ) {
        setMetaOpen(true);
      }

      dispatch({
        type: types.SHOW_CONDITION_SUCCESS,
        label,
        description,
        group,
        nodes,
        edges,
        tags,
      });
    } catch (error) {
      // @ts-ignore
      console.log(error.response);
      const message = genericErrorMessage;
      dispatch({ type: types.SHOW_CONDITION_FAILED, message });
    }
  };

export const getBuildTypeValueOptions =
  (user: User, group: string) =>
  async (dispatch: ThunkDispatch<IImmutableConditionState, any, ConditionActions>) => {
    const url = `${baseUrl}/${CONDITIONS}/buildTypeOptions?group=${group}`;
    const header = authHeader(user);
    try {
      const response = await axios.get(url, header);
      const buildTypeOptions = response.data;
      const { nodeAttributes, relationshipLabels } = buildTypeOptions;
      dispatch({
        type: types.GET_BUILD_TYPES_VALUES_SUCCESS,
        nodeAttributes,
        relationshipLabels,
      });
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.GET_BUILD_TYPES_VALUES_FAILED, message });
    }
  };

export const putConditionMeta =
  (
    user: User,
    id: string,
    label: string,
    description: string,
    group: string,
    tags: string,
    setMetaOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) =>
  async (dispatch: ThunkDispatch<IImmutableConditionState, any, ConditionActions>) => {
    const url = `${baseUrl}/${CONDITIONS}/${id}`;
    const body = {
      label,
      description,
      group,
      tags,
    };
    const header = authHeader(user);
    try {
      await axios.put(url, body, header);
      dispatch({ type: types.PUT_CONDITION_SUCCESS });
      setMetaOpen(false);
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.PUT_CONDITION_FAILED, message });
    }
  };

export const saveCondition =
  (
    user: User,
    condition_id: string,
    conditionZoom: number,
    conditionXPosition: number,
    conditionYPosition: number,
    nodes: string,
    history: History,
    conditionLabel: string
  ) =>
  async (dispatch: ThunkDispatch<any, any, any>) => {
    const url = `${baseUrl}/${CONDITIONS}/${condition_id}/position`;
    const body = {
      conditionZoom,
      conditionXPosition,
      conditionYPosition,
      nodes,
    };
    const header = authHeader(user);

    try {
      await axios.put(url, body, header);
      const message = "Vi har gemt dit scenarie";

      if (((history?.location?.state as HistoryState) || null)?.fromContent) {
        if ((history.location.state as HistoryState).place === "outputs") {
          dispatch(outputAddCondition({ id: condition_id, value: conditionLabel }, null));
        } else {
          dispatch(changeCondition({ id: condition_id, value: conditionLabel }, null));
        }

        history.push(
          `/app/${(history.location.state as HistoryState).place}/${
            (history.location.state as HistoryState).placeId
          }`,
          { fromCondition: true }
        );
      } else {
        dispatch({ type: types.SAVE_CONDITION_SUCCESS, message });
        history.push(`/app/${CONDITIONS}`);
      }
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.SAVE_CONDITION_FAILED, message });
    }
  };

export const deleteCondition =
  (user: User, id: string, title: string) =>
  async (dispatch: ThunkDispatch<IImmutableConditionState, any, ConditionActions>) => {
    const url = `${baseUrl}/${CONDITIONS}/${id}`;
    const header = authHeader(user);
    try {
      await axios.delete(url, header);
      const message = `Du har slettet ${title}`;
      dispatch({ type: types.DELETE_CONDITION_SUCCESS, message });
      dispatch(getConditions(user));
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.DELETE_CONDITION_FAILED, message });
    }
  };

export const getNodes =
  (user: User, group: string) =>
  async (dispatch: ThunkDispatch<IImmutableConditionState, any, ConditionActions>) => {
    const url = `${baseUrl}/nodes/workspace?group=${group}&type=condition`;
    const header = authHeader(user);
    try {
      const response = await axios.get(url, header);
      const nodes = response.data;
      dispatch({ type: types.GET_NODE_VALUES_SUCCESS, nodes });
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.GET_NODE_VALUES_FAILED, message });
    }
  };

export const postNode =
  (
    user: User,
    condition_id: string,
    node_id: number | null,
    nodeLabel: string | null,
    values: string,
    x,
    y,
    close: () => void
  ) =>
  async (dispatch: ThunkDispatch<IImmutableConditionState, any, ConditionActions>) => {
    const url = `${baseUrl}/conditionNodes`;
    const body = {
      condition_id,
      node_id,
      nodeLabel,
      "x-value": x,
      "y-value": y,
      values,
    };
    const header = authHeader(user);

    try {
      const response = await axios.post(url, body, header);
      const node = response.data;
      dispatch({ type: types.CONDITION_POST_NODE_SUCCESS, node });
      close();
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.CONDITION_POST_NODE_FAILED, message });
    }
  };

export const putNode =
  (
    user: User,
    conditionNodeId: string,
    node_id: number,
    nodeLabel: string,
    nodeValues: string,
    deletedConditionValues: string,
    close: () => void
  ) =>
  async (dispatch: ThunkDispatch<IImmutableConditionState, any, ConditionActions>) => {
    const url = `${baseUrl}/conditionNodes/${conditionNodeId}`;
    const body = {
      node_id,
      nodeLabel,
      nodeValues,
      deletedConditionValues,
    };
    const header = authHeader(user);

    try {
      const response = await axios.put(url, body, header);
      const node = response.data;
      dispatch({ type: types.CONDITION_PUT_NODE_SUCCESS, node });
      close();
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.CONDITION_PUT_NODE_FAILED, message });
    }
  };

export const postEdge =
  (user: User, condition_id: string, edge: ConditionEdgeData, close: () => void) =>
  async (dispatch: ThunkDispatch<IImmutableConditionState, any, ConditionActions>) => {
    const url = `${baseUrl}/conditionRelationships`;
    const body = {
      condition_id,
      source_id: edge.source,
      target_id: edge.target,
      source_handle: edge.sourceHandle,
      target_handle: edge.targetHandle,
      relationship_id: edge.relationship_id,
      relationshipLabel: edge.relationshipLabel,
      comparison_type: edge.comparisonType,
      comparison_value: edge.comparisonValue,
      type: edge.relationshipType,
    };
    const header = authHeader(user);

    try {
      const response = await axios.post(url, body, header);
      const responseEdge = response.data;
      dispatch({ type: types.CONDITION_POST_EDGE_SUCCESS, edge: responseEdge });
      close();
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.CONDITION_POST_EDGE_FAILED, message });
    }
  };

export const putEdge =
  (
    user: User,
    edgeId: string,
    relationship_id: string,
    relationshipLabel: string,
    comparison_type: string,
    comparison_value: string,
    type: string,
    close: () => void
  ) =>
  async (dispatch: ThunkDispatch<IImmutableConditionState, any, ConditionActions>) => {
    const url = `${baseUrl}/conditionRelationships/${edgeId}`;
    const body = {
      relationship_id,
      relationshipLabel,
      comparison_type,
      comparison_value,
      type,
    };
    const header = authHeader(user);

    try {
      const response = await axios.put(url, body, header);
      const edge = response.data;
      dispatch({ type: types.CONDITION_PUT_EDGE_SUCCESS, edge });
      close();
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.CONDITION_PUT_EDGE_FAILED, message });
    }
  };

export const getRelationships =
  (user: User, group: string) =>
  async (dispatch: ThunkDispatch<IImmutableConditionState, any, ConditionActions>) => {
    const url = `${baseUrl}/relationships/workspace?group=${group}&type=condition`;
    const header = authHeader(user);
    try {
      const response = await axios.get(url, header);
      const relationships = response.data;
      dispatch({ type: types.GET_RELATIONSHIP_VALUES_SUCCESS, relationships });
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.GET_RELATIONSHIP_VALUES_FAILED, message });
    }
  };

export const getGroupDropDown =
  (user) =>
  async (dispatch: ThunkDispatch<IImmutableConditionState, any, ConditionActions>) => {
    const url = `${baseUrl}/groups/dropDownValues`;
    const header = authHeader(user);
    try {
      const response = await axios.get(url, header);
      const groups = response.data;
      dispatch({ type: types.GET_GROUP_DROPDOWN_SUCCESS, groups });
    } catch (error) {
      const message = genericErrorMessage;
      dispatch({ type: types.GET_GROUP_DROPDOWN_FAILED, message });
    }
  };

export const titleChange = (title) => ({
  type: types.TITLE_CHANGE_CONDITION,
  title,
});

export const descriptionChange = (description) => ({
  type: types.DESCRIPTION_CHANGE_CONDITION,
  description,
});

export const addGroup = (group) => ({
  type: types.ADD_GROUP,
  group,
});

export const addRelationshipToList = (relationship) => ({
  type: types.CONDITION_RELATIONSHIP_ADD_TO_LIST,
  relationship,
});

export const addNodeToList = (node) => ({
  type: types.CONDITION_NODE_ADD_TO_LIST,
  node,
});

export const addAttributToList = (attribut) => ({
  type: types.CONDITION_NODE_ATTRIBUT_ADD_TO_LIST,
  attribut,
});

export const changeTags = (tags) => ({
  type: types.CHANGE_TAGS,
  tags,
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF,
};

export const changeNodes = (nodes: TCustomNode[]) => ({
  type: types.CHANGE_NODES,
  nodes,
});

export const changeEdges = (edges: TCustomEdge[]) => ({
  type: types.CHANGE_EDGES,
  edges,
});
