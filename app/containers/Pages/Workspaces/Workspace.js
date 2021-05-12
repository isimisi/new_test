/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useState, useRef } from 'react';
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
  WorkspaceFab, CustomNode,
  DefineEdge, CustomEdge
} from '@components';
import PropTypes from 'prop-types';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import styles from './workspace-jss';
import { initElement } from './constants';


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
  const reactFlowWrapper = useRef(null);
  // const [metaOpen, setMetaOpen] = useState(false);
  const [elements, setElements] = useState(initElement);
  const [reactFlowInstance, setReactFlowInstance] = useState();

  // EDGE
  const [defineEdgeOpen, setDefineEdgeOpen] = useState(false);
  const [relationshipLabel, setRelationshipLabel] = useState('');
  const [relationshipValue, setRelationshipValue] = useState('');
  const [relationshipDescription, setRelationshipDescription] = useState('');
  const [relationshipType, setRelationshipType] = useState('');
  const [relationshipColor, setRelationshipColor] = useState({
    r: 0, g: 0, b: 0, a: 0
  });
  const [showArrow, setShowArrow] = useState(false);
  const [animatedLine, setAnimatedLine] = useState(false);
  const [showLabel, setShowlabel] = useState(false);
  console.log(relationshipColor);

  const onConnect = () => {
    setDefineEdgeOpen(true);
  };

  const handleSave = (edge) => {
    setElements((els) => addEdge(edge, els));
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
        relationshipLabel={relationshipLabel}
        handleChangeLabel={(label) => setRelationshipLabel(label.value)}
        relationshipValue={relationshipValue}
        handleChangeValue={(value) => setRelationshipValue(value.value)}
        description={relationshipDescription}
        handleDescriptionChange={(e) => setRelationshipDescription(e.target.value)}
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
        handleSave={(edge) => handleSave(edge)}
      />
      {/** !metaOpen && */!defineEdgeOpen && <WorkspaceFab />}
    </div>
  );
};

Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Workspace);
