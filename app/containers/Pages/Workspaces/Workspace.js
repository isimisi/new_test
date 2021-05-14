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
  DefineEdge, CustomEdge, DefineNode
} from '@components';
import PropTypes from 'prop-types';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import styles from './workspace-jss';
import { initElement, reducer } from './constants';
import { getRelationships, postEdge } from './reducers/workspaceActions';

const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};


let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
  custom: CustomNode
};

const Workspace = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();
  // const [metaOpen, setMetaOpen] = useState(false);
  const [elements, setElements] = useState(initElement);
  const [reactFlowInstance, setReactFlowInstance] = useState();

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

  const relationships = useSelector(state => state.getIn([reducer, 'relationships'])).toJS();

  const [defineNodeOpen, setDefineNodeOpen] = useState(true);
  const [nodeLabel, setNodeLabel] = useState('');
  const [attribues, setAttributes] = useState([]);
  const [nodeSize, setNodeSize] = useState('Medium');
  const [nodeColor, setNodeColor] = useState({
    r: 255, g: 255, b: 255, a: 1
  });
  const [nodeBorderColor, setNodeBorderColor] = useState({
    r: 0, g: 0, b: 0, a: 1
  });

  useEffect(() => {
    dispatch(getRelationships());
  }, []);

  const onConnect = (data) => {
    if (data.source !== data.target) {
      setCurrentConnectionData(data);
      setDefineEdgeOpen(true);
    }
  };

  const handleSave = () => {
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


  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);
    _reactFlowInstance.fitView();
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };

    setElements((es) => es.concat(newNode));
  };

  const onElementClick = (event, element) => {
    console.log(event, element);
  };

  return (
    <div>
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
              onDrop={onDrop}
              onDragOver={onDragOver}
              connectionMode="loose"
              onElementClick={onElementClick}
            >
              <Controls>
                <ControlButton onClick={() => console.log('another action')}>
                  <PhotoCameraIcon />
                </ControlButton>
              </Controls>
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>
        </div>
      </ReactFlowProvider>
      {/* <WorkspaceMeta
        open={metaOpen}
        to={title}
        subject={description}
        validMail=""
        closeForm={() => setMetaOpen(false)}
        sendEmail={() => {}}
        inputChange={() => {}}
      /> */}
      <DefineEdge
        open={defineEdgeOpen}
        close={() => setDefineEdgeOpen(false)}
        relationships={relationships}
        relationshipLabel={relationshipLabel}
        handleChangeLabel={(label) => setRelationshipLabel(label.value)}
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
        handleSave={() => handleSave()}
      />
      <DefineNode
        open={defineNodeOpen}
        close={() => { setDefineNodeOpen(false); }}
        nodes={[]}
        nodeLabel={nodeLabel}
        handleChangeLabel={(label) => setNodeLabel(label.value)}
        attribues={attribues}
        handleChangeAttributes={(attributes) => setAttributes(attributes)}
        nodeSize={nodeSize}
        handleChangeSize={(size) => setNodeSize(size)}
        nodeColor={nodeColor}
        handleChangeColor={(color) => setNodeColor(color.rgb)}
        nodeBorderColor={nodeBorderColor}
        handleBorderColorChange={(color) => setNodeBorderColor(color)}
      />
      {/** !metaOpen && */!defineEdgeOpen && !defineNodeOpen && <WorkspaceFabs />}
    </div>
  );
};

Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Workspace);
