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
  useState, useEffect, useCallback, useRef, MouseEvent, useMemo
} from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import ReactFlow, {
  Background,
  isNode,
  Node,
  ConnectionMode,
  BackgroundVariant,
  FlowElement,
  OnLoadParams,
  isEdge,
  Edge,
  Connection,
} from 'react-flow-renderer';


import useMouse from '@react-hook/mouse-position';
// import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import Typography from '@material-ui/core/Typography';
import logoBeta from '@images/logoBeta.svg';

import brand from '@api/dummy/brand';
import PropTypes from 'prop-types';
import {
  useHistory
} from 'react-router-dom';
import { useAuth0, User } from "@auth0/auth0-react";


import { useCutCopyPaste } from '@hooks/useCutCopyPaste';
import { toast } from 'react-toastify';
import { getPlanId } from "@helpers/userInfo";
import Notification from '@components/Notification/Notification';

import { getId, encryptId } from '@api/constants';
import connection from '@api/socket/SocketConnection';
import AlertModal from '@components/Alerts/AlertModal';
import CustomNode from '@components/Workspace/Node/CustomNode';
import ControlPoint from '@components/Workspace/Node/ControlPoint';

import StickyNoteNode from '@components/Workspace/Node/StickyNoteNode';
import WorkspaceMeta from '@components/Workspace/Modals/WorkspaceMeta';
import InternationalStructureAlert from '@components/Workspace/Modals/InternationalStructureAlert';
import CustomEdge from '@components/Workspace/Edge/CustomEdge';
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
import { openMenuAction, closeMenuAction, toggleAction } from '@redux/actions/uiActions';
import { NodeDropdownInstance } from '../../../types/reactFlow';
import styles from './workspace-jss';
import {
  reducer, initErstTypes, getLayoutedElements
} from './constants';
import {
  getRelationships, getNodes, postEdge, postNode,
  changeHandleVisability, labelChange, descriptionChange,
  addGroup, getGroupDropDown, putWorkspace, closeNotifAction,
  showWorkspace, saveWorkspace, deleteWorkspaceElement,
  putNode, putEdge, getAttributeDropDown, addWorkspaceNodeToList,
  addEdgeToList, addWorkspaceNodeAttributToList,
  cvrWorkspace, postSticky, showNotifAction,
  shareWorkspace, cvrSuccess, shareOrgChange,
  setShowCompanyData, setShowAddressInfo,
  handleRunIntro, uncertainCompaniesChange,
  mapUncertainCompanies, changeTags, addElements,
  getCompanyData, getAddressInfo, layoutElements,
  stopLoading, workspacePowerpoint,
  doNotShowInternationalDisclaimerAgain
} from './reducers/workspaceActions';
import './workspace.css';

import Controls from '@components/Flow/Actions/Controls';
import Items from '@components/Flow/Actions/Items';
import Meta from '@components/Flow/Actions/Meta';
import Collaboration from '@components/Flow/Actions/Collaborations';
import { RGBA, SelectChoice } from '@customTypes/data';

import { handleExport } from '@helpers/export/handleExport';
import useFlowContextMenus from '@hooks/flow/flowContexts';
import useItemSidePanel from '@hooks/flow/itemPanel';
import useDoubbleClick from '@hooks/flow/doubbleClick';
import Loader from '@components/Loading/LongLoader';


const nodeTypes = {
  custom: CustomNode,
  sticky: StickyNoteNode,
  controlPoint: ControlPoint
};

const initialAttribut = {
  label: null,
  value: ''
};

const BASE_BG_GAP = 32;
const BASE_BG_STROKE = 1;

interface Dimensions {
  height: number;
  width: number;
}

