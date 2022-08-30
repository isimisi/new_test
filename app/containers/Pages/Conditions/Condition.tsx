/* eslint-disable no-plusplus */
import React, { useState, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionMode
} from "react-flow-renderer";
import { useAppDispatch, useAppSelector } from "@hooks/redux";

import Items from "@components/Flow/Actions/Items/ConditionItems";
import CustomNode from "@components/Workspace/Node/CustomNode";
import ConditionDefineEdge from "@components/Condition/Edge/DefineEdge";
import ConditionDefineNode from "@components/Condition/Node/DefineNode";
import ConditionMeta from "@components/Condition/ConditionMeta";
import Notification from "@components/Notification/Notification";
import PropTypes from "prop-types";
import { useCutCopyPaste } from "@hooks/useCutCopyPaste";
import { useHistory } from "react-router-dom";
import { getId } from "@api/constants";
import styles from "./conditions-jss";
import { reducer, comparisonsOptions } from "./constants";
import useNode from "@hooks/condition/useNode";
import useEdge from "@hooks/condition/useEdge";

import {
  closeNotifAction,
  titleChange,
  descriptionChange,
  addGroup,
  showCondition,
  putConditionMeta,
  changeTags
} from "./reducers/conditionActions";
import { useAuth0, User } from "@auth0/auth0-react";
import useMove from "@hooks/flow/useMove";
import useInit from "@hooks/flow/useInit";
import Controls from "@components/Flow/Actions/Controls";
import useFlowGenerics from "@hooks/flow/useFlowGenerics";

import { proOptions } from "@pages/Workspaces/constants";
import Collaborations from "@components/Flow/Actions/Collaborations";
import Meta from "@components/Flow/Actions/Meta";
import useMeta from "@hooks/flow/useMeta";
import "@pages/Workspaces/workspace.css";
import useAutoSave from "@hooks/condition/useAutoSave";
import { HistoryState } from "@customTypes/reducers/conditions";
import useChangeElements from "@hooks/condition/useChangeElements";
import CustomEdge from "@components/Workspace/Edge/CustomEdge";
import useItemSidePanel from "@hooks/flow/itemPanel";

const BASE_BG_GAP = 32;
const BASE_BG_STROKE = 1;

const nodeTypes = { custom: CustomNode };
const edgeTypes = {
  custom: CustomEdge
};

