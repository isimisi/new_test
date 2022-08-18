/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import React, {
  useState, useCallback, useRef
} from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import ReactFlow, {
  Background,
  Node,
  ConnectionMode,
  BackgroundVariant,
  ReactFlowInstance,
} from 'react-flow-renderer10';

import useMouse from '@react-hook/mouse-position';

import PropTypes from 'prop-types';
import {
  useHistory
} from 'react-router-dom';
import { useAuth0, User } from "@auth0/auth0-react";

import SignWorkspace from '@components/Workspace/Modals/SignWorkspace';

import { useCutCopyPaste } from '@hooks/useCutCopyPaste';
import { getPlanId } from "@helpers/userInfo";
import Notification from '@components/Notification/Notification';

import { getId, encryptId } from '@api/constants';
import AlertModal from '@components/Alerts/AlertModal';
import WorkspaceMeta from '@components/Workspace/Modals/WorkspaceMeta';
import InternationalStructureAlert from '@components/Workspace/Modals/InternationalStructureAlert';

import DefineEdge from '@components/Workspace/Edge/DefineEdge';
import DefineNode from '@components/Workspace/Node/DefineNode';
import NodePopper from '@components/Workspace/Node/Popper';
import EdgePopper from '@components/Workspace/Edge/Popper';
import AlertLog from '@components/Alerts/AlertLog';
import PaneContextMenu from '@components/Workspace/ContextMenu/PaneContextMenu';
import CvrDialog from '@components/DialogModal/CvrDialog';
import MapTypesForErst from '@components/Workspace/Modals/MapTypesForErst';
import CompanyDataModel from '@components/Workspace/CompanyData/CompanyDataModel';
import AddressInfoModel from '@components/Workspace/Modals/AddressInfoModel';
import ShareModal from '@components/Flow/Share/ShareModal';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import RelationshipModal from '@components/Workspace/Modals/RelationshipModal';
import NodeContextMenu from '@components/Workspace/ContextMenu/NodeContextMenu';
import { useTranslation } from 'react-i18next';
import useContextMenu from '@hooks/useContextMenu';
import useWorkspaceHotKeys from '@hooks/useWorkspaceHotKeys';
import SelectionContextMenu from '@components/Workspace/ContextMenu/SelectionContextMenu';
import styles from './workspace-jss';
import {
  reducer,
  proOptions,
  BASE_BG_GAP,
  BASE_BG_STROKE,
} from './constants';
import {
  labelChange, descriptionChange,
  addGroup, putWorkspace, closeNotifAction,
  showWorkspace, addWorkspaceNodeToList,
  addEdgeToList, shareWorkspace, shareOrgChange,
  setShowCompanyData, setShowAddressInfo, handleRunIntro,
  mapUncertainCompanies, changeTags, addElements,
  getCompanyData, getAddressInfo,
  stopLoading, deleteWorkspaceEdges, deleteWorkspaceNodes, signWorkspace,
} from './reducers/workspaceActions';
import './workspace.css';

import Controls from '@components/Flow/Actions/Controls10';
import Items from '@components/Flow/Actions/Items';
import Meta from '@components/Flow/Actions/Meta10';
import Collaboration from '@components/Flow/Actions/Collaborations';
import useFlowContextMenus from '@hooks/flow/flowContexts';
import useItemSidePanel from '@hooks/flow/itemPanel';
import useDoubbleClick from '@hooks/flow/doubbleClick';
import Loader from '@components/Loading/LongLoader';
import { NodeData, TCustomEdge, TCustomNode } from '@customTypes/reducers/workspace';
import useExcelExport from '@hooks/workspace/useExcelExport';
import useMove from '@hooks/flow/useMove';
import useInit from '@hooks/flow/useInit';
import useAlerts from '@hooks/workspace/useAlerts';
import useMouseLoading from '@hooks/flow/useMouseLoading';
import useFlowGenerics from '@hooks/flow/useFlowGenerics';
import usePane from '@hooks/flow/usePane';
import useCvr from '@hooks/workspace/useCvr';
import useNode from '@hooks/workspace/useNode';
import useEdge from '@hooks/workspace/useEdge';
import useMeta from '@hooks/flow/useMeta';
import useChangeElements from '@hooks/workspace/useChangeElements';
import CustomNode from "@components/Workspace/Node/CustomNode";
import StickyNoteNode from "@components/Workspace/Node/StickyNoteNode";
import ControlPoint from "@components/Workspace/Node/ControlPoint";
import CustomEdge from "@components/Workspace/Edge/CustomEdge";
import useAutoSave from '@hooks/workspace/useAutoSave';
import Signing from '@components/Workspace/Public/Signing';

