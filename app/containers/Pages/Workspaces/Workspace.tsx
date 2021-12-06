/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import React, {
  useState, useEffect, useCallback, useRef
} from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import ReactFlow, {
  Controls,
  MiniMap,
  ControlButton,
  Background,
  isNode,
  Node,
  ConnectionMode,
  BackgroundVariant,
  FlowElement,
  OnLoadParams
} from 'react-flow-renderer';
// import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import Typography from '@material-ui/core/Typography';
import logoBeta from '@images/logoBeta.svg';
import brand from '@api/dummy/brand';
import PropTypes from 'prop-types';
import {
  useHistory
} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { toast } from 'react-toastify';
import { loadFromLocalStorage } from '@utils/localStorage';
import Notification from '@components/Notification/Notification';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import { getId, encryptId } from '@api/constants';
import connection from '@api/socket/SocketConnection';
import AlertModal from '@components/Alerts/AlertModal';
import CustomNode from '@components/Workspace/Node/CustomNode';
import StickyNoteNode from '@components/Workspace/Node/StickyNoteNode';
import WorkspaceMeta from '@components/Workspace/WorkspaceMeta';
import CustomEdge from '@components/Workspace/Edge/CustomEdge';
import DefineEdge from '@components/Workspace/Edge/DefineEdge';
import DefineNode from '@components/Workspace/Node/DefineNode';
import AlertLog from '@components/Alerts/AlertLog';
import CvrDialog from '@components/DialogModal/CvrDialog';
import MapTypesForErst from '@components/Workspace/MapTypesForErst';
import CompanyDataModel from '@components/Workspace/CompanyDataModel';
import AddressInfoModel from '@components/Workspace/AddressInfoModel';
import ShareModal from '@components/Workspace/Share/ShareModal';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import WorkspaceFabs from '@components/Workspace/WorkspaceFabs';
import { useTranslation } from 'react-i18next';
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
  mapUncertainCompanies, changeTags
} from './reducers/workspaceActions';
// import { useCutCopyPaste } from '@hooks/useCutCopyPaste';
import './workspace.css';