function Condition(props) {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const user = useAuth0().user as User;
  const history = useHistory();
  const reactFlowContainer = useRef(null);

  const id = getId(history) as string;
  const [metaOpen, setMetaOpen] = useState(false);

  const relationships = useAppSelector((state) =>
    state[reducer].get("relationships")
  ).toJS();
  const nodes = useAppSelector((state) => state[reducer].get("nodes")).toJS();
  const nodeElements = useAppSelector((state) =>
    state[reducer].get("nodeElements")
  ).toJS();
  const edgeElements = useAppSelector((state) =>
    state[reducer].get("edgeElements")
  ).toJS();
  const label = useAppSelector((state) => state[reducer].get("label"));
  const description = useAppSelector((state) =>
    state[reducer].get("description")
  );
  const group = useAppSelector((state) => state[reducer].get("group"));
  const groupsDropDownOptions = useAppSelector((state) =>
    state[reducer].get("groupsDropDownOptions")
  ).toJS();
  const nodeAttributes = useAppSelector((state) =>
    state[reducer].get("nodeAttributes")
  ).toJS();
  const messageNotif = useAppSelector((state) => state[reducer].get("message"));
  const tagOptions = useAppSelector((state) => state.tags.get("tags")).toJS();
  const tags = useAppSelector((state) =>
    state[reducer].get("conditionTags")
  )?.toJS();
  const handleVisability = useAppSelector((state) =>
    state.workspace.get("handleVisability")
  );

  const { onMove, currentZoom } = useMove();

  const initFunc = () => dispatch(showCondition(user, id, setMetaOpen));
  const { rfInstance, onInit } = useInit(initFunc);

  const { reactFlowDimensions, toggleSubMenu } = useFlowGenerics(
    reactFlowContainer,
    dispatch,
    user,
    group,
    true
  );

  const { onConditionSave } = useAutoSave(
    rfInstance,
    user,
    id,
    dispatch,
    history,
    label
  );

  const {
    handleAutoLayout,
    handleImage,

    snapToGrid,
    setSnapToGrid,
    handleVisabilityChange
  } = useMeta(
    dispatch,
    nodeElements,
    edgeElements,
    reactFlowContainer,
    label,
    handleVisability,
    user,
    id
  );

  const {
    onNodeClick,
    defineNodeOpen,
    handleNodeSave,
    closeNode,
    nodeLabel,
    isUpdatingNode,
    handleChangeLabel: handleChangeLabelNode,
    handleNodeChange,
    conditionValues,
    addConditionValues,
    deleteConditionValue
  } = useNode(dispatch, user, rfInstance, reactFlowDimensions, id, nodes);

  const {
    onEdgeClick,
    handleRelationshipSave,
    defineEdgeOpen,
    closeEdge,
    relationshipLabel,
    handleChangeLabelEdge,
    relationshipType,
    handleTypeChange,
    comparisonType,
    handleComparisonTypeChange,
    comparisonValue,
    handleComparisonValueChange,
    isUpdatingEdge,
    onConnect
  } = useEdge(dispatch, user, relationships, id);

  const { onNodesChange, onEdgesChange } = useChangeElements(
    dispatch,
    nodeElements,
    edgeElements
  );

  const backlink = !(history?.location?.state as HistoryState)?.fromContent
    ? "/app/conditions"
    : `/app/${(history.location.state as HistoryState)?.place}/${
        (history.location.state as HistoryState)?.placeId
      }`;

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    if (reactFlowContainer && rfInstance) {
      /* @ts-ignore */ const reactFlowBounds =
        reactFlowContainer.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const position = rfInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      });

      if (type === "custom") {
        closeNode();

        handleNodeSave(position.x, position.y, true);
      }
    }
  };

  const { cursor, mouseActive, toggleMouse, toggleNode, nodeActive } =
    useItemSidePanel();

  return (
    <div style={{ cursor }}>
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
      />
      <div className={classes.root} ref={reactFlowContainer}>
        <ReactFlow
          proOptions={proOptions}
          nodes={nodeElements}
          edges={edgeElements}
          minZoom={0.3}
          maxZoom={3}
          onDrop={onDrop}
          onDragOver={onDragOver}
          // onNodesDelete={onNodesDelete}
          // onEdgesDelete={onEdgesDelete}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onMove={onMove}
          onInit={onInit}
          connectionMode={ConnectionMode.Loose}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          snapToGrid={snapToGrid}
          snapGrid={[BASE_BG_GAP / currentZoom, BASE_BG_GAP / currentZoom]}
        >
          <Collaborations />
          <Meta
            label={label}
            setMetaOpen={setMetaOpen}
            handleVisabilityChange={handleVisabilityChange}
            handleVisability={handleVisability}
            setSnapToGrid={setSnapToGrid}
            snapToGrid={snapToGrid}
            handleAutoLayout={handleAutoLayout}
            handleOpenMenu={toggleSubMenu}
            handleImage={handleImage}
            backLink={backlink}
          />
          <Items
            toggleNode={toggleNode}
            mouseActive={mouseActive}
            nodeActive={nodeActive}
            toggleMouse={toggleMouse}
            zoom={currentZoom}
          />
          <Controls currentZoom={currentZoom} reactFlowInstance={rfInstance} />
          <Background
            variant={BackgroundVariant.Lines}
            gap={BASE_BG_GAP / currentZoom}
            size={BASE_BG_STROKE / currentZoom}
          />
        </ReactFlow>
      </div>
      <ConditionMeta
        open={metaOpen}
        label={label}
        description={description}
        group={group}
        labelChange={(e) => dispatch(titleChange(e.target.value))}
        descriptionChange={(e) => dispatch(descriptionChange(e.target.value))}
        addGroup={(_group) => dispatch(addGroup(_group.value))}
        groupsDropDownOptions={groupsDropDownOptions}
        onSave={() =>
          dispatch(
            putConditionMeta(
              user,
              id,
              label,
              description,
              group,
              JSON.stringify(tags),
              setMetaOpen
            )
          )
        }
        closeForm={() => setMetaOpen(false)}
        tagOptions={tagOptions}
        tags={tags}
        changeTags={(_tags) => dispatch(changeTags(_tags))}
      />

      {defineEdgeOpen && (
        <ConditionDefineEdge
          open={defineEdgeOpen}
          close={closeEdge}
          relationships={relationships}
          relationshipLabel={relationshipLabel}
          handleChangeLabel={handleChangeLabelEdge}
          type={relationshipType}
          handleTypeChange={handleTypeChange}
          handleSave={handleRelationshipSave}
          comparisonsOptions={comparisonsOptions}
          comparisonType={comparisonType}
          handleComparisonTypeChange={handleComparisonTypeChange}
          comparisonValue={comparisonValue}
          handleComparisonValueChange={handleComparisonValueChange}
          isUpdatingElement={isUpdatingEdge}
          // handleDeleteEdge={() => elementToUpdate && onElementsRemove([elementToUpdate])}
        />
      )}

      {defineNodeOpen && (
        <ConditionDefineNode
          open={defineNodeOpen}
          close={closeNode}
          nodes={nodes}
          nodeLabel={nodeLabel}
          handleChangeLabel={handleChangeLabelNode}
          handleNodeSave={handleNodeSave}
          handleNodeChange={handleNodeChange}
          conditionValues={conditionValues}
          nodeAttributes={nodeAttributes}
          comparisonsOptions={comparisonsOptions}
          addConditionValue={addConditionValues}
          deleteConditionValue={deleteConditionValue}
          isUpdatingElement={isUpdatingNode}
          handleDeleteNode={
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            () => {} // nodeToUpdate && onNodesDelete([nodeToUpdate as TCustomNode], true)
          }
        />
      )}
    </div>
  );
}

Condition.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Condition);
