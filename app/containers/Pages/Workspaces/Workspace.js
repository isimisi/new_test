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
  ConnectionMode,
  BackgroundVariant
} from 'react-flow-renderer';
import {
  WorkspaceFabs, CustomNode, StickyNoteNode,
  DefineEdge, CustomEdge, DefineNode, WorkspaceMeta,
  Notification, AlertModal,
  AlertLog, FormDialog, MapTypesForErst
} from '@components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { toast } from 'react-toastify';
import styles from './workspace-jss';
import { reducer, initErstTypes } from './constants';
import {
  getRelationships, getNodes, postEdge, postNode,
  changeHandleVisability, labelChange, descriptionChange,
  addGroup, getGroupDropDown, putWorkspace, closeNotifAction,
  showWorkspace, saveWorkspace, deleteWorkspaceElement,
  putNode, putEdge, getAttributeDropDown, addWorkspaceNodeToList,
  addEdgeToList, addWorkspaceNodeAttributToList,
  cvrWorkspace
} from './reducers/workspaceActions';


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


const Workspace = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const id = history.location.pathname.split('/').pop();
  const reactFlowContainer = useRef(null);
  const [reactFlowDimensions, setReactFlowDimensions] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(1);


  // REDUX
  const relationships = useSelector(state => state.getIn([reducer, 'relationships']));
  const nodes = useSelector(state => state.getIn([reducer, 'nodes'])).toJS();
  const handleVisability = useSelector(state => state.getIn([reducer, 'handleVisability']));
  const elements = useSelector(state => state.getIn([reducer, 'elements'])).toJS();
  const label = useSelector(state => state.getIn([reducer, 'label']));
  const description = useSelector(state => state.getIn([reducer, 'description']));
  const group = useSelector(state => state.getIn([reducer, 'group']));
  const groupsDropDownOptions = useSelector(state => state.getIn([reducer, 'groupsDropDownOptions'])).toJS();
  const attributesDropDownOptions = useSelector(state => state.getIn([reducer, 'attributesDropDownOptions'])).toJS();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const loading = useSelector(state => state.getIn([reducer, 'loading']));

  const [metaOpen, setMetaOpen] = useState(false);
  const [rfInstance, setRfInstance] = useState(null);

  const [showCvrModal, setShowCvrModal] = useState(false);
  const [showMapErst, setShowMapErst] = useState(false);
  const [erstTypes, setErstTypes] = useState(initErstTypes);


  const [showAlertLog, setShowAlertLog] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertId, setAlertId] = useState(null);

  const [isUpdatingElement, setIsUpdatingElement] = useState(false);
  const [elementToUpdate, setElementToUpdate] = useState(null);

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

  // NODE
  const [defineNodeOpen, setDefineNodeOpen] = useState(false);
  const [nodeLabel, setNodeLabel] = useState('');
  const [nodeDisplayName, setNodeDisplayName] = useState('');
  const [nodeFigur, setNodeFigur] = useState(null);
  const [attributes, setAttributes] = useState([initialAttribut]);
  const [choosenNode, setChoosenNode] = useState(null);

  const [deletedAttributes, setDeletedAttributes] = useState([]);
  const [nodeColor, setNodeColor] = useState({
    r: 255, g: 255, b: 255, a: 1
  });
  const [nodeBorderColor, setNodeBorderColor] = useState({
    r: 0, g: 0, b: 0, a: 1
  });

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

    const remainingElements = elements.filter(el => {
      if (isNode(el)) {
        return !(
          nodeIdsToRemove.includes(el.id)
          || nodeIdsToRemove.includes(el.target)
          || nodeIdsToRemove.includes(el.source)
        );
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
  };

  const onElementClick = (event, element) => {
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
      setDefineEdgeOpen(true);
    }
  };


  // WORKSPACE GENERAL

  const onWorkspaceSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const _nodes = flow.elements.filter(n => isNode(n));
      const mappedNodes = _nodes.map(n => ({ id: n.id, x: n.position.x, y: n.position.y }));
      dispatch(saveWorkspace(id, flow.zoom, flow.position[0], flow.position[1], JSON.stringify(mappedNodes), history));
    }
  }, [rfInstance]);


  const handleAlerts = (_alerts, initial) => {
    if (initial) {
      setAlerts([..._alerts]);
    } else {
      const newAlerts = _alerts.filter(x => !alerts.some(y => y.id === x.id));

      newAlerts.forEach((element, index) => {
        toast(element.label, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: false,
          toastId: alerts.length + index,
          style: {
            backgroundColor: theme.palette.secondary.main,
            color: 'white'
          },
          onClick: (e) => {
            setAlertId(e.currentTarget.id);
          }
        });
        setAlerts(list => [...list, element]);
      });
    }
  };

  useEffect(() => {
    dispatch(showWorkspace(id, setMetaOpen, handleAlerts));
    dispatch(getRelationships());
    dispatch(getNodes());
    dispatch(getGroupDropDown());
    dispatch(getAttributeDropDown());
  }, []);

  useEffect(() => {
    if (alertId) {
      setAlertOpen(true);
    }
  }, [alertId]);

  const handleNodeSave = () => {
    const _attributes = JSON.stringify(attributes.filter(a => a.label));
    const rf = rfInstance.toObject();

    const x = (rf.position[0] * -1 + reactFlowDimensions.width) / rf.zoom - 250;
    const y = (rf.position[1] * -1 + reactFlowDimensions.height) / rf.zoom - 150;

    if (isUpdatingElement) {
      dispatch(putNode(elementToUpdate.id, choosenNode.id, choosenNode.label, nodeDisplayName, nodeFigur, JSON.stringify(nodeColor), JSON.stringify(nodeBorderColor), _attributes, JSON.stringify(deletedAttributes), setDefineNodeOpen));
    } else {
      dispatch(postNode(
        id,
        choosenNode.id, choosenNode.label,
        nodeDisplayName, nodeFigur,
        JSON.stringify(nodeColor), JSON.stringify(nodeBorderColor),
        _attributes, setDefineNodeOpen, handleAlerts,
        x, y
      ));
      setNodeLabel('');
    }
    setIsUpdatingElement(false);
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

  const handleRelationshipSave = () => {
    const choosenRelationship = relationships.toJS().find(r => r.label === relationshipLabel);

    if (isUpdatingElement) {
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
        setDefineEdgeOpen
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
        ...currentConnectionData
      };
      dispatch(postEdge(id, edge, setDefineEdgeOpen, handleAlerts));
    }
    setIsUpdatingElement(false);
  };

  const closeDefineEdge = useCallback(() => {
    setDefineEdgeOpen(false);
    setIsUpdatingElement(false);
  }, []);

  const handleChangeLabel = useCallback((_label) => {
    if (_label.__isNew__) {
      dispatch(addEdgeToList({
        id: null,
        label: _label.value,
        description: null,
        values: [],
        style: '{"color": {"a": 1, "b": 0, "g": 0, "r": 0}'
      }));
    }
    setRelationshipLabel(_label.value);
  }, []);
  const handleChangeValue = useCallback((value) => setRelationshipValue(value ? value.value : value), []);
  const handleTypeChange = useCallback((type) => setRelationshipType(type.value), []);
  const handleColorChange = useCallback((color) => setRelationshipColor(color.rgb), []);
  const handleShowArrowChange = useCallback((e) => setShowArrow(e.target.checked), []);
  const handleAnimatedLineChange = useCallback((e) => setAnimatedLine(e.target.checked), []);
  const handleShowLabelChange = useCallback((e) => setShowlabel(e.target.checked), []);
  const handleDeleteEdge = useCallback(() => onElementsRemove([elementToUpdate]), [elementToUpdate]);

  const flowStyle = {
    backgroundColor: 'white'
  };

  window.onbeforeunload = () => {
    onWorkspaceSave();
  };

  useEffect(() => {
    if (reactFlowContainer) {
      setReactFlowDimensions({
        height: reactFlowContainer.current.clientHeight,
        width: reactFlowContainer.current.clientWidth
      });
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    onWorkspaceSave();
  }, [rfInstance, elements]);

  return (
    <div>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <div className={classes.root} ref={reactFlowContainer} onMouseLeave={onMouseLeave}>
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          style={flowStyle}
          nodeTypes={nodeTypes}
          onMove={(flowTransform) => {
            if (flowTransform) {
              setCurrentZoom(flowTransform.zoom);
            }
          }}
          edgeTypes={{ custom: CustomEdge }}
          onLoad={onLoad}
          connectionMode={ConnectionMode.Loose}
          onElementClick={onElementClick}
        >
          <MiniMap
            nodeStrokeWidth={3}
            nodeColor={theme.palette.secondary.light}
            style={{ top: 0, right: 0 }}
          />
          <Controls>
            {/* <ControlButton onClick={() => console.log('another action')}>
                  <PhotoCameraIcon />
                </ControlButton> */}
            <ControlButton onClick={() => dispatch(changeHandleVisability(!handleVisability))}>
              {handleVisability ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </ControlButton>
          </Controls>
          {handleVisability
               && (
                 <Background
                   variant={BackgroundVariant.Lines}
                   gap={BASE_BG_GAP / currentZoom}
                   size={BASE_BG_STROKE / currentZoom}
                 />
               )}
        </ReactFlow>
      </div>
      <WorkspaceMeta
        open={metaOpen}
        label={label}
        description={description}
        group={group}
        labelChange={(e) => dispatch(labelChange(e.target.value))}
        descriptionChange={(e) => dispatch(descriptionChange(e.target.value))}
        addGroup={(_group) => dispatch(addGroup(_group.value))}
        groupsDropDownOptions={groupsDropDownOptions}
        onSave={() => dispatch(putWorkspace(id, label, description, group, setMetaOpen))}
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
        handleSave={handleRelationshipSave}
        isUpdatingElement={isUpdatingElement}
        handleDeleteEdge={handleDeleteEdge}
        loading={loading}
      />
      <DefineNode
        open={defineNodeOpen}
        close={() => {
          setDefineNodeOpen(false);
          setNodeLabel('');
          setIsUpdatingElement(false);
        }}
        nodes={nodes}
        nodeLabel={nodeLabel}
        handleChangeLabel={(_label) => {
          if (_label.__isNew__) {
            dispatch(addWorkspaceNodeToList({
              attributes: [],
              description: null,
              id: null,
              label: _label.value,
              style: '{"borderColor": {"a": 1, "b": 0, "g": 0, "r": 0}, "backgroundColor": {"a": 1, "b": 255, "g": 255, "r": 255}}'
            }));
          }
          setNodeLabel(_label.value);
        }}
        attributes={attributes}
        handleChangeAttributes={(_attributes, newRow, isNew) => {
          if (isNew) {
            newRow.value = newRow.label;
            dispatch(addWorkspaceNodeAttributToList(newRow));
          }
          setAttributes(_attributes);
        }}
        nodeColor={nodeColor}
        handleChangeColor={(color) => setNodeColor(color.rgb)}
        nodeBorderColor={nodeBorderColor}
        handleBorderColorChange={(color) => setNodeBorderColor(color.rgb)}
        handleNodeSave={handleNodeSave}
        nodeDisplayName={nodeDisplayName}
        nodeFigur={nodeFigur}
        handleNodeFigurChange={(_figur) => setNodeFigur(_figur.value)}
        isUpdatingElement={isUpdatingElement}
        handleDisplayNameChange={(e) => setNodeDisplayName(e.target.value)}
        handleDeleteNode={() => onElementsRemove([elementToUpdate])}
        loading={loading}
        attributesDropDownOptions={attributesDropDownOptions}
        handleRemoveAttributes={(_id, index) => {
          setAttributes(att => att.filter((v, i) => i !== index));
          if (_id) {
            setDeletedAttributes(attr => [...attr, _id]);
          }
        }}
      />
      {alerts[alertId] && (
        <AlertModal
          title={alerts[alertId]?.label}
          description={alerts[alertId]?.description}
          handleSeeCondition={() => {
            const location = window.location.href.replace(
              history.location.pathname,
              `/app/red%20flags/${alerts[alertId]?.isNode}`
            );
            const win = window.open(location, '_blank');
            win.focus();
          }
          }
          open={alertOpen}
          handleClose={() => setAlertOpen(false)}
        />
      )}
      <AlertLog
        open={showAlertLog}
        close={() => setShowAlertLog(false)}
        alerts={alerts}
        history={history}
      />
      <FormDialog
        loading={loading}
        open={showCvrModal}
        handleClose={() => setShowCvrModal(false)}
        title="CVR-opslag"
        description="Indtast CVR-nummer. Herefter indlæser vi koncernstrukturen for dig."
        textFielLabel="CVR-nummer"
        onConfirm={(value, close) => {
          const erstNodeArray = Object.values(erstTypes.nodes);
          const erstEdgeArray = Object.values(erstTypes.edges);
          const nodeLabels = nodes.map((node) => node.label);
          const relationshipLabels = relationships.toJS().map((r) => r.label);
          if (erstNodeArray.every(n => nodeLabels.includes(n)) && erstEdgeArray.every(e => relationshipLabels.includes(e))) {
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
      {!metaOpen && !defineEdgeOpen && !defineNodeOpen && !showAlertLog && (
        <WorkspaceFabs
          nodeClick={() => setDefineNodeOpen(true)}
          metaClick={() => setMetaOpen(true)}
          saveClick={onWorkspaceSave}
          onAlertClick={() => setShowAlertLog(true)}
          onAnalysisClick={() => history.push(`analysis/${id}`)}
          onCvrClick={() => setShowCvrModal(true)}
        />
      )}
    </div>
  );
};

Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Workspace);