export const nodeTypes = {
  custom: CustomNode,
  sticky: StickyNoteNode,
  controlPoint: ControlPoint
};

export const edgeTypes = {
  custom: CustomEdge
};

/**
 * pub is related to wheter or not the workspace is public.
 * Thus it will be avaialable on a public route.
 * There is some things that is different why the pub will be used in a lot of ternary operators,
 * if we do not want the logic in public
 * */

const Workspace = (props) => {
  const { classes, pub } = props;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const theme = useTheme();
  const id = getId(history) as string;
  const reactFlowContainer = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  const mouse = useMouse(reactFlowContainer, { fps: 10, enterDelay: 100, leaveDelay: 100 });

  const { show: showContextMenu, setShow: setShowContextMenu } = useContextMenu();

  const user = useAuth0().user as User;
  const plan_id = getPlanId(user);


  // REDUX
  const relationships = useAppSelector(state => state[reducer].get('relationships'));
  const nodes = useAppSelector(state => state[reducer].get('nodes')).toJS();

  const handleVisability = useAppSelector(state => state[reducer].get('handleVisability'));

  const nodeElements: TCustomNode[] = useAppSelector(state => state[reducer].get('nodeElements')).toJS();
  const edgeElements: TCustomEdge[] = useAppSelector(state => state[reducer].get('edgeElements')).toJS();
  // const connectedUsers = useAppSelector(state => state[reducer].get('connectedUsers')).toJS();
  const label = useAppSelector(state => state[reducer].get('label'));
  const description = useAppSelector(state => state[reducer].get('description'));
  const group = useAppSelector(state => state[reducer].get('group'));
  const shareOrg = useAppSelector(state => state[reducer].get('shareOrg'));

  const groupsDropDownOptions = useAppSelector(state => state[reducer].get('groupsDropDownOptions')).toJS();
  const attributesDropDownOptions = useAppSelector(state => state[reducer].get('attributesDropDownOptions'));
  const messageNotif = useAppSelector(state => state[reducer].get('message'));
  const loading = useAppSelector(state => state[reducer].get('loading'));
  const initialLoading = useAppSelector(state => state[reducer].get('initialLoading'));
  const initialLoadingCvr = useAppSelector(state => state[reducer].get('initialLoadingCvr'));
  const mouseLoading = useAppSelector(state => state[reducer].get('mouseLoading'));

  const companyData = useAppSelector(state => state[reducer].get('companyData'))?.toJS();
  const addressInfo = useAppSelector(state => state[reducer].get('addressInfo'));
  const signed = useAppSelector(state => state[reducer].get('signed'));
  const signedBy = useAppSelector(state => state[reducer].get('signedBy'));
  const showCompanyData = useAppSelector(state => state[reducer].get('showCompanyData'));
  const showAddressInfo = useAppSelector(state => state[reducer].get('showAddressInfo'));
  const editable = useAppSelector(state => state[reducer].get('editable'));


  // const runIntro = useAppSelector(state => state[reducer].get('runIntro'));
  // const introStepIndex = useAppSelector(state => state[reducer].get('introStepIndex'));

  const uncertainCompanies = useAppSelector(state => state[reducer].get('uncertainCompanies'))?.toJS();
  const tagOptions = useAppSelector(state => state.tags.get('tags')).toJS();
  const tags = useAppSelector(state => state[reducer].get('specificWorkspaceTags'))?.toJS();

  const { reactFlowDimensions, toggleSubMenu } = useFlowGenerics(reactFlowContainer, dispatch, user, group);

  const [metaOpen, setMetaOpen] = useState(false);

  const {
    handleAlerts,
    alertId,
    alerts,
    setAlertId,
    highlightAlertItems,
    removeHighlightAlert,
    alertOpen,
    setAlertOpen
  } = useAlerts();
  const { onMove, currentZoom } = useMove();

  const initFunc = (_reactFlowInstance: ReactFlowInstance<any, any>) => dispatch(
    showWorkspace(user, id as string, setMetaOpen, handleAlerts, _reactFlowInstance)
  );
  const { rfInstance, onInit } = useInit(initFunc);


  const [shareModalOpen, setShareModalOpen] = useState(false);
  const closeShareModal = () => setShareModalOpen(false);
  const [showAlertLog, setShowAlertLog] = useState(false);

  const { onWorkspaceSave, onMouseLeave } = useAutoSave(
    rfInstance,
    user,
    id,
    dispatch
  );

  const {
    showCvrModal,
    showMapErst,
    setErstTypes,
    showInternationalDisclaimer,
    closeInternationalDisclaimer,
    onConfirm,
    setShowCvrModal,
    handleUncertainCompanies,
    setShowMapErst,
    erstTypes
  } = useCvr(
    dispatch,
    useAppSelector,
    id as string,
    t,
    user,
    nodes,
    relationships,
    onWorkspaceSave,
  );

  const {
    onNodeClick,
    defineNodeOpen,
    nodePopperRef,
    showNodeRelations,
    activeNodeRelations,
    handleChangeLabelNode,
    handleNodeFigur,
    handleChangeAttributes,
    handelRemoveAttributes,
    handleNodeColorChange,
    handleBorderColorChange,
    updateNodeDisplayName,
    handleNodeSave,
    handleHideNodePopper,
    setDefineNodeOpen,
    setNodePopperRef,
    setIsUpdatingNode,
    setNodeToUpdate,
    handleVisabilityChange,
    handleShowNodeRelations,
    closeNode,
    handleShowNodePopper,
    nodeLabel,
    attributes,
    nodeColor,
    handleChangeNodeColor,
    nodeBorderColor,
    nodeLabelColor,
    handleLabelColorChange,
    nodeDisplayName,
    nodeFigur,
    isUpdatingNode,
    nodeToUpdate,
    handleDisplayNameChange,
    showNodePopper,
    handlePostSticky
  } = useNode(
    dispatch,
    plan_id,
    t,
    handleVisability,
    user,
    rfInstance,
    reactFlowContainer,
    reactFlowDimensions,
    id,
    handleAlerts,
    signed,
    nodes,
    setShowContextMenu,
    mouse
  );

  const {
    edgePopperRef,
    defineEdgeOpen,
    updateEdgeDisplayName,
    handleNoLabelDoubleClick,
    handleRelationshipSave,
    handleChangeLabel,
    handleChangeValue,
    handleTypeChange,
    handleColorChange,
    handleShowArrowChange,
    handleAnimatedLineChange,
    handleShowLabelChange,
    handleLineThroughChange,
    handleHideEdgePopper,
    setEdgePopperRef,
    setIsUpdatingEdge,
    setEdgeToUpdate,
    setDefineEdgeOpen,
    handleShowEdgePopper,
    onConnect,
    onEdgeClick,
    closeDefineEdge,
    relationshipLabel,
    relationshipValue,
    relationshipType,
    relationshipColor,
    showArrow,
    animatedLine,
    showLabel,
    lineThrough,
    isUpdatingEdge,
    edgeToUpdate,
    showEdgePopper,
    edgePopperComponentRef
  } = useEdge(
    dispatch,
    user,
    relationships,
    handleAlerts,
    id,
    signed,
    plan_id,
    t
  );

  const {
    removeNodeTextTarget,
    onNodeDoubleClick,
    onEdgeDoubleClick,
    removeEdgeTextTarget
  } = useDoubbleClick(updateNodeDisplayName, updateEdgeDisplayName, relationships, handleHideEdgePopper, handleHideNodePopper, handleNoLabelDoubleClick);

  const hideContext = useCallback(() => {
    handleHideNodePopper();
    handleHideEdgePopper();

    removeNodeTextTarget();
    removeEdgeTextTarget();

    setShowContextMenu(false);
  }, []);

  const { onNodesChange, onEdgesChange } = useChangeElements(dispatch, nodeElements, edgeElements);


  const removeAllUpdatingRefference = useCallback(() => {
    removeNodeTextTarget();
    removeEdgeTextTarget();
    setNodePopperRef(null);
    setEdgePopperRef(null);
    setIsUpdatingNode(false);
    setNodeToUpdate(null);
    setIsUpdatingEdge(false);
    setEdgeToUpdate(null);
    handleHideNodePopper();
    handleHideEdgePopper();
    setShowContextMenu(false);
  }, [removeNodeTextTarget, removeEdgeTextTarget]);

  const onNodesDelete = useCallback(
    (_nodes: TCustomNode[], changeNode?: boolean) => {
      if (_nodes.length === 1) {
        setDefineNodeOpen(false);
      }
      dispatch(deleteWorkspaceNodes(user, _nodes));

      if (changeNode) {
        onNodesChange(_nodes.map(n => ({ id: n.id, type: "remove" })));
      }

      removeAllUpdatingRefference();
    },
    [nodeElements, edgeElements],
  );


  const onEdgesDelete = useCallback(
    (_edges: TCustomEdge[], changeEdge?: boolean) => {
      if (_edges.length === 1) {
        setDefineEdgeOpen(false);
      }
      dispatch(deleteWorkspaceEdges(user, _edges));

      if (changeEdge) {
        onEdgesChange(_edges.map(e => ({ id: e.id, type: "remove" })));
      }

      removeAllUpdatingRefference();
    },
    [nodeElements, edgeElements],

  );


  const onElementClick = useCallback(
    () => {
      removeNodeTextTarget();
      handleHideEdgePopper();
      removeEdgeTextTarget();
      setShowContextMenu(false);
      setEdgePopperRef(null);
      setNodePopperRef(null);
      handleHideNodePopper();
    },
    [],
  );

  const handleNodeClick = useCallback((event: React.MouseEvent, node: TCustomNode, showFull?: boolean) => {
    onElementClick();
    onNodeClick(event, node, showFull);
  }, []);

  const handleEdgeClick = useCallback((event: React.MouseEvent, edge: TCustomEdge, showFull?: boolean) => {
    onElementClick();
    onEdgeClick(event, edge, showFull);
  }, []);


  const { handleExcel, loadingExcel } = useExcelExport(nodeElements, edgeElements, label);


  const _addElements = (elementsToAdd) => dispatch(addElements(user, id as string, elementsToAdd));
  const { cut, copy, paste } = useCutCopyPaste(nodeElements, edgeElements, onNodesDelete, onNodesChange, _addElements, mouse, rfInstance, reactFlowContainer, reactFlowDimensions);
  const { handleNodeContextMenu,
    handlePaneContextMenu,
    handleSelctionContextMenu,
    handleEdgeContextMenu,
    contextAnchor,
    contextNode,
    contextSelection,
    contextType } = useFlowContextMenus();

  const handleOpenCvr = useCallback(() => {
    dispatch(handleRunIntro(false));
    setShowCvrModal(true);
  }, []);

  const handleGetCompanyData = useCallback((_id) => {
    dispatch(getCompanyData(user, _id, setShowContextMenu, handleHideNodePopper, handleHideEdgePopper));
  }, [handleHideNodePopper, setShowContextMenu, user]);

  const { handleAutoLayout, handleImage, handlePowerpoint, snapToGrid, setSnapToGrid } = useMeta(dispatch, nodeElements, edgeElements, reactFlowContainer, label, user, id,);

  useWorkspaceHotKeys(
    setDefineNodeOpen,
    setShowContextMenu,
    handlePostSticky,
    handleVisabilityChange,
    setSnapToGrid,
    rfInstance,
    contextNode,
    handleShowNodeRelations,
    handleGetCompanyData,
    (_id) => dispatch(getAddressInfo(user, _id, setShowContextMenu)),
    handleOpenCvr,
    setShowAlertLog,
    history,
    id
  );


  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };


  const onDrop = (event) => {
    event.preventDefault();

    if (reactFlowContainer && rfInstance) {
      // @ts-ignore
      const reactFlowBounds = reactFlowContainer.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = rfInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });


      if (type === "sticky") {
        handlePostSticky(event, false, position.x, position.y);
      }
      if (type === "custom") {
        closeNode();

        handleNodeSave(position.x, position.y, true);
      }
    }
  };

  const { cursor, handleCursor, mouseActive, stickyActive, toggleMouse, toggleSticky, toggleNode, nodeActive } = useItemSidePanel();
  useMouseLoading(handleCursor, mouseLoading);

  const { interactive, paneContextNodeClick, onPaneClick } = usePane(
    removeAllUpdatingRefference,
    reactFlowContainer,
    rfInstance,
    stickyActive,
    handlePostSticky,
    nodeActive,
    closeNode,
    handleNodeSave,
    setShowContextMenu,
    signed,
    mouseActive
  );

  const showPopperAgain = useCallback(() => {
    if (edgePopperRef) {
      handleShowEdgePopper();
    }
    if (nodePopperRef) {
      handleShowNodePopper();
    }
  }, [edgePopperRef, nodePopperRef]);


  const handleShare = (firstName, lastName, email, phone, edit) => dispatch(shareWorkspace(user, id as string, firstName, lastName, email, phone, edit, setShareModalOpen));
  const [showSignWorkspace, setShowSignWorkspace] = useState(false);


  return (
    <div style={{ cursor }}>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <div className={pub ? classes.pubRoot : classes.root} ref={reactFlowContainer} onMouseLeave={onMouseLeave}>

        <ReactFlow
          proOptions={proOptions}
          nodes={nodeElements}
          edges={edgeElements}
          onNodesDelete={pub && !editable ? undefined : onNodesDelete}
          onEdgesDelete={pub && !editable ? undefined : onEdgesDelete}
          onNodesChange={pub && !editable ? undefined : onNodesChange}
          onEdgesChange={pub && !editable ? undefined : onEdgesChange}
          onConnect={onConnect}
          minZoom={0.3}
          maxZoom={3}

          onNodeDragStart={hideContext}
          onNodeDragStop={showPopperAgain}
          onMoveEnd={showPopperAgain}

          onSelectionDragStop={showPopperAgain}
          onConnectStart={removeAllUpdatingRefference}
          onDrop={pub && !editable ? undefined : onDrop}
          onDragOver={pub && !editable ? undefined : onDragOver}
          onDragStart={hideContext}
          onMoveStart={hideContext}
          onSelectionDragStart={hideContext}
          onPaneScroll={hideContext}
          onPaneClick={pub && !editable ? undefined : onPaneClick}
          onNodeDoubleClick={pub && !editable ? undefined : onNodeDoubleClick}
          onEdgeDoubleClick={pub && !editable ? undefined : onEdgeDoubleClick}
          nodesDraggable={interactive}
          nodesConnectable={interactive}
          elementsSelectable={interactive}
          selectNodesOnDrag={interactive}
          panOnDrag={interactive}
          zoomOnDoubleClick={interactive}
          zoomOnPinch={interactive}
          zoomOnScroll={interactive}
          onNodeContextMenu={pub && !editable ? undefined : handleNodeContextMenu}
          onPaneContextMenu={pub && !editable ? undefined : handlePaneContextMenu}
          onSelectionContextMenu={pub && !editable ? undefined : handleSelctionContextMenu}
          onEdgeContextMenu={pub && !editable ? undefined : handleEdgeContextMenu}
          snapToGrid={snapToGrid}
          snapGrid={[BASE_BG_GAP / currentZoom, BASE_BG_GAP / currentZoom]}

          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onMove={onMove}
          onInit={onInit}
          connectionMode={ConnectionMode.Loose}
          onNodeClick={pub && !editable ? undefined : handleNodeClick}
          onEdgeClick={pub && !editable ? undefined : handleEdgeClick}
        >
          {!signed && <div data-html2canvas-ignore="true">
            <Collaboration
              setShareModalOpen={setShareModalOpen}
              setShowSignWorkspace={pub && setShowSignWorkspace}
            />
            <Meta
              label={label}
              setMetaOpen={setMetaOpen}
              handleVisabilityChange={handleVisabilityChange}
              handlePowerpoint={handlePowerpoint}
              handleVisability={handleVisability}
              handleExcel={handleExcel}
              loadingExcel={loadingExcel}
              setSnapToGrid={setSnapToGrid}
              snapToGrid={snapToGrid}
              handleAutoLayout={handleAutoLayout}
              handleOpenMenu={toggleSubMenu}
              handleImage={handleImage}
              backLink="/app"
              pub={pub}
            />
            <Items
              toggleNode={toggleNode}
              defineNodeOpen={defineNodeOpen}
              handleOpenCvr={handleOpenCvr}
              setShowAlertLog={setShowAlertLog}
              showAlertLog={showAlertLog}
              history={history}
              id={id}
              mouseActive={mouseActive}
              stickyActive={stickyActive}
              nodeActive={nodeActive}
              toggleMouse={toggleMouse}
              toggleSticky={toggleSticky}
              zoom={currentZoom}
              pub={pub}
              editable={editable}
            />
            <Controls currentZoom={currentZoom} reactFlowInstance={rfInstance} />
          </div>}
          {handleVisability && !signed
               && (
                 <Background
                   variant={BackgroundVariant.Lines}
                   gap={BASE_BG_GAP / currentZoom}
                   size={BASE_BG_STROKE / currentZoom / 2}
                   color="#dadcdf"
                 />
               )}
        </ReactFlow>
        {(initialLoading || initialLoadingCvr) && (
          <>
            <div style={{
              width: '100%', height: '100%', backgroundColor: theme.palette.background.default, position: 'absolute', zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center"
            }}
            >
              <Loader bigFont />
            </div>
          </>
        )}
        {signed && <Signing signedBy={signedBy} id={id} />}
      </div>

      {metaOpen && <WorkspaceMeta
        open={metaOpen}
        label={label}
        description={description}
        group={group}
        tagOptions={tagOptions}
        tags={tags}
        changeTags={_tags => dispatch(changeTags(_tags))}
        labelChange={(e) => dispatch(labelChange(e.target.value))}
        descriptionChange={(e) => dispatch(descriptionChange(e.target.value))}
        addGroup={(_group) => dispatch(addGroup(_group.value))}
        groupsDropDownOptions={groupsDropDownOptions}
        shareOrg={shareOrg}
        handleShareOrg={() => dispatch(shareOrgChange)}
        onSave={() => dispatch(putWorkspace(
          user,
          id as string,
          label,
          description,
          group,
          JSON.stringify(tags),
          shareOrg,
          setMetaOpen))}
        closeForm={() => setMetaOpen(false)}
      />}
      {defineEdgeOpen && <DefineEdge
        open={defineEdgeOpen}
        close={closeDefineEdge}
        relationships={relationships}
        relationshipLabel={relationshipLabel}
        handleChangeLabel={handleChangeLabel}
        relationshipValue={relationshipValue}
        handleChangeValue={handleChangeValue}
        type={relationshipType}
        handleTypeChange={handleTypeChange}
        color={relationshipColor}
        handleColorChange={handleColorChange}
        showArrow={showArrow}
        handleShowArrowChange={handleShowArrowChange}
        animatedLine={animatedLine}
        handleAnimatedLineChange={handleAnimatedLineChange}
        showLabel={showLabel}
        handleShowLabelChange={handleShowLabelChange}
        lineThrough={lineThrough}
        handleLineThroughChange={handleLineThroughChange}
        handleSave={handleRelationshipSave}
        isUpdatingElement={isUpdatingEdge}
        handleDeleteEdge={() => edgeToUpdate && onEdgesDelete([edgeToUpdate as TCustomEdge], true)}
        loading={loading}
      />}
      {defineNodeOpen && (
        <DefineNode
          open={defineNodeOpen}
          close={closeNode}
          nodes={nodes}
          nodeLabel={nodeLabel}
          handleChangeLabel={handleChangeLabelNode}
          attributes={attributes}
          handleChangeAttributes={handleChangeAttributes}
          nodeColor={nodeColor}
          handleChangeColor={handleChangeNodeColor}
          nodeBorderColor={nodeBorderColor}
          handleBorderColorChange={handleBorderColorChange}
          nodeLabelColor={nodeLabelColor}
          handleLabelColorChange={handleLabelColorChange}
          handleNodeSave={handleNodeSave}
          nodeDisplayName={nodeDisplayName}
          nodeFigur={nodeFigur}
          handleNodeFigurChange={handleNodeFigur}
          isUpdatingElement={isUpdatingNode}
          elementToUpdate={nodeToUpdate}
          handleDisplayNameChange={handleDisplayNameChange}
          handleDeleteNode={() => nodeToUpdate && onNodesDelete([nodeToUpdate as TCustomNode], true)}
          loading={loading}
          attributesDropDownOptions={attributesDropDownOptions}
          handleRemoveAttributes={handelRemoveAttributes}
        />
      )}
      {(alertId || alertId === 0) && alerts[alertId] && (
        <AlertModal
          disabled={alerts[alertId]?.alert?.organization_id === 11}
          title={alerts[alertId]?.alert?.label}
          description={alerts[alertId]?.alert?.description}
          handleSeeCondition={() => {
            const location = window.location.href.replace(
              history.location.pathname,
              `/app/red%20flags/${encryptId(alerts[0]?.alert?.id)}`
            );
            const win = window.open(location, '_blank');
            win && win.focus();
          }
          }
          open={alertOpen}
          handleClose={() => {
            setAlertOpen(false);
            setAlertId(null);
          }}
        />
      )}
      {showAlertLog && <AlertLog
        open={showAlertLog}
        close={() => setShowAlertLog(false)}
        alerts={alerts}
        history={history}
        seeAlert={(index) => setAlertId(index)
        }
        highlightAlertItems={highlightAlertItems}
        removeHighlightAlert={removeHighlightAlert}
      />}
      {showCvrModal && <CvrDialog
        loading={loading}
        open={showCvrModal}
        handleClose={() => {
          setShowCvrModal(false);
          handleUncertainCompanies();
          dispatch(stopLoading);
        }}
        title={t('workspaces.load_from_CVR')}
        description={t('workspaces.search_for_a_company_or_CVR_number')}
        textFielLabel={t('workspaces.cvr_nr')}
        changeUncertainCompanies={handleUncertainCompanies}
        uncertainCompanies={uncertainCompanies}
        mapUncertainCompanies={(uncertainMapping) => dispatch(mapUncertainCompanies(user, id as string, uncertainMapping, erstTypes))}
        onConfirm={onConfirm}
      />}
      {showMapErst && <MapTypesForErst
        open={showMapErst}
        handleClose={() => setShowMapErst(false)}
        onConfirm={(types) => {
          setShowMapErst(false);
          setErstTypes(types);
        }}
        handleNodeChange={(_label) => {
          if (_label.__isNew__) {
            dispatch(addWorkspaceNodeToList({
              attributes: [],
              description: null,
              id: null,
              label: _label.value,
              style: '{"borderColor": {"a": 1, "b": 0, "g": 0, "r": 0}, "backgroundColor": {"a": 1, "b": 255, "g": 255, "r": 255}}'
            }));
          }
        }}
        handleRelationshipChange={(_label) => {
          if (_label.__isNew__) {
            dispatch(addEdgeToList({
              id: null,
              label: _label.value,
              description: null,
              values: [],
              style: '{"color": {"a": 1, "b": 0, "g": 0, "r": 0}'
            }));
          }
        }}
        initErstTypes={erstTypes}
        nodes={nodes}
        relationships={relationships}
      />}
      {companyData && Object.keys(companyData).length > 0 && <CompanyDataModel
        open={showCompanyData}
        close={() => dispatch(setShowCompanyData(false))}
        companyData={companyData}
      />}
      {showAddressInfo && <AddressInfoModel
        open={showAddressInfo}
        close={() => dispatch(setShowAddressInfo(false))}
        addressInfo={addressInfo}
      />}
      {shareModalOpen && <ShareModal
        open={shareModalOpen}
        loading={loading}
        close={closeShareModal}
        onShare={handleShare}
      />}
      {showNodeRelations &&
      <RelationshipModal
        open={showNodeRelations}
        close={handleShowNodeRelations}
        activeNodeRelations={activeNodeRelations}
        nodes={nodeElements}
        edges={edgeElements}
      />}

      {!signed && (
        <>
          <NodeContextMenu
            {...contextAnchor}
            contextNode={contextNode}
            contextType={contextType}
            show={showContextMenu}
            handleEdit={handleNodeClick}
            handleShowNodeRelations={handleShowNodeRelations}
            showCompanyInfo={handleGetCompanyData}
            getAddressInfo={(_id) => dispatch(getAddressInfo(user, _id, setShowContextMenu))}
            loading={loading}
            cut={cut}
            copy={copy}
            onElementsRemove={onNodesDelete}
          />
          <SelectionContextMenu
            {...contextAnchor}
            contextSelection={contextSelection}
            contextType={contextType}
            show={showContextMenu}
            cut={cut}
            copy={copy}
            onElementsRemove={onNodesDelete}
          />
          <PaneContextMenu
            {...contextAnchor}
            contextType={contextType}
            show={showContextMenu}
            paste={paste}
            nodeClick={paneContextNodeClick}
            stickyClick={handlePostSticky}
            handleShowGrid={handleVisabilityChange}
            handleVisability={handleVisability}
            handleSnapToGrid={() => setSnapToGrid(prevVal => !prevVal)}
            snapToGrid={snapToGrid}
            fitView={() => rfInstance?.fitView()}
          />
          {showInternationalDisclaimer && <InternationalStructureAlert open={showInternationalDisclaimer} close={closeInternationalDisclaimer} />}
          {showNodePopper && nodePopperRef && <NodePopper
            nodePopperRef={nodePopperRef}
            showNodePopper={showNodePopper}
            currentZoom={currentZoom}
            close={handleHideNodePopper}
            nodeBorderColor={nodeBorderColor}
            handleBorderColorChange={handleBorderColorChange}
            nodeLabelColor={nodeLabelColor}
            handleLabelColorChange={handleLabelColorChange}
            nodeColor={nodeColor}
            handleColorChange={handleNodeColorChange}
            nodes={nodes}
            nodeLabel={nodeLabel}
            handleChangeLabel={handleChangeLabelNode}
            handleNodeSave={handleNodeSave}
            editData={handleNodeClick}
            loading={loading}
            activeElement={nodeToUpdate as Node<NodeData>}
            getCompanyData={handleGetCompanyData}
            attributesDropDownOptions={attributesDropDownOptions}
            attributes={attributes}
            handleChangeAttributes={handleChangeAttributes}
            handelRemoveAttributes={handelRemoveAttributes}
            handleNodeFigur={handleNodeFigur}
            nodeFigur={nodeFigur}
            removeNodeTextTarget={removeNodeTextTarget}
          />}

          {showEdgePopper && edgePopperRef && <EdgePopper
            edgePopperRef={edgePopperRef}
            showEdgePopper={showEdgePopper}
            currentZoom={currentZoom}
            editData={handleEdgeClick}
            activeElement={edgeToUpdate}
            edgeLabel={relationshipLabel}
            relationships={relationships}
            relationshipLabel={relationshipLabel}
            handleChangeLabel={handleChangeLabel}
            handleEdgeSave={handleRelationshipSave}
            type={relationshipType}
            handleTypeChange={handleTypeChange}
            edgeColor={relationshipColor}
            handleColorChange={handleColorChange}
            showArrow={showArrow}
            handleShowArrowChange={handleShowArrowChange}
            animatedLine={animatedLine}
            handleAnimatedLineChange={handleAnimatedLineChange}
            showLabel={showLabel}
            handleShowLabelChange={handleShowLabelChange}
            lineThrough={lineThrough}
            handleLineThroughChange={handleLineThroughChange}
            handleDeleteEdge={() => edgeToUpdate && onEdgesDelete([edgeToUpdate as TCustomEdge], true)}
            handleHideEdgePopper={handleHideEdgePopper}
            popperComponentRef={edgePopperComponentRef}
          />}
        </>
      )}
      {showSignWorkspace && <SignWorkspace
        open={showSignWorkspace}
        closeForm={() => setShowSignWorkspace(false)}
        onSave={() => dispatch(signWorkspace(user, id, setShowSignWorkspace))}
      />}
    </div>
  );
};

Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
  pub: PropTypes.bool
};

Workspace.defaultProps = {
  pub: false
};

export default withStyles(styles)(Workspace);
