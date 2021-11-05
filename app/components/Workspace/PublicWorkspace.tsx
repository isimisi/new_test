/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import React, {
  useState, useEffect, useCallback, useRef, MutableRefObject
} from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import ReactFlow, {
  Controls,
  MiniMap,
  ControlButton,
  Background,
  isNode,
  ConnectionMode,
  BackgroundVariant,
  OnLoadParams,
  FlowElement,
  Node
} from 'react-flow-renderer';
import logoBeta from '@images/logoBeta.svg';
import brand from '@api/dummy/brand';
import {NodeDropdownInstance} from '../../types/reactFlow'
import WorkspaceFabs from '@components/Workspace/WorkspaceFabs'
import CustomNode from '@components/Workspace/Node/CustomNode'
import StickyNoteNode from '@components/Workspace/Node/StickyNoteNode'
import DefineEdge from '@components/Workspace/Edge/DefineEdge'
import CustomEdge from '@components/Workspace/Edge/CustomEdge'
import DefineNode from '@components/Workspace/Node/DefineNode'
import CompanyDataModel from '@components/Workspace/CompanyDataModel'
import CvrDialog from '@components/DialogModal/CvrDialog'

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { Fab } from 'react-tiny-fab';
import { useHistory } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import { useScreenshot, createFileName } from 'use-react-screenshot';
import { getId } from '@api/constants';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import styles from './workspace-jss';
import { reducer, initErstTypes as erstTypes } from '../../containers/Pages/Workspaces/constants';
import {
  getRelationships, getNodes, postEdge, postNode,
  changeHandleVisability,
  getGroupDropDown, saveWorkspace, deleteWorkspaceElement,
  putNode, putEdge, getAttributeDropDown, addWorkspaceNodeToList,
  addEdgeToList, addWorkspaceNodeAttributToList,
  cvrWorkspace, postSticky, showNotifAction,
  getCompanyData, signWorkspace, showWorkspace
} from '../../containers/Pages/Workspaces/reducers/workspaceActions';
import '../../containers/Pages/Workspaces/workspace.css';
import SignWorkspace from './SignWorkspace';


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
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const id = getId(history);
  const reactFlowContainer = useRef(null);
  const [image, takeScreenShot] = useScreenshot();
  const [reactFlowDimensions, setReactFlowDimensions] = useState<Dimensions | null>(null);
  const [currentZoom, setCurrentZoom] = useState(1);


  // REDUX
  const relationships = useSelector(state => state[reducer].get('relationships'));
  const nodes = useSelector(state => state[reducer].get('nodes')).toJS();
  const handleVisability = useSelector(state => state[reducer].get('handleVisability'));
  const elements = useSelector(state => state[reducer].get('elements')).toJS();
  const label = useSelector(state => state[reducer].get('label'));
  const group = useSelector(state => state[reducer].get('group'));
  const signed = useSelector(state => state[reducer].get('signed'));
  const signedBy = useSelector(state => state[reducer].get('signedBy'));
  const editable = useSelector(state => state[reducer].get('editable'));

  const attributesDropDownOptions = useSelector(state => state[reducer].get('attributesDropDownOptions')).toJS();
  const loading = useSelector(state => state[reducer].get('loading'));
  const companyData = useSelector(state => state[reducer].get('companyData'));

  const [rfInstance, setRfInstance] = useState<OnLoadParams | null>(null);

  const [showCvrModal, setShowCvrModal] = useState(false);
  const [showCompanyData, setShowCompanyData] = useState(false);
  const [showSignWorkspace, setShowSignWorkspace] = useState(false);

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

  const onLoad = (_reactFlowInstance: OnLoadParams) => {
    setRfInstance(_reactFlowInstance);
    _reactFlowInstance.fitView();
  };

  const onElementClick = (event, element) => {
    setShowCompanyData(false);
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

  useEffect(() => {
    dispatch(showWorkspace(id));
    dispatch(getRelationships(group));
    dispatch(getNodes(group));
    dispatch(getGroupDropDown());
    dispatch(getAttributeDropDown(group));
  }, []);

  const handleNodeSave = () => {
    const _attributes = JSON.stringify(attributes.filter(a => a.label));
    const rf = rfInstance?.toObject();

    let x = 0
    let y = 0

    if(rf && reactFlowDimensions) {
      x = (rf.position[0] * -1 + reactFlowDimensions.width) / rf.zoom - 250;
      y = (rf.position[1] * -1 + reactFlowDimensions.height) / rf.zoom - 150;
    }
    if(choosenNode) {
      if (!editable) {
        dispatch(showNotifAction('At tilføje og ændre elementer i et arbejdsområde er en Base-feature. Opgrader til Base for at tilføje og ændre elementer'));
      } else if (isUpdatingElement && elementToUpdate) {
        dispatch(putNode(elementToUpdate.id, choosenNode.id, choosenNode.label, nodeDisplayName, nodeFigur, JSON.stringify(nodeColor), JSON.stringify(nodeBorderColor), _attributes, JSON.stringify(deletedAttributes), setDefineNodeOpen));
      } else {
        dispatch(postNode(
          id,
          choosenNode.id, choosenNode.label,
          nodeDisplayName, nodeFigur,
          JSON.stringify(nodeColor), JSON.stringify(nodeBorderColor),
          _attributes, setDefineNodeOpen, null,
          x, y
        ));
        setNodeLabel('');
      }
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
    if (!editable) {
      dispatch(showNotifAction('At tilføje og ændre relationer i et arbejdsområde er en Base-feature. Opgrader til Base for at tilføje og ændre relationer'));
    } else if (isUpdatingElement && elementToUpdate) {
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
        lineThrough,
        ...currentConnectionData
      };
      dispatch(postEdge(id, edge, setDefineEdgeOpen, null));
    }

    setIsUpdatingElement(false);
  };

  const closeDefineEdge = useCallback(() => {
    setDefineEdgeOpen(false);
    setIsUpdatingElement(false);
  }, []);

  const handleChangeLabel = useCallback((_label) => {
    if (_label.__isNew__ && !editable) {
      dispatch(addEdgeToList({
        id: null,
        label: _label.value,
        description: null,
        values: [],
        style: '{"color": {"a": 1, "b": 0, "g": 0, "r": 0}'
      }));
    }
    if (_label.__isNew__ && !editable) {
      dispatch(showNotifAction('Du kan ikke lave nye relationstyper. Dette er en Draw-feature. Kontakt os for mere information.'));
    } else {
      setRelationshipLabel(_label.value);
    }
  }, []);
  const handleChangeValue = useCallback((value) => setRelationshipValue(value ? value.value : value), []);
  const handleTypeChange = useCallback((type) => setRelationshipType(type.value), []);
  const handleColorChange = useCallback((color) => setRelationshipColor(color.rgb), []);
  const handleShowArrowChange = useCallback((e) => setShowArrow(e.target.checked), []);
  const handleAnimatedLineChange = useCallback((e) => setAnimatedLine(e.target.checked), []);
  const handleShowLabelChange = useCallback((e) => setShowlabel(e.target.checked), []);
  const handleLineThroughChange = useCallback((e) => setLineThrough(e.target.checked), []);
  const handleDeleteEdge = useCallback(() => onElementsRemove([elementToUpdate]), [elementToUpdate]);

  const handlePostSticky = () => {
    if (!editable) {
      dispatch(showNotifAction('At tilføje noter til et arbejdsområde er en Base-feature. Opgrader til Base for at tilføje noter'));
    } else {
      const rf = rfInstance?.toObject();
      const x = rf && reactFlowDimensions && (rf.position[0] * -1 + reactFlowDimensions.width) / rf.zoom - 250;
      const y = rf && reactFlowDimensions && (rf.position[1] * -1 + reactFlowDimensions.height) / rf.zoom - 150;

      dispatch(postSticky(id, x, y));
    }
  };

  const flowStyle = {
    backgroundColor: 'white'
  };

  window.onbeforeunload = () => {
    onWorkspaceSave();
  };

  useEffect(() => {
    if (reactFlowContainer) {
      setReactFlowDimensions({
        //@ts-ignore
        height: reactFlowContainer.current.clientHeight, //@ts-ignore
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

  return (
    <div>
      <div className={classes.canvasRoot} ref={reactFlowContainer} onMouseLeave={onMouseLeave}>
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          minZoom={0.3}
          maxZoom={3}
          nodesDraggable={editable ? !signed : false}
          nodesConnectable={editable ? !signed : false}
          elementsSelectable={editable ? !signed : false}
          selectNodesOnDrag={editable ? !signed : false}
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
          onElementClick={editable && !signed && onElementClick}
        >
          <div data-html2canvas-ignore="true">
            <MiniMap
              nodeStrokeWidth={3}
              nodeColor={theme.palette.secondary.light}
              style={{ top: 0, right: 0 }}
            />
          </div>
          <div data-html2canvas-ignore="true">
            <Controls className={classes.controls} showInteractive={editable ? !signed : false}>
              <ControlButton onClick={() => {
                takeScreenShot(reactFlowContainer?.current);
              }}
              >
                <PhotoCameraIcon />
              </ControlButton>
              {editable ? !signed : false && (
                <ControlButton onClick={() => dispatch(changeHandleVisability(!handleVisability))}>
                  {handleVisability ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </ControlButton>
              )}
            </Controls>
          </div>
          {handleVisability && editable ? !signed : false
            && (
              <Background
                variant={BackgroundVariant.Lines}
                gap={BASE_BG_GAP / currentZoom}
                size={BASE_BG_STROKE / currentZoom}
              />
            )}
        </ReactFlow>
        <a
          href="https://www.juristic.io/"
          className={signed ? classes.signedLogo : classes.logo}
        >
          <img className={classes.img} src={logoBeta} alt={brand.name} />
        </a>
        {signed && (
          <div className={classes.signed}>
            <div className={classes.signedRow}>
              <div className={classes.signedCircle} />
              <Typography className={classes.signedText}>
            Godkendt og låst af
                {' '}
                {' '}
                {signedBy}
              </Typography>
            </div>
            <div className={classes.signedRow}>
              <Typography  className={classes.signedId}>
              ID:
                {' '}
                {window.btoa(signedBy + id)}
              </Typography>
            </div>
          </div>
        )}
      </div>
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
        close={() => {
          setDefineNodeOpen(false);
          setNodeLabel('');
          setIsUpdatingElement(false);
        }}
        nodes={nodes}
        nodeLabel={nodeLabel}
        handleChangeLabel={(_label) => {
          if (_label.__isNew__ && !editable) {
            dispatch(addWorkspaceNodeToList({
              attributes: [],
              description: null,
              id: null,
              label: _label.value,
              style: '{"borderColor": {"a": 1, "b": 0, "g": 0, "r": 0}, "backgroundColor": {"a": 1, "b": 255, "g": 255, "r": 255}}'
            }));
          }
          if (_label.__isNew__ && !editable) {
            dispatch(showNotifAction('Du kan ikke lave nye elementtyper. Dette er en Draw-feature. Kontakt os for mere information.'));
          } else {
            setNodeLabel(_label.value);
          }
        }}
        attributes={attributes}
        handleChangeAttributes={(_attributes, newRow, isNew) => {
          if (isNew && !editable) {
            newRow.value = newRow.label;
            dispatch(addWorkspaceNodeAttributToList(newRow));
          }

          if (isNew && !editable) {
            dispatch(showNotifAction('Du kan ikke lave nye kendetegnstyper. Dette er en Draw-feature. Kontakt os for mere information.'));
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
            //@ts-ignore
            setDeletedAttributes(attr => [...attr, _id]);
          }
        }}
        showCompanyData={() => {
          if(elementToUpdate) {
            dispatch(getCompanyData(elementToUpdate.id, setShowCompanyData, setDefineNodeOpen, setNodeLabel, setIsUpdatingElement));
          }
        }}
      />
      <CvrDialog
        loading={loading}
        open={showCvrModal}
        handleClose={() => setShowCvrModal(false)}
        title="Indlæs fra CVR"
        description="Søg på en virksomhed eller et CVR-nummer:"
        textFielLabel="CVR-nummer"
        onConfirm={(value, close) => {
          dispatch(cvrWorkspace(id, value, close, erstTypes));
        }}
      />
      {!defineEdgeOpen && !defineNodeOpen && !showCompanyData && !showSignWorkspace && editable && !signed && (
        <WorkspaceFabs
          nodeClick={() => setDefineNodeOpen(true)}
          saveClick={onWorkspaceSave}
          onCvrClick={() => setShowCvrModal(true)}
          stickyClick={handlePostSticky}
          signWorkspaceClick={() => setShowSignWorkspace(true)}
          editable={editable}
        />
      )}
      {!editable && !showSignWorkspace && !signed && (
        <Fab
          onClick={() => setShowSignWorkspace(true)}
          icon={<BorderColorIcon style={{ color: theme.palette.primary.main }} />}
          mainButtonStyles={{ backgroundColor: theme.palette.secondary.main }}
        />
      )}
      <CompanyDataModel
        open={showCompanyData}
        close={() => setShowCompanyData(false)}
        displayName={elementToUpdate?.data?.displayName}
        companyData={companyData}
      />
      <SignWorkspace
        open={showSignWorkspace}
        closeForm={() => setShowSignWorkspace(false)}
        onSave={() => dispatch(signWorkspace(id, setShowSignWorkspace))}
      />

    </div>
  );
};

Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Workspace);