const Workspace = (props) => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const theme = useTheme();
  const id = getId(history);
  const reactFlowContainer = useRef(null);

  const [reactFlowDimensions, setReactFlowDimensions] = useState<Dimensions | null>(null);
  const [currentZoom, setCurrentZoom] = useState(1);
  const { t } = useTranslation();
  const mouse = useMouse(reactFlowContainer, { fps: 10, enterDelay: 100, leaveDelay: 100 });

  const { show: showContextMenu, setShow: setShowContextMenu } = useContextMenu();

  const user = useAuth0().user as User;
  const plan_id = getPlanId(user);


  // REDUX
  const relationships = useAppSelector(state => state[reducer].get('relationships'));
  const nodes = useAppSelector(state => state[reducer].get('nodes')).toJS();

  const handleVisability = useAppSelector(state => state[reducer].get('handleVisability'));

  const elements = useAppSelector(state => state[reducer].get('elements')).toJS();
  // const connectedUsers = useAppSelector(state => state[reducer].get('connectedUsers')).toJS();
  const label = useAppSelector(state => state[reducer].get('label'));
  const description = useAppSelector(state => state[reducer].get('description'));
  const group = useAppSelector(state => state[reducer].get('group'));
  const shareOrg = useAppSelector(state => state[reducer].get('shareOrg'));

  const groupsDropDownOptions = useAppSelector(state => state[reducer].get('groupsDropDownOptions')).toJS();
  const attributesDropDownOptions = useAppSelector(state => state[reducer].get('attributesDropDownOptions')).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get('message'));
  const loading = useAppSelector(state => state[reducer].get('loading'));
  const initialLoading = useAppSelector(state => state[reducer].get('initialLoading'));
  const initialLoadingCvr = useAppSelector(state => state[reducer].get('initialLoadingCvr'));

  const companyData = useAppSelector(state => state[reducer].get('companyData'))?.toJS();
  const addressInfo = useAppSelector(state => state[reducer].get('addressInfo'));
  const signed = useAppSelector(state => state[reducer].get('signed'));
  const signedBy = useAppSelector(state => state[reducer].get('signedBy'));
  const showCompanyData = useAppSelector(state => state[reducer].get('showCompanyData'));
  const showAddressInfo = useAppSelector(state => state[reducer].get('showAddressInfo'));

  // const runIntro = useAppSelector(state => state[reducer].get('runIntro'));
  // const introStepIndex = useAppSelector(state => state[reducer].get('introStepIndex'));

  const uncertainCompanies = useAppSelector(state => state[reducer].get('uncertainCompanies'))?.toJS();
  const tagOptions = useAppSelector(state => state.tags.get('tags')).toJS();
  const tags = useAppSelector(state => state[reducer].get('specificWorkspaceTags'))?.toJS();

  const internationalDisclaimer = useAppSelector(state => state[reducer].get('showInternationalDisclaimer'));


  const [metaOpen, setMetaOpen] = useState(false);
  const [rfInstance, setRfInstance] = useState<OnLoadParams | null>(null);

  const [showNodeRelations, setShowNodeRelations] = useState(false);
  const [activeNodeRelations, setActiveNodeRelations] = useState<Node | null>(null);
  const handleShowNodeRelations = (contextNode?: Node) => {
    setShowNodeRelations(prevVal => !prevVal);
    if (contextNode) {
      setActiveNodeRelations(contextNode);
    }
  };

  const [edgePopperRef, setEdgePopperRef] = useState<SVGElement | null>(null);
  const [showEdgePopper, setShowEdgePopper] = useState(false);
  const handleShowEdgePopper = () => {
    setShowEdgePopper(true);
  };


  const handleHideEdgePopper = (stopReffrence = false) => {
    setShowEdgePopper(false);
    if (stopReffrence) {
      setEdgePopperRef(null);
    }
  };

  const [nodePopperRef, setNodePopperRef] = useState<EventTarget | null>(null);
  const [showNodePopper, setShowNodePopper] = useState(false);
  const handleShowNodePopper = () => {
    setShowNodePopper(true);
  };

  const handleHideNodePopper = (stopReffrence = false) => {
    setShowNodePopper(false);

    if (stopReffrence) {
      setNodePopperRef(null);
    }
  };


  const [showCvrModal, setShowCvrModal] = useState(false);
  const [showMapErst, setShowMapErst] = useState(false);
  const [erstTypes, setErstTypes] = useState(initErstTypes);
  const [shareModalOpen, setShareModalOpen] = useState(false);


  const [showAlertLog, setShowAlertLog] = useState(false);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertId, setAlertId] = useState<number | null>(null);

  const [isUpdatingElement, setIsUpdatingElement] = useState(false);
  const [elementToUpdate, setElementToUpdate] = useState<FlowElement | null>(null);

  // relationship
  const [defineEdgeOpen, setDefineEdgeOpen] = useState(false);
  const [currentConnectionData, setCurrentConnectionData] = useState<Connection>({
    source: "",
    target: "",
    sourceHandle: "",
    targetHandle: "",
  });
  const [relationshipLabel, setRelationshipLabel] = useState('');
  const [relationshipValue, setRelationshipValue] = useState('');
  const [relationshipType, setRelationshipType] = useState('custom');
  const [relationshipColor, setRelationshipColor] = useState<RGBA>({
    r: 0, g: 0, b: 0, a: 1
  });
  const [showArrow, setShowArrow] = useState(false);
  const [animatedLine, setAnimatedLine] = useState(false);
  const [showLabel, setShowlabel] = useState(false);
  const [lineThrough, setLineThrough] = useState(false);

  // NODE
  const [defineNodeOpen, setDefineNodeOpen] = useState(false);
  const [nodeLabel, setNodeLabel] = useState('');
  const handleChangeLabelNode = (_label: SelectChoice) => {
    if (_label.__isNew__ && plan_id !== 1) {
      dispatch(addWorkspaceNodeToList({
        attributes: [],
        description: null,
        id: null,
        label: _label.value,
        style: '{"borderColor": {"a": 1, "b": 0, "g": 0, "r": 0}, "backgroundColor": {"a": 1, "b": 255, "g": 255, "r": 255}}'
      }));
    }
    if (_label.__isNew__ && plan_id === 1) {
      dispatch(showNotifAction(t('workspaces.you_can_not_create_new_item_types')));
    } else {
      setNodeLabel(_label.value);
    }
  };

  const [nodeDisplayName, setNodeDisplayName] = useState('');
  const [nodeFigur, setNodeFigur] = useState(null);
  const handleNodeFigur = (_figur) => setNodeFigur(_figur ? _figur.value : null);
  const [attributes, setAttributes] = useState([initialAttribut]);

  const handleChangeAttributes = (_attributes, newRow, isNew) => {
    if (isNew && plan_id !== 1) {
      newRow.value = newRow.label;
      dispatch(addWorkspaceNodeAttributToList(newRow));
    }

    if (isNew && plan_id === 1) {
      dispatch(showNotifAction(t('workspaces.you_can_not_create_new_attribute_types')));
    } else {
      setAttributes(_attributes);
    }
  };

  const [choosenNode, setChoosenNode] = useState<NodeDropdownInstance | null>(null);

  const [deletedAttributes, setDeletedAttributes] = useState([]);

  const handelRemoveAttributes = (_id, index) => {
    setAttributes(att => att.filter((v, i) => i !== index));
    if (_id) {
    // @ts-ignore
      setDeletedAttributes(attr => [...attr, _id]);
    }
  };

  const [nodeColor, setNodeColor] = useState({
    r: 255, g: 255, b: 255, a: 1
  });
  const handleNodeColorChange = (color) => setNodeColor(color.rgb);
  const [nodeBorderColor, setNodeBorderColor] = useState({
    r: 0, g: 0, b: 0, a: 1
  });
  const handleBorderColorChange = (color) => setNodeBorderColor(color.rgb);

  const [nodeLabelColor, setNodeLabelColor] = useState({
    r: 0, g: 0, b: 0, a: 1
  });
  const handleLabelColorChange = (color) => setNodeLabelColor(color.rgb);

  // socket for cvr
  const [subscription, setSubscription] = useState(null);
  // const [colabSubscription, setColabSubscription] = useState(null);


  const handleVisabilityChange = () => dispatch(changeHandleVisability(!handleVisability));


  const [showInternationalDisclaimer, setShowInternationalDisclaimer] = useState(false);

  const closeInternationalDisclaimer = (doNotShowAgain) => {
    setShowInternationalDisclaimer(false);
    if (doNotShowAgain) {
      dispatch(doNotShowInternationalDisclaimerAgain);
    }
  };


  const handleCvrSuccess = (el) => {
    setShowCvrModal(false);
    dispatch(cvrSuccess(getLayoutedElements(el)));

    if (internationalDisclaimer && el[0].data.data_provider === "firmnav") {
      setShowInternationalDisclaimer(true);
    }
    document.getElementById("fitView")?.click();
    // dispatch(changeStepIndex(10));
    // dispatch(handleRunIntro(true));
  };


  const handleCvrError = () => {
    setShowCvrModal(false);
    dispatch(showNotifAction(t('workspaces.drawing_error')));
    dispatch(stopLoading);
  };

  const handleUncertainCompanies = (companies = []) => {
    companies.length > 0 && setShowCvrModal(true);
    dispatch(uncertainCompaniesChange(companies));
  };

  // const handleNewConnection = (data) => {
  //   dispatch(setConnectedUsers(data));
  // };

  useEffect(() => {
    connection.connect(user);

    // storing the subscription in the global variable
    // passing the incoming data handler fn as a second argument

    const sub = connection.subscribeToCvr('cvr:' + id, handleCvrSuccess, handleCvrError, handleUncertainCompanies);
    setSubscription(sub);

    // const sub2 = connection.subscribeToWorkspace(`collaboration:${id}`, handleNewConnection);
    // setColabSubscription(sub2);

    // if (id) {
    //   dispatch(connectNewUser(user, id));
    // }


    // Specify how to clean up after this effect:
    return function cleanup() {
      if (subscription) {
        // @ts-ignore
        subscription.close();
      }

      // if (colabSubscription) {
      //   // @ts-ignore
      //   colabSubscription.close();
      // }
    };
  }, []);


  const closeNode = useCallback(() => {
    if (!showNodePopper) {
      setDefineNodeOpen(false);
      setNodeLabel('');
      setNodeDisplayName('');
      setNodeFigur(null);
      setAttributes([initialAttribut]);
      setChoosenNode(null);
      setIsUpdatingElement(false);
    }
  }, [showNodePopper]);

  const highlightAlertItems = (alert, constant = false) => {
    alert.elements.forEach((element) => {
      let htmlNode;
      if (isNode(element)) {
        htmlNode = document.querySelector(`[data-id="${element.id}"]`);
      } else {
        htmlNode = document.querySelector(`.id_${element.id}`);
      }
      htmlNode.classList.add(constant ? 'pulseConstant' : 'pulse');
    });
  };

  const removeHighlightAlert = () => {
    Array.from(document.querySelectorAll('.pulse')).map(x => x.classList.remove('pulse'));
    Array.from(document.querySelectorAll('.pulseConstant')).map(x => x.classList.remove('pulseConstant'));
  };

  const handleAlerts = (_alerts, initial) => {
    if (initial) {
      setAlerts([..._alerts]);
    } else {
      const cleanAlertsString = alerts.map(alert => alert.elements.map(x => x.id).join(''));
      const newAlerts = _alerts.filter(x => !cleanAlertsString.includes(x.elements.map(y => y.id).join('')));

      removeHighlightAlert();

      newAlerts.forEach((alert, index) => {
        highlightAlertItems(alert);
        setAlerts(list => [...list, alert]);

        toast(alert.alert.label, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: false,
          toastId: alerts.length + index,
          style: {
            backgroundColor: theme.palette.primary.main,
            color: 'white'
          },
          onClick: (e) => {
            setAlertId(Number(e.currentTarget.id));
          }
        });
      });
    }
  };

  const updateNodeDisplayName = (name) => {
    const _attributes = JSON.stringify(attributes.filter(a => a.label));
    const nodeId = choosenNode ? choosenNode.id : null;
    const _nodeLabel = choosenNode ? choosenNode.label : null;
    if (isUpdatingElement && elementToUpdate) {
      dispatch(putNode(user, elementToUpdate.id, nodeId, _nodeLabel, name, nodeFigur, JSON.stringify(nodeColor), JSON.stringify(nodeBorderColor), JSON.stringify(nodeLabelColor), _attributes, JSON.stringify(deletedAttributes), closeNode));
    }
  };

  const closeDefineEdge = useCallback(() => {
    if (!showEdgePopper) {
      setDefineEdgeOpen(false);
      setIsUpdatingElement(false);
      setRelationshipLabel('');
      setRelationshipValue('');
      setRelationshipType('custom');
      setRelationshipColor({
        r: 0, g: 0, b: 0, a: 1
      });
      setShowArrow(false);
      setAnimatedLine(false);
      setShowlabel(false);
      setLineThrough(false);
    }
  }, [showEdgePopper]);

  const updateEdgeDisplayName = (name, edgeTextTarget, edgeTextActualTarget, edge) => {
    const choosenRelationship = relationships.toJS().find(r => r.label === edge.data.label);
    if (isUpdatingElement && elementToUpdate && choosenRelationship) {
      dispatch(putEdge(
        user,
        elementToUpdate.id,
        choosenRelationship.id,
        choosenRelationship.label,
        name,
        relationshipColor,
        relationshipType,
        showArrow,
        animatedLine,
        showLabel,
        lineThrough,
        closeDefineEdge,
        edgeTextTarget,
        edgeTextActualTarget
      ));
    }
  };

  const handleNodeSave = (x?: number, y?: number, drag?: boolean) => {
    const _attributes = JSON.stringify(attributes.filter(a => a.label));
    const rf = rfInstance?.toObject();
    if (!x && !y) {
      x = rf && reactFlowDimensions ? (rf.position[0] * -1 + reactFlowDimensions.width) / rf.zoom - 250 : undefined;
      y = rf && reactFlowDimensions ? (rf.position[1] * -1 + reactFlowDimensions.height) / rf.zoom - 150 : undefined;
    }

    const nodeId = choosenNode ? choosenNode.id : null;
    const _nodeLabel = choosenNode ? choosenNode.label : null;

    if (isUpdatingElement && elementToUpdate && !drag) {
      dispatch(putNode(user, elementToUpdate.id, nodeId, _nodeLabel, nodeDisplayName, nodeFigur, JSON.stringify(nodeColor), JSON.stringify(nodeBorderColor), JSON.stringify(nodeLabelColor), _attributes, JSON.stringify(deletedAttributes), closeNode));
    } else if (drag) {
      dispatch(postNode(
        user,
            id as string,
            null, null,
            "", null,
            JSON.stringify({
              r: 255, g: 255, b: 255, a: 1
            }), JSON.stringify({
              r: 0, g: 0, b: 0, a: 1
            }),
            JSON.stringify([initialAttribut].filter(a => a.label)), closeNode, handleAlerts,
            x, y
      ));
    } else {
      dispatch(postNode(
        user,
            id as string,
            nodeId, _nodeLabel,
            nodeDisplayName, nodeFigur,
            JSON.stringify(nodeColor), JSON.stringify(nodeBorderColor),
            _attributes, closeNode, handleAlerts,
            x, y
      ));
    }
  };

  const handleNoLabelDoubleClick = () => {
    dispatch(showNotifAction(t('workspaces.no_label_double_click')));
  };

  const {
    removeNodeTextTarget,
    onNodeDoubleClick,
    onEdgeDoubleClick,
    edgeTarget,
    removeEdgeTextTarget
  } = useDoubbleClick(updateNodeDisplayName, updateEdgeDisplayName, relationships, handleHideEdgePopper, handleHideNodePopper, handleNoLabelDoubleClick);

  const hideContext = (e?: any) => {
    handleHideNodePopper();
    handleHideEdgePopper();

    removeNodeTextTarget();
    removeEdgeTextTarget();

    setShowContextMenu(false);
  };

  const handleRelationshipSave = () => {
    const choosenRelationship = relationships.toJS().find(r => r.label === relationshipLabel);

    if (isUpdatingElement && elementToUpdate) {
      dispatch(putEdge(
        user,
        elementToUpdate.id,
        choosenRelationship?.id,
        choosenRelationship?.label,
        relationshipValue,
        relationshipColor,
        relationshipType,
        showArrow,
        animatedLine,
        showLabel,
        lineThrough,
        closeDefineEdge,
      ));
    }
  };

  const removeAllUpdatingRefference = () => {
    console.log("removing");
    removeNodeTextTarget();
    setNodePopperRef(null);
    setEdgePopperRef(null);
    setIsUpdatingElement(false);
    setElementToUpdate(null);
    handleHideNodePopper();
    handleHideEdgePopper();
  };


  const onConnect = (data: Edge<any> | Connection) => {
    if (data.source !== data.target) {
      setCurrentConnectionData(data as Connection);
      const color = {
        r: 0, g: 0, b: 0, a: 1
      };
      const edge = {
        relationship_id: null,
        relationshipLabel: null,
        relationshipValue: null,
        relationshipColor: color,
        relationshipType: "custom",
        showArrow: false,
        animatedLine: false,
        showLabel: false,
        lineThrough: false,
        ...data as Connection
      };

      dispatch(postEdge(user, id as string, edge, closeDefineEdge, handleAlerts));
    }
  };

  const onElementsRemove = (elementsToRemove: FlowElement[]): void => {
    removeAllUpdatingRefference();

    const nodeIdsToRemove = elementsToRemove.filter(n => isNode(n)).map((n) => n.id);
    const edgeIdsToRemove = elementsToRemove.filter(r => !isNode(r)).map((r) => r.id);
    const remainingElements = elements.filter((el: FlowElement) => {
      if (isNode(el)) {
        return !nodeIdsToRemove.includes(el.id);
      }
      return !edgeIdsToRemove.includes(el.id);
    });


    if (elementsToRemove.length === 1) {
      if (isNode(elementsToRemove[0]) || elementsToRemove.length > 1) {
        setDefineNodeOpen(false);
      } else {
        setDefineEdgeOpen(false);
      }
    }

    dispatch(deleteWorkspaceElement(user, elementsToRemove, remainingElements));
    hideContext();
  };

  const [activeElement, setActiveElement] = useState<Node | Edge | null>(null);


  const onElementClick = (event: MouseEvent, element: FlowElement, showFull?: boolean) => {
    const foreignObj = document.getElementById("doubleClickForeign");

    if (foreignObj) {
      if (foreignObj.contains(event.target as HTMLElement)) {
        return;
      }
    }

    setActiveElement(element);
    dispatch(setShowCompanyData(false));
    setDefineEdgeOpen(false);
    setDefineNodeOpen(false);
    setIsUpdatingElement(true);
    setShowContextMenu(false);
    setElementToUpdate(element);
    setDeletedAttributes([]);
    removeNodeTextTarget();
    removeEdgeTextTarget();
    setNodePopperRef(null);
    setEdgePopperRef(null);
    handleHideNodePopper();
    handleHideEdgePopper();
    const backgroundColor = element.data.backgroundColor ? element.data.backgroundColor.replace(/[^\d,]/g, '').split(',') : ['255', '255', '255', '1'];
    const borderColor = element.data.borderColor && !element.data.borderColor.includes("undefined") ? element.data.borderColor.replace(/[^\d,]/g, '').split(',') : ['0', '0', '0', '1'];
    const labelColor = element.data.labelColor ? element.data.labelColor.replace(/[^\d,]/g, '').split(',') : ['0', '0', '0', '1'];
    if (isNode(element)) {
      setNodeLabel(element.data.label);
      setNodeDisplayName(element.data.displayName || '');
      setNodeFigur(element.data.figur);
      setAttributes([...element.data.attributes, initialAttribut]);
      setNodeColor({
        r: backgroundColor[0], g: backgroundColor[1], b: backgroundColor[2], a: backgroundColor[3]
      });

      setNodeBorderColor({
        r: borderColor[0], g: borderColor[1], b: borderColor[2], a: borderColor[3]
      });
      setNodeLabelColor({ r: labelColor[0], g: labelColor[1], b: labelColor[2], a: labelColor[3] });
      if (showFull) {
        setDefineNodeOpen(true);
      } else if (element.type === "custom") {
        const target = event.target as HTMLElement;
        const ifDivtarget = target.querySelector("#nodeLabel");
        handleShowNodePopper();
        setNodePopperRef(target.nodeName === "H6" ? event.target : ifDivtarget);
      }
    } else {
      // @ts-ignore
      if (edgeTarget) {
        return;
      }

      event.persist();
      setRelationshipLabel(element.data.label);
      setRelationshipValue(element.data.value);
      setRelationshipType(element.type || 'custom');
      setRelationshipColor(element.data.color);
      setShowArrow(element.data.showArrow);
      setAnimatedLine(element.data.animated);
      setShowlabel(element.data.showLabel);
      setLineThrough(element.data.lineThrough);
      if (showFull) {
        setDefineEdgeOpen(true);
      } else {
        const target = event.target as SVGElement;
        handleShowEdgePopper();
        setEdgePopperRef(target);
      }
    }
  };


  // WORKSPACE GENERAL

  const onWorkspaceSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const _nodes = flow.elements.filter((n): n is Node => isNode(n));

      const mappedNodes = _nodes.map(n => ({ id: n.id, x: n.position.x, y: n.position.y }));
      user && id && dispatch(saveWorkspace(user, id, flow.zoom, flow.position[0], flow.position[1], JSON.stringify(mappedNodes)));
    }
  }, [rfInstance, user]);


  const onLoad = (_reactFlowInstance) => {
    setRfInstance(_reactFlowInstance);
    dispatch(showWorkspace(user, id as string, setMetaOpen, handleAlerts, _reactFlowInstance));
    _reactFlowInstance.fitView();
  };

  const toggleSubMenu = () => dispatch(toggleAction);

  useEffect(() => {
    dispatch(getGroupDropDown(user));
    dispatch(closeMenuAction);

    return () => {
      dispatch(openMenuAction);
    };
  }, [user]);

  useEffect(() => {
    if (group) {
      dispatch(getRelationships(user, group));
      dispatch(getNodes(user, group));
      dispatch(getAttributeDropDown(user, group));
    }
  }, [user, group]);

  useEffect(() => {
    if (alertId || alertId === 0) {
      setAlertOpen(true);
    }
  }, [alertId]);


  useEffect(() => {
    const _node = nodes.find(r => r.label === nodeLabel);
    if (_node) {
      setChoosenNode(_node);
      setNodeColor(JSON.parse(_node.style).backgroundColor);
      setNodeBorderColor(JSON.parse(_node.style).borderColor);
      setAttributes([..._node.attributes, initialAttribut]);
    }
  }, [nodeLabel]);


  // RELATIONSHIP


  const handleChangeLabel = useCallback((_label) => {
    if (_label.__isNew__ && plan_id !== 1) {
      dispatch(addEdgeToList({
        id: null,
        label: _label.value,
        description: null,
        values: [],
        style: '{"color": {"a": 1, "b": 0, "g": 0, "r": 0}'
      }));
    }
    if (_label.__isNew__ && plan_id === 1) {
      dispatch(showNotifAction(t('workspaces.you_can_not_create_new_relationship_types')));
    } else {
      setRelationshipLabel(_label.value);
      setRelationshipValue("");
    }
  }, []);
  const handleChangeValue = useCallback((value) => {
    if (value.value) {
      setRelationshipValue(value.value);
    } else {
      setRelationshipValue(value.target.value);
    }
  }, []);
  const handleTypeChange = useCallback((type) => setRelationshipType(type.value), []);
  const handleColorChange = useCallback((color) => setRelationshipColor(color.rgb), []);
  const handleShowArrowChange = useCallback(() => setShowArrow(val => !val), []);
  const handleAnimatedLineChange = useCallback(() => setAnimatedLine(val => !val), []);
  const handleShowLabelChange = useCallback(() => setShowlabel(val => !val), []);
  const handleLineThroughChange = useCallback(() => setLineThrough(val => !val), []);
  const handleDeleteEdge = useCallback(() => elementToUpdate && onElementsRemove([elementToUpdate]), [elementToUpdate]);


  const handlePostSticky = (e?: any, shortcut = false, x?: number, y?: number) => {
    const rf = rfInstance?.toObject();
    // @ts-ignore
    const reactFlowBounds = reactFlowContainer.current.getBoundingClientRect();

    const position = rfInstance?.project({
      // @ts-ignore
      x: mouse.clientX - reactFlowBounds.left,
      // @ts-ignore
      y: mouse.clientY - reactFlowBounds.top,
    });


    if (!x && !y) {
      x = shortcut ? position?.x : rf && reactFlowDimensions ? (rf.position[0] * -1 + reactFlowDimensions.width / 3) / rf.zoom - 250 : 0;
      y = shortcut ? position?.y : rf && reactFlowDimensions ? (rf.position[1] * -1 + reactFlowDimensions.height / 2) / rf.zoom - 150 : 0;
    }


    if (x && y) {
      dispatch(postSticky(user, id as string, x, y));
    }

    setShowContextMenu(false);
  };

  window.onbeforeunload = () => {
    onWorkspaceSave();
  };

  useEffect(() => {
    if (reactFlowContainer) {
      setReactFlowDimensions({
        // @ts-ignore
        height: reactFlowContainer.current.clientHeight, // @ts-ignore
        width: reactFlowContainer.current.clientWidth
      });
    }
  }, []);


  const onMouseLeave = useCallback(() => {
    onWorkspaceSave();
  }, [rfInstance, elements]);

  const onConfirm = (value, close) => {
    const erstNodeArray = Object.values(erstTypes.nodes);
    const erstEdgeArray = Object.values(erstTypes.edges);
    const nodeLabels = nodes.map((node) => node.label);
    const relationshipLabels = relationships.toJS().map((r) => r.label);
    if (erstNodeArray.every(n => nodeLabels.includes(n)) && erstEdgeArray.every(e => relationshipLabels.includes(e))) {
      if (!subscription) {
        connection.connect();
        const sub = connection.subscribeToCvr('cvr:' + id, handleCvrSuccess, handleCvrError, handleUncertainCompanies);
        setSubscription(sub);
      }
      dispatch(cvrWorkspace(user, id as string, value, close, erstTypes));
    } else {
      setShowMapErst(true);
    }
  };


  const handlePaste = (elementsToAdd) => {
    // @ts-ignore
    const reactFlowBounds = reactFlowContainer.current.getBoundingClientRect();
    // @ts-ignore
    const position = rfInstance.project({
      // @ts-ignore
      x: mouse.clientX - reactFlowBounds.left,
      // @ts-ignore
      y: mouse.clientY - reactFlowBounds.top,
    });

    if (!mouse.clientY) {
      const rf = rfInstance?.toObject();
      if (rf && reactFlowDimensions) {
        position.x = (rf.position[0] * -1 + reactFlowDimensions.width) / rf.zoom - 250;
        position.y = (rf.position[1] * -1 + reactFlowDimensions.height) / rf.zoom - 150;
      }
    }


    const sortedByY = elementsToAdd.filter(e => isNode(e)).sort((a, b) => b.position.y - a.position.y);
    const topNode = sortedByY[sortedByY.length - 1];

    const now = Date.now();
    elementsToAdd.map((element) => {
      if (isEdge(element)) {
        element.id = `${element.id}_${now}-edit`;
        element.source = `${element.source}_${now}-edit`;
        element.target = `${element.target}_${now}-edit`;
      } else {
        element.id = `${element.id}_${now}-edit`;
        const xDistanceToTopNode = element.position.x - topNode.position.x;
        const yDistanceToTopNode = element.position.y - topNode.position.y;

        element.position.x = position.x + xDistanceToTopNode;
        element.position.y = position.y + yDistanceToTopNode;
      }
      return element;
    });

    dispatch(addElements(user, id as string, elementsToAdd));
  };

  const { cut, copy, paste } = useCutCopyPaste(elements, onElementsRemove, handlePaste);
  const { handleNodeContextMenu,
    handlePaneContextMenu,
    handleSelctionContextMenu,
    handleEdgeContextMenu,
    contextAnchor,
    contextNode,
    contextSelection,
    contextType } = useFlowContextMenus();


  const [snapToGrid, setSnapToGrid] = useState(false);


  const handleOpenCvr = () => {
    dispatch(handleRunIntro(false));
    setShowCvrModal(true);
  };
  const handleGetCompanyData = (_id) => {
    dispatch(getCompanyData(user, _id, setShowContextMenu, handleHideNodePopper, handleHideEdgePopper));
  };
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


  const handleAutoLayout = () => dispatch(layoutElements(getLayoutedElements(elements)));

  const handleImage = (type, _stopLoading) => handleExport(type, reactFlowContainer, label, _stopLoading);
  const handlePowerpoint = (_stopLoading) => {
    id && dispatch(workspacePowerpoint(user, id, label, elements, _stopLoading));
  };


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

  const { cursor, mouseActive, stickyActive, toggleMouse, toggleSticky, toggleNode, nodeActive } = useItemSidePanel();


  const onPaneClick = (event: React.MouseEvent<Element, globalThis.MouseEvent>) => {
    removeAllUpdatingRefference();

    if (reactFlowContainer && rfInstance) {
      // @ts-ignore
      const reactFlowBounds = reactFlowContainer.current.getBoundingClientRect();
      const position = rfInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      if (stickyActive) {
        handlePostSticky(event, false, position.x, position.y);
      }
      if (nodeActive) {
        closeNode();
        handleNodeSave(position.x, position.y, true);
      }
    }
  };

  const interactive = useMemo(() => !signed && mouseActive, [signed, mouseActive]);

  const showPopperAgain = () => {
    if (edgePopperRef) {
      handleShowEdgePopper();
    }
    if (nodePopperRef) {
      handleShowNodePopper();
    }
  };

  return (
    <div style={{ cursor }}>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <div className={classes.root} ref={reactFlowContainer} onMouseLeave={onMouseLeave}>

        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          minZoom={0.3}
          maxZoom={3}
          onNodeDragStart={hideContext}
          onNodeDragStop={showPopperAgain}
          onMoveEnd={showPopperAgain}
          onSelectionDragStop={showPopperAgain}
          onConnectStart={removeAllUpdatingRefference}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragStart={hideContext}
          onMoveStart={hideContext}
          onSelectionDragStart={hideContext}
          onPaneScroll={hideContext}
          onPaneClick={onPaneClick}
          onNodeDoubleClick={onNodeDoubleClick}
          onEdgeDoubleClick={onEdgeDoubleClick}
          nodesDraggable={interactive}
          nodesConnectable={interactive}
          elementsSelectable={interactive}
          selectNodesOnDrag={interactive}
          paneMoveable={interactive}
          zoomOnDoubleClick={interactive}
          zoomOnPinch={interactive}
          zoomOnScroll={interactive}
          onNodeContextMenu={handleNodeContextMenu}
          onPaneContextMenu={handlePaneContextMenu}
          onSelectionContextMenu={handleSelctionContextMenu}
          onEdgeContextMenu={handleEdgeContextMenu}
          snapToGrid={snapToGrid}
          snapGrid={[BASE_BG_GAP / currentZoom, BASE_BG_GAP / currentZoom]}

          nodeTypes={nodeTypes}
          onMove={(flowTransform) => {
            if (flowTransform) {
              setCurrentZoom(flowTransform.zoom);
            }
          }}
          edgeTypes={{ custom: CustomEdge }}
          onLoad={onLoad}
          connectionMode={ConnectionMode.Loose}
          onElementClick={!signed ? onElementClick : undefined}
        >
          {!signed && <div data-html2canvas-ignore="true">
            <Collaboration
              setShareModalOpen={setShareModalOpen}
            />
            <Meta
              label={label}
              setMetaOpen={setMetaOpen}
              handleVisabilityChange={handleVisabilityChange}
              handlePowerpoint={handlePowerpoint}
              handleVisability={handleVisability}
              elements={elements}
              setSnapToGrid={setSnapToGrid}
              snapToGrid={snapToGrid}
              handleAutoLayout={handleAutoLayout}
              handleOpenMenu={toggleSubMenu}
              handleImage={handleImage}
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
        {signed ? (
          <>
            <a
              href="https://www.juristic.io/"
              className={classes.signedLogo}
            >
              <img className={classes.img} src={logoBeta} alt={brand.name} />
            </a>

            <div className={classes.signed}>
              <div className={classes.signedRow}>
                <div className={classes.signedCircle} />
                <Typography className={classes.signedText}>
                  {t('workspaces.approved_and_locked_off')}
                  {' '}
                  {' '}
                  {signedBy}
                </Typography>
              </div>
              <div className={classes.signedRow}>
                <Typography className={classes.signedId}>
                  {t('workspaces.id')}
                  {' '}
                  {window.btoa(signedBy + id)}
                </Typography>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <WorkspaceMeta
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
      />
      <DefineEdge
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
        isUpdatingElement={isUpdatingElement}
        handleDeleteEdge={handleDeleteEdge}
        loading={loading}
      />
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
          handleChangeColor={(color) => setNodeColor(color.rgb)}
          nodeBorderColor={nodeBorderColor}
          handleBorderColorChange={handleBorderColorChange}
          nodeLabelColor={nodeLabelColor}
          handleLabelColorChange={handleLabelColorChange}
          handleNodeSave={handleNodeSave}
          nodeDisplayName={nodeDisplayName}
          nodeFigur={nodeFigur}
          handleNodeFigurChange={handleNodeFigur}
          isUpdatingElement={isUpdatingElement}
          elementToUpdate={elementToUpdate}
          handleDisplayNameChange={(e) => setNodeDisplayName(e.target.value)}
          handleDeleteNode={() => elementToUpdate && onElementsRemove([elementToUpdate])}
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
      <AlertLog
        open={showAlertLog}
        close={() => setShowAlertLog(false)}
        alerts={alerts}
        history={history}
        seeAlert={(index) => setAlertId(index)
        }
        highlightAlertItems={highlightAlertItems}
        removeHighlightAlert={removeHighlightAlert}
      />
      <CvrDialog
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
      />
      <MapTypesForErst
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
      />
      {companyData && Object.keys(companyData).length > 0 && <CompanyDataModel
        open={showCompanyData}
        close={() => dispatch(setShowCompanyData(false))}
        companyData={companyData}
      />}
      <AddressInfoModel
        open={showAddressInfo}
        close={() => dispatch(setShowAddressInfo(false))}
        addressInfo={addressInfo}
      />
      <ShareModal
        open={shareModalOpen}
        loading={loading}
        close={() => setShareModalOpen(false)}
        onShare={(firstName, lastName, email, phone, editable) => dispatch(shareWorkspace(user, id as string, firstName, lastName, email, phone, editable, setShareModalOpen))}
      />
      <RelationshipModal
        open={showNodeRelations}
        close={handleShowNodeRelations}
        activeNodeRelations={activeNodeRelations}
        elements={elements}
      />

      {!signed && (
        <>
          <NodeContextMenu
            {...contextAnchor}
            contextNode={contextNode}
            contextType={contextType}
            show={showContextMenu}
            handleEdit={onElementClick}
            handleShowNodeRelations={handleShowNodeRelations}
            showCompanyInfo={handleGetCompanyData}
            getAddressInfo={(_id) => dispatch(getAddressInfo(user, _id, setShowContextMenu))}
            loading={loading}
            cut={cut}
            copy={copy}
            onElementsRemove={onElementsRemove}
          />
          <SelectionContextMenu
            {...contextAnchor}
            contextSelection={contextSelection}
            contextType={contextType}
            show={showContextMenu}
            cut={cut}
            copy={copy}
            onElementsRemove={onElementsRemove}
          />
          <PaneContextMenu
            {...contextAnchor}
            contextType={contextType}
            show={showContextMenu}
            paste={paste}
            nodeClick={() => {
              setDefineNodeOpen(true);
              setShowContextMenu(false);
            }}
            stickyClick={handlePostSticky}
            handleShowGrid={handleVisabilityChange}
            handleVisability={handleVisability}
            handleSnapToGrid={() => setSnapToGrid(prevVal => !prevVal)}
            snapToGrid={snapToGrid}
            fitView={() => rfInstance?.fitView()}
          />
          <InternationalStructureAlert open={showInternationalDisclaimer} close={closeInternationalDisclaimer} />
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
            editData={onElementClick}
            loading={loading}
            activeElement={activeElement}
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
            editData={onElementClick}
            activeElement={activeElement}
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
            handleDeleteEdge={handleDeleteEdge}
            handleHideEdgePopper={handleHideEdgePopper}
            rfInstance={rfInstance}
          />}
        </>
      )}
    </div>
  );
};

Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Workspace);
