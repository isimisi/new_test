/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useState, useRef, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  Controls,
  ControlButton,
  Background,
} from 'react-flow-renderer';
import {
  WorkspaceFabs, CustomNode,
  DefineEdge, CustomEdge, DefineNode, WorkspaceMeta,
  Notification
} from '@components';
import PropTypes from 'prop-types';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import styles from './workspace-jss';
import { initElement, reducer } from './constants';
import {
  getRelationships, getNodes, postEdge, postNode,
  changeHandleVisability, labelChange, descriptionChange,
  addGroup, getGroupDropDown, putWorkspace, closeNotifAction
} from './reducers/workspaceActions';
import { getSize } from '../Nodes/constants';

const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

const nodeTypes = {
  custom: CustomNode
};

const Workspace = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();
  const [metaOpen, setMetaOpen] = useState(false);
  const [elements, setElements] = useState(initElement);

  // relationship
  const [defineEdgeOpen, setDefineEdgeOpen] = useState(false);
  const [currentConnectionData, setCurrentConnectionData] = useState({});
  const [relationshipLabel, setRelationshipLabel] = useState('');
  const [relationshipValue, setRelationshipValue] = useState('');
  const [relationshipType, setRelationshipType] = useState('');
  const [relationshipColor, setRelationshipColor] = useState({
    r: 0, g: 0, b: 0, a: 1
  });
  const [showArrow, setShowArrow] = useState(false);
  const [animatedLine, setAnimatedLine] = useState(false);
  const [showLabel, setShowlabel] = useState(false);

  // REDUX
  const relationships = useSelector(state => state.getIn([reducer, 'relationships'])).toJS();
  const nodes = useSelector(state => state.getIn([reducer, 'nodes'])).toJS();
  const handleVisability = useSelector(state => state.getIn([reducer, 'handleVisability']));
  const label = useSelector(state => state.getIn([reducer, 'label']));
  const description = useSelector(state => state.getIn([reducer, 'description']));
  const group = useSelector(state => state.getIn([reducer, 'group']));
  const groupsDropDownOptions = useSelector(state => state.getIn([reducer, 'groupsDropDownOptions'])).toJS();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));


  const [defineNodeOpen, setDefineNodeOpen] = useState(false);
  const [nodeLabel, setNodeLabel] = useState('');
  const [attributes, setAttributes] = useState([{
    label: null,
    value: ''
  }]);
  const [nodeSize, setNodeSize] = useState('Medium');
  const [nodeColor, setNodeColor] = useState({
    r: 255, g: 255, b: 255, a: 1
  });
  const [nodeBorderColor, setNodeBorderColor] = useState({
    r: 0, g: 0, b: 0, a: 1
  });


  const choosenNode = nodes.find(r => r.label === nodeLabel);
  const choosenNodeStyle = choosenNode && JSON.parse(choosenNode.style);

  useEffect(() => {
    if (choosenNode) {
      setNodeColor(choosenNodeStyle.backgroundColor);
      setNodeBorderColor(choosenNodeStyle.borderColor);
      setNodeSize(getSize(choosenNodeStyle.width));
    }
  }, [nodeLabel]);

  useEffect(() => {
    dispatch(getRelationships());
    dispatch(getNodes());
    dispatch(getGroupDropDown());

    if (label.length === 0 || description.length === 0 || group.length === 0) {
      setMetaOpen(true);
    }
  }, []);

  const onConnect = (data) => {
    if (data.source !== data.target) {
      setCurrentConnectionData(data);
      setDefineEdgeOpen(true);
    }
  };

  const handleRelationshipSave = () => {
    const choosenRelationship = relationships.find(r => r.label === relationshipLabel);
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

    setRelationshipLabel('');
    setRelationshipValue('');
    setRelationshipType('');
    setRelationshipColor({
      r: 0, g: 0, b: 0, a: 1
    });
    setShowArrow(false);
    setAnimatedLine(false);
    setShowlabel(false);

    setElements((els) => addEdge(currentConnectionData, els));
  };

  const handleNodeSave = () => {
    const newNode = {
      id: Math.random() * 10000, // TODO: make logic for this,
      type: 'custom',
      data: {
        label: (
          <>
            <Typography variant="subtitle1">{choosenNode.label}</Typography>
          </>
        ),
      },
      position: { x: 0, y: 0 },
    };

    dispatch(postNode(id, choosenNode.id, newNode, setDefineNodeOpen));

    setNodeLabel('');
    setElements((els) => els.concat(newNode));
  };


  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) => {
    _reactFlowInstance.fitView();
  };

  const onElementClick = (event, element) => {
    console.log(event, element);
  };

  return (
    <div>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <ReactFlowProvider>
        <div className={classes.root}>
          <div
            className={classes.content}
            ref={reactFlowWrapper}
          >
            <ReactFlow
              elements={elements}
              onElementsRemove={onElementsRemove}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              edgeTypes={{ custom: CustomEdge }}
              onLoad={onLoad}
              onDragOver={onDragOver}
              connectionMode="loose"
              onElementClick={onElementClick}
            >
              <Controls>
                <ControlButton onClick={() => console.log('another action')}>
                  <PhotoCameraIcon />
                </ControlButton>
                <ControlButton onClick={() => dispatch(changeHandleVisability(!handleVisability))}>
                  {handleVisability ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </ControlButton>
              </Controls>
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>
        </div>
      </ReactFlowProvider>
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
        close={() => setDefineEdgeOpen(false)}
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
      />
      <DefineNode
        open={defineNodeOpen}
        close={() => { setDefineNodeOpen(false); }}
        nodes={nodes}
        nodeLabel={nodeLabel}
        handleChangeLabel={(_label) => setNodeLabel(_label.value)}
        attributes={attributes}
        handleChangeAttributes={(_attributes) => setAttributes(_attributes)}
        nodeSize={nodeSize}
        handleChangeSize={(size) => setNodeSize(size)}
        nodeColor={nodeColor}
        handleChangeColor={(color) => setNodeColor(color.rgb)}
        nodeBorderColor={nodeBorderColor}
        handleBorderColorChange={(color) => setNodeBorderColor(color.rgb)}
        handleNodeSave={handleNodeSave}
      />
      {!metaOpen && !defineEdgeOpen && !defineNodeOpen && <WorkspaceFabs nodeClick={() => setDefineNodeOpen(true)} metaClick={() => setMetaOpen(true)} />}
    </div>
  );
};

Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Workspace);