const nodeTypes = {
  custom: CustomNode,
  sticky: StickyNoteNode
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
  const [image, takeScreenShot] = useScreenshot();
  const [reactFlowDimensions, setReactFlowDimensions] = useState<Dimensions | null>(null);
  const [currentZoom, setCurrentZoom] = useState(1);
  const { t } = useTranslation();

  const { plan_id } = loadFromLocalStorage();

  // REDUX
  const relationships = useAppSelector(state => state[reducer].get('relationships'));
  const nodes = useAppSelector(state => state[reducer].get('nodes')).toJS();

  const handleVisability = useAppSelector(state => state[reducer].get('handleVisability'));
  const elements = useAppSelector(state => state[reducer].get('elements')).toJS();
  const label = useAppSelector(state => state[reducer].get('label'));
  const description = useAppSelector(state => state[reducer].get('description'));
  const group = useAppSelector(state => state[reducer].get('group'));
  const shareOrg = useAppSelector(state => state[reducer].get('shareOrg'));

  const groupsDropDownOptions = useAppSelector(state => state[reducer].get('groupsDropDownOptions')).toJS();
  const attributesDropDownOptions = useAppSelector(state => state[reducer].get('attributesDropDownOptions')).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get('message'));
  const loading = useAppSelector(state => state[reducer].get('loading'));
  const companyData = useAppSelector(state => state[reducer].get('companyData'));
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


  const [metaOpen, setMetaOpen] = useState(false);
  const [rfInstance, setRfInstance] = useState<OnLoadParams | null>(null);

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
  const [currentConnectionData, setCurrentConnectionData] = useState({});
  const [relationshipLabel, setRelationshipLabel] = useState('');
  const [relationshipValue, setRelationshipValue] = useState('');
  const [relationshipType, setRelationshipType] = useState(null);
  const [relationshipColor, setRelationshipColor] = useState({
    r: 0, g: 0, b: 0, a: 1
  });
  const [showArrow, setShowArrow] = useState(false);
  const [animatedLine, setAnimatedLine] = useState(false);
  const [showLabel, setShowlabel] = useState(false);
  const [lineThrough, setLineThrough] = useState(false);

  // NODE
  const [defineNodeOpen, setDefineNodeOpen] = useState(false);
  const [nodeLabel, setNodeLabel] = useState('');
  const [nodeDisplayName, setNodeDisplayName] = useState('');
  const [nodeFigur, setNodeFigur] = useState(null);
  const [attributes, setAttributes] = useState([initialAttribut]);
  const [choosenNode, setChoosenNode] = useState<NodeDropdownInstance | null>(null);

  const [deletedAttributes, setDeletedAttributes] = useState([]);
  const [nodeColor, setNodeColor] = useState({
    r: 255, g: 255, b: 255, a: 1
  });
  const [nodeBorderColor, setNodeBorderColor] = useState({
    r: 0, g: 0, b: 0, a: 1
  });

  // socket for cvr
  const [subscription, setSubscription] = useState(null);


  const handleCvrSuccess = (el) => {
    setShowCvrModal(false);
    dispatch(cvrSuccess(getLayoutedElements(el)));
    // dispatch(changeStepIndex(10));
    // dispatch(handleRunIntro(true));
  };

  const handleCvrError = () => {
    setShowCvrModal(false);
    dispatch(showNotifAction(t('workspaces.drawing_error')));
  };

  const handleUncertainCompanies = (companies = []) => {
    dispatch(uncertainCompaniesChange(companies));
  };

  useEffect(() => {
    connection.connect();

    // storing the subscription in the global variable
    // passing the incoming data handler fn as a second argument

    const sub = connection.subscribeToCvr('cvr:' + id, handleCvrSuccess, handleCvrError, handleUncertainCompanies);
    setSubscription(sub);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (subscription) {
        // @ts-ignore
        subscription.close();
      }
    };
  }, []);


  // REACT FLOW SPECIFIC

  const onConnect = (data) => {
    if (data.source !== data.target) {
      setCurrentConnectionData(data);
      setDefineEdgeOpen(true);
    }
  };

  const onElementsRemove = (elementsToRemove) => {
    const nodeIdsToRemove = elementsToRemove.filter(n => isNode(n)).map((n) => n.id);
    const edgeIdsToRemove = elementsToRemove.filter(r => !isNode(r)).map((r) => r.id);
    const remainingElements = elements.filter((el: FlowElement) => {
      if (isNode(el)) {
        return !nodeIdsToRemove.includes(el.id);
      }
      return !edgeIdsToRemove.includes(el.id);
    });

    setIsUpdatingElement(false);
    setElementToUpdate(null);

    if (elementsToRemove.length === 1) {
      if (isNode(elementsToRemove[0]) || elementsToRemove.length > 1) {
        setDefineNodeOpen(false);
      } else {
        setDefineEdgeOpen(false);
      }
    }

    dispatch(deleteWorkspaceElement(elementsToRemove, remainingElements));
  };

  const onLoad = (_reactFlowInstance) => {
    setRfInstance(_reactFlowInstance);
    _reactFlowInstance.fitView();
  };

  const onElementClick = (event, element) => {
    dispatch(setShowCompanyData(false));
    setDefineEdgeOpen(false);
    setDefineNodeOpen(false);
    setIsUpdatingElement(true);
    setElementToUpdate(element);
    setDeletedAttributes([]);
    const backgroundColor = element.data.backgroundColor ? element.data.backgroundColor.replace(/[^\d,]/g, '').split(',') : ['255', '255', '255', '1'];
    const borderColor = element.data.backgroundColor ? element.data.borderColor.replace(/[^\d,]/g, '').split(',') : ['0', '0', '0', '1'];
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

      setDefineNodeOpen(true);
    } else {
      event.persist();
      setRelationshipLabel(element.data.label);
      setRelationshipValue(element.data.value);
      setRelationshipType(element.type);
      setRelationshipColor(element.data.color);
      setShowArrow(element.data.showArrow);
      setAnimatedLine(element.data.animated);
      setShowlabel(element.data.showLabel);
      setLineThrough(element.data.lineThrough);
      setDefineEdgeOpen(true);
    }
  };


  // WORKSPACE GENERAL

  const onWorkspaceSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const _nodes = flow.elements.filter((n): n is Node => isNode(n));
      const mappedNodes = _nodes.map(n => ({ id: n.id, x: n.position.x, y: n.position.y }));
      dispatch(saveWorkspace(id, flow.zoom, flow.position[0], flow.position[1], JSON.stringify(mappedNodes), history));
    }
  }, [rfInstance]);

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

  useEffect(() => {
    dispatch(showWorkspace(id, setMetaOpen, handleAlerts));
    dispatch(getGroupDropDown());
  }, []);

  useEffect(() => {
    if (group) {
      dispatch(getRelationships(group));
      dispatch(getNodes(group));
      dispatch(getAttributeDropDown(group));
    }
  }, [group]);

  useEffect(() => {
    if (alertId || alertId === 0) {
      setAlertOpen(true);
    }
  }, [alertId]);

  const closeNode = useCallback(() => {
    setDefineNodeOpen(false);
    setNodeLabel('');
    setNodeDisplayName('');
    setNodeFigur(null);
    setAttributes([initialAttribut]);
    setChoosenNode(null);
    setIsUpdatingElement(false);
  }, []);


  const handleNodeSave = () => {
    const _attributes = JSON.stringify(attributes.filter(a => a.label));
    const rf = rfInstance?.toObject();

    const x = rf && reactFlowDimensions && (rf.position[0] * -1 + reactFlowDimensions.width) / rf.zoom - 250;
    const y = rf && reactFlowDimensions && (rf.position[1] * -1 + reactFlowDimensions.height) / rf.zoom - 150;
    if (choosenNode) {
      if (isUpdatingElement && elementToUpdate) {
        dispatch(putNode(elementToUpdate.id, choosenNode.id, choosenNode.label, nodeDisplayName, nodeFigur, JSON.stringify(nodeColor), JSON.stringify(nodeBorderColor), _attributes, JSON.stringify(deletedAttributes), closeNode));
      } else {
        dispatch(postNode(
          id,
          choosenNode.id, choosenNode.label,
          nodeDisplayName, nodeFigur,
          JSON.stringify(nodeColor), JSON.stringify(nodeBorderColor),
          _attributes, closeNode, handleAlerts,
          x, y
        ));
      }
    }
  };


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

  const closeDefineEdge = useCallback(() => {
    setDefineEdgeOpen(false);
    setIsUpdatingElement(false);
    setRelationshipLabel('');
    setRelationshipValue('');
    setRelationshipType(null);
    setRelationshipColor({
      r: 0, g: 0, b: 0, a: 1
    });
    setShowArrow(false);
    setAnimatedLine(false);
    setShowlabel(false);
    setLineThrough(false);
  }, []);

  const handleRelationshipSave = () => {
    const choosenRelationship = relationships.toJS().find(r => r.label === relationshipLabel);
    if (isUpdatingElement && elementToUpdate) {
      dispatch(putEdge(
        elementToUpdate.id,
        choosenRelationship.id,
        choosenRelationship.label,
        relationshipValue,
        relationshipColor,
        relationshipType,
        showArrow,
        animatedLine,
        showLabel,
        lineThrough,
        closeDefineEdge
      ));
    } else {
      const edge = {
        relationship_id: choosenRelationship.id,
        relationshipLabel: choosenRelationship.label,
        relationshipValue,
        relationshipColor,
        relationshipType,
        showArrow,
        animatedLine,
        showLabel,
        lineThrough,
        ...currentConnectionData
      };
      dispatch(postEdge(id, edge, closeDefineEdge, handleAlerts));
    }

    setIsUpdatingElement(false);
  };

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
    }
  }, []);
  const handleChangeValue = useCallback((value) => setRelationshipValue(value ? value.value : value), []);
  const handleTypeChange = useCallback((type) => setRelationshipType(type.value), []);
  const handleColorChange = useCallback((color) => setRelationshipColor(color.rgb), []);
  const handleShowArrowChange = useCallback(() => setShowArrow(val => !val), []);
  const handleAnimatedLineChange = useCallback(() => setAnimatedLine(val => !val), []);
  const handleShowLabelChange = useCallback(() => setShowlabel(val => !val), []);
  const handleLineThroughChange = useCallback(() => setLineThrough(val => !val), []);
  const handleDeleteEdge = useCallback(() => onElementsRemove([elementToUpdate]), [elementToUpdate]);

  const handlePostSticky = () => {
    const rf = rfInstance?.toObject();
    const x = rf && reactFlowDimensions && (rf.position[0] * -1 + reactFlowDimensions.width) / rf.zoom - 250;
    const y = rf && reactFlowDimensions && (rf.position[1] * -1 + reactFlowDimensions.height) / rf.zoom - 150;

    dispatch(postSticky(id, x, y));
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

  useEffect(() => {
    if (image) {
      const a = document.createElement('a');
      a.href = image;

      a.download = createFileName('jpg', label);
      a.click();
    }
  }, [image]);

  // const handleJoyrideCallback = (data) => {
  //   const {
  //     action, index, type, status
  //   } = data;

  //   if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
  //     // Need to set our running state to false, so we can restart if we click start again.
  //     dispatch(handleRunIntro(false));
  //     dispatch(changeStepIndex(0));
  //   } else if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
  //     let newStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

  //     if (!metaOpen && index === 1) {
  //       newStepIndex = 2;
  //     }

  //     if (index === 3) {
  //       const hoverMenu = document.querySelector('.rtf:nth-of-type(3)');
  //       if (hoverMenu) {
  //         hoverMenu.classList.remove('closed');
  //         hoverMenu.classList.add('open');
  //         setTimeout(() => {
  //           dispatch(changeStepIndex(newStepIndex));
  //         }, 100);
  //       }
  //     } else {
  //       dispatch(changeStepIndex(newStepIndex));
  //     }
  //   }
  // };

  // useCutCopyPaste(elements, onElementsRemove, setElements);

  // useEffect(() => {
  //   if (rfInstance) {
  //     rfInstance.fitView();
  //   }
  // }, [elements, rfInstance]);

  return (
    <div>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <div className={classes.root} ref={reactFlowContainer} onMouseLeave={onMouseLeave}>
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          minZoom={0.3}
          maxZoom={3}
          nodesDraggable={!signed}
          nodesConnectable={!signed}
          elementsSelectable={!signed}
          selectNodesOnDrag={!signed}
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
          <div data-html2canvas-ignore="true">
            <MiniMap
              nodeStrokeWidth={3}
              nodeColor={theme.palette.secondary.main}
              style={{ top: 10, right: 10, borderRadius: 10 }}
            />
          </div>
          <div data-html2canvas-ignore="true">
            <Controls showInteractive={!signed} style={{ borderRadius: 4 }}>
              <ControlButton onClick={() => {
                takeScreenShot(reactFlowContainer?.current);
              }}
              >
                <PhotoCameraIcon />
              </ControlButton>
              {!signed && (
                <ControlButton onClick={() => dispatch(changeHandleVisability(!handleVisability))}>
                  {handleVisability ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </ControlButton>
              )}
            </Controls>
          </div>
          {handleVisability && !signed
               && (
                 <Background
                   variant={BackgroundVariant.Lines}
                   gap={BASE_BG_GAP / currentZoom}
                   size={BASE_BG_STROKE / currentZoom / 2}
                 />
               )}
        </ReactFlow>
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
          id,
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
      <DefineNode
        open={defineNodeOpen}
        close={closeNode}
        nodes={nodes}
        nodeLabel={nodeLabel}
        handleChangeLabel={(_label) => {
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
        }}
        attributes={attributes}
        handleChangeAttributes={(_attributes, newRow, isNew) => {
          if (isNew && plan_id !== 1) {
            newRow.value = newRow.label;
            dispatch(addWorkspaceNodeAttributToList(newRow));
          }

          if (isNew && plan_id === 1) {
            dispatch(showNotifAction(t('workspaces.you_can_not_create_new_attribute_types')));
          } else {
            setAttributes(_attributes);
          }
        }}
        nodeColor={nodeColor}
        handleChangeColor={(color) => setNodeColor(color.rgb)}
        nodeBorderColor={nodeBorderColor}
        handleBorderColorChange={(color) => setNodeBorderColor(color.rgb)}
        handleNodeSave={handleNodeSave}
        nodeDisplayName={nodeDisplayName}
        nodeFigur={nodeFigur}
        handleNodeFigurChange={(_figur) => setNodeFigur(_figur ? _figur.value : null)}
        isUpdatingElement={isUpdatingElement}
        elementToUpdate={elementToUpdate}
        handleDisplayNameChange={(e) => setNodeDisplayName(e.target.value)}
        handleDeleteNode={() => onElementsRemove([elementToUpdate])}
        loading={loading}
        attributesDropDownOptions={attributesDropDownOptions}
        handleRemoveAttributes={(_id, index) => {
          setAttributes(att => att.filter((v, i) => i !== index));
          if (_id) {
            // @ts-ignore
            setDeletedAttributes(attr => [...attr, _id]);
          }
        }}
      />
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
        }}
        title={t('workspaces.load_from_CVR')}
        description={t('workspaces.search_for_a_company_or_CVR_number')}
        textFielLabel={t('workspaces.cvr_nr')}
        changeUncertainCompanies={handleUncertainCompanies}
        uncertainCompanies={uncertainCompanies}
        mapUncertainCompanies={(uncertainMapping) => dispatch(mapUncertainCompanies(id, uncertainMapping, erstTypes))}
        onConfirm={(value, close) => {
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
            dispatch(cvrWorkspace(id, value, close, erstTypes));
          } else {
            setShowMapErst(true);
          }
        }}
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
      {!metaOpen && !defineEdgeOpen && !defineNodeOpen && !showAlertLog && !showCompanyData && !shareModalOpen && !signed && !showCompanyData && !showAddressInfo && (
        <WorkspaceFabs
          nodeClick={() => setDefineNodeOpen(true)}
          metaClick={() => setMetaOpen(true)}
          saveClick={onWorkspaceSave}
          onAlertClick={() => setShowAlertLog(true)}
          onAnalysisClick={() => history.push(`analysis/${id}`)}
          onCvrClick={() => {
            dispatch(handleRunIntro(false));
            setShowCvrModal(true);
          }}
          stickyClick={handlePostSticky}
          onShareClick={() => setShareModalOpen(true)}
          plan_id={plan_id}
        />
      )}
      <CompanyDataModel
        open={showCompanyData}
        close={() => dispatch(setShowCompanyData(false))}
        companyData={companyData}
      />
      <AddressInfoModel
        open={showAddressInfo}
        close={() => dispatch(setShowAddressInfo(false))}
        addressInfo={addressInfo}
      />
      <ShareModal
        open={shareModalOpen}
        loading={loading}
        close={() => setShareModalOpen(false)}
        onShare={(firstName, lastName, email, phone, editable) => dispatch(shareWorkspace(id, firstName, lastName, email, phone, editable, setShareModalOpen))}
      />
      {/* <Joyride
        continuous
        run={runIntro}
        stepIndex={introStepIndex}
        scrollToFirstStep
        showSkipButton
        callback={handleJoyrideCallback}
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: '#36454F'
          }
        }}
      /> */}
    </div>
  );
};

Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Workspace);
