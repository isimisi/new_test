/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useState, useEffect, useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactFlow, {
  removeElements,
  Controls,
  ControlButton,
  Background,
  isNode,
  ConnectionMode,
} from 'react-flow-renderer';
import {
  WorkspaceFabs, CustomNode,
  DefineEdge, CustomEdge, DefineNode, WorkspaceMeta,
  Notification, CustomConnectionLine
} from '@components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import styles from './workspace-jss';
import { reducer } from './constants';
import {
  getRelationships, getNodes, postEdge, postNode,
  changeHandleVisability, labelChange, descriptionChange,
  addGroup, getGroupDropDown, putWorkspace, closeNotifAction,
  showWorkspace, saveWorkspace, deleteWorkspaceElement,
  putNode, putEdge, getAttributeDropDown
} from './reducers/workspaceActions';

const nodeTypes = {
  custom: CustomNode
};

const initialAttribut = {
  label: null,
  value: ''
};

const Workspace = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();

  // REDUX
  const relationships = useSelector(state => state.getIn([reducer, 'relationships'])).toJS();
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
  // const zoom = useSelector(state => state.getIn([reducer, 'zoom']));
  // const xPosition = useSelector(state => state.getIn([reducer, 'xPosition']));
  // const yPosition = useSelector(state => state.getIn([reducer, 'yPosition']));

  const [metaOpen, setMetaOpen] = useState(false);
  const [rfInstance, setRfInstance] = useState(null);

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
  const [attributes, setAttributes] = useState([initialAttribut]);

  const [deletedAttributes, setDeletedAttributes] = useState([]);
  const [nodeColor, setNodeColor] = useState({
    r: 255, g: 255, b: 255, a: 1
  });
  const [nodeBorderColor, setNodeBorderColor] = useState({
    r: 0, g: 0, b: 0, a: 1
  });
  const choosenNode = nodes.find(r => r.label === nodeLabel);
  const choosenNodeStyle = choosenNode && JSON.parse(choosenNode.style);

  // REACT FLOW SPECIFIC

  const onConnect = (data) => {
    if (data.source !== data.target) {
      setCurrentConnectionData(data);
      setDefineEdgeOpen(true);
    }
  };

  const onElementsRemove = (elementsToRemove) => {
    const remainingElements = removeElements(elementsToRemove, elements);
    setIsUpdatingElement(false);
    setElementToUpdate(null);

    if (elementsToRemove.length === 1) {
      if (isNode(elementsToRemove[0])) {
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

  useEffect(() => {
    dispatch(showWorkspace(id, setMetaOpen));
    dispatch(getRelationships());
    dispatch(getNodes());
    dispatch(getGroupDropDown());
    dispatch(getAttributeDropDown());
  }, []);
  // TODO: DOes not work
  // useEffect(() => {
  //   if (rfInstance) {
  //     rfInstance.zoomTo(zoom);
  //   }
  // }, [zoom]);

  // useEffect(() => {
  //   if (rfInstance) {
  //     rfInstance.project({ x: xPosition, y: yPosition });
  //   }
  // }, [xPosition, yPosition]);

  // NODE

  const handleNodeSave = () => {
    const _attributes = JSON.stringify(attributes.filter(a => a.label));
    if (isUpdatingElement) {
      dispatch(putNode(elementToUpdate.id, choosenNode.id, nodeDisplayName, JSON.stringify(nodeColor), JSON.stringify(nodeBorderColor), _attributes, JSON.stringify(deletedAttributes), setDefineNodeOpen));
    } else {
      dispatch(postNode(id, choosenNode.id, nodeDisplayName, JSON.stringify(nodeColor), JSON.stringify(nodeBorderColor), _attributes, setDefineNodeOpen));
      setNodeLabel('');
    }
    setIsUpdatingElement(false);
  };

  useEffect(() => {
    if (choosenNode) {
      setNodeColor(choosenNodeStyle.backgroundColor);
      setNodeBorderColor(choosenNodeStyle.borderColor);
      setAttributes([...choosenNode.attributes, initialAttribut]);
    }
  }, [nodeLabel]);

  // RELATIONSHIP

  const handleRelationshipSave = () => {
    const choosenRelationship = relationships.find(r => r.label === relationshipLabel);

    if (isUpdatingElement) {
      dispatch(putEdge(
        elementToUpdate.id,
        choosenRelationship.id,
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
        relationshipValue,
        relationshipColor,
        relationshipType,
        showArrow,
        animatedLine,
        showLabel,
        ...currentConnectionData
      };
      dispatch(postEdge(id, edge, setDefineEdgeOpen));
    }
    setIsUpdatingElement(false);
  };


  return (
    <div>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <div className={classes.root}>
        <div
          className={classes.content}
        >
          <ReactFlow
            elements={elements}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={{ custom: CustomEdge }}
            onLoad={onLoad}
            connectionMode={ConnectionMode.Loose}
            connectionLineComponent={CustomConnectionLine}
            onElementClick={onElementClick}
          >
            <Controls>
              {/* <ControlButton onClick={() => console.log('another action')}>
                  <PhotoCameraIcon />
                </ControlButton> */}
              <ControlButton onClick={() => dispatch(changeHandleVisability(!handleVisability))}>
                {handleVisability ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </ControlButton>
            </Controls>
            {handleVisability && <Background color="#aaa" gap={16} />}
          </ReactFlow>
        </div>
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
        close={() => {
          setDefineEdgeOpen(false);
          setIsUpdatingElement(false);
        }}
        relationships={relationships}
        relationshipLabel={relationshipLabel}
        handleChangeLabel={(_label) => setRelationshipLabel(_label.value)}
        relationshipValue={relationshipValue}
        handleChangeValue={(value) => setRelationshipValue(value ? value.value : value)}
        type={relationshipType}
        handleTypeChange={(type) => setRelationshipType(type.value)}
        color={relationshipColor}
        handleColorChange={(color) => setRelationshipColor(color.rgb)}
        showArrow={showArrow}
        handleShowArrowChange={(e) => setShowArrow(e.target.checked)}
        animatedLine={animatedLine}
        handleAnimatedLineChange={(e) => setAnimatedLine(e.target.checked)}
        showLabel={showLabel}
        handleShowLabelChange={(e) => setShowlabel(e.target.checked)}
        handleSave={() => handleRelationshipSave()}
        isUpdatingElement={isUpdatingElement}
        handleDeleteEdge={() => onElementsRemove([elementToUpdate])}
        loading={loading}
      />
      <DefineNode
        open={defineNodeOpen}
        close={() => {
          setDefineNodeOpen(false);
          setIsUpdatingElement(false);
        }}
        nodes={nodes}
        nodeLabel={nodeLabel}
        handleChangeLabel={(_label) => setNodeLabel(_label.value)}
        attributes={attributes}
        handleChangeAttributes={(_attributes) => setAttributes(_attributes)}
        nodeColor={nodeColor}
        handleChangeColor={(color) => setNodeColor(color.rgb)}
        nodeBorderColor={nodeBorderColor}
        handleBorderColorChange={(color) => setNodeBorderColor(color.rgb)}
        handleNodeSave={handleNodeSave}
        nodeDisplayName={nodeDisplayName}
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
      {!metaOpen && !defineEdgeOpen && !defineNodeOpen && (
        <WorkspaceFabs
          nodeClick={() => setDefineNodeOpen(true)}
          metaClick={() => setMetaOpen(true)}
          saveClick={onWorkspaceSave}
        />
      )}
    </div>
  );
};

Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Workspace);
