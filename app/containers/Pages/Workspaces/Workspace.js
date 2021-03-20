/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  Controls,
  Background,
} from 'react-flow-renderer';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './workspace-jss';
import DrapAndDropPanel from './DragAndDropPanel';

const initElement = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <>
          <strong>Virksomhed A</strong>
        </>
      ),
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: (
        <>
          <strong>Datter</strong>
        </>
      ),
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: {
      label: (
        <>
          <strong>Datter med leverandør</strong>
        </>
      ),
    },
    position: { x: 400, y: 100 },
    style: {
      background: '#D6D5E6',
      color: '#333',
      border: '1px solid #222138',
      width: 180,
    },
  },
  {
    id: '4',
    position: { x: 250, y: 200 },
    data: {
      label: 'Leverandør',
    },
  },
  {
    id: '5',
    data: {
      label: 'Data lagring',
    },
    position: { x: 250, y: 325 },
  },
  {
    id: '6',
    type: 'output',
    data: {
      label: (
        <>
          <strong>AWS</strong>
        </>
      ),
    },
    position: { x: 100, y: 480 },
  },
  {
    id: '7',
    type: 'output',
    data: { label: 'Google Cloud' },
    position: { x: 400, y: 450 },
  },
  {
    id: 'e1-2', source: '1', target: '2', label: 'Ingen Data'
  },
  { id: 'e1-3', source: '1', target: '3' },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    label: 'Data',
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    arrowHeadType: 'arrowclosed',
    label: 'Data',
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'smoothstep',
    label: 'krypteret',
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    type: 'step',
    style: { stroke: '#f6ab6c' },
    label: 'Ukrypteret',
    animated: true,
    labelStyle: { fill: '#f6ab6c', fontWeight: 700 },
  },
];

const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};


let id = 0;
const getId = () => `dndnode_${id++}`;

const OverviewFlow = (props) => {
  const { classes } = props;
  const [elements, setElements] = useState(initElement);
  const [reactFlowInstance, setReactFlowInstance] = useState();

  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance);

  const onDrop = (event) => {
    event.preventDefault();
    console.log(event);
    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY - 40 });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
      };

      setElements((es) => es.concat(newNode));
    }
  };

  return (
    <div>
      <ReactFlowProvider>
        <Grid container spacing={3} style={{ justifyContent: 'space-around' }}>
          <DrapAndDropPanel />
          <Grid
            xs={7}
            item
            style={{ height: '80vh' }}
            className={classes.paperGlass}
          >
            <ReactFlow
              elements={elements}
              onElementsRemove={onElementsRemove}
              onConnect={onConnect}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
              snapToGrid
              snapGrid={[15, 15]}
            >
              <Controls />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </Grid>
        </Grid>
      </ReactFlowProvider>
    </div>
  );
};

OverviewFlow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OverviewFlow);
