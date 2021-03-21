/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useState, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  Controls,
  Background,
} from 'react-flow-renderer';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import styles from './workspace-jss';
import DrapAndDropPanel from './DragAndDropPanel';
import NamingForm from '../../../components/Forms/NamingForm';

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
  const reactFlowWrapper = useRef(null);
  const [elements, setElements] = useState(initElement);
  const [reactFlowInstance, setReactFlowInstance] = useState();

  const onConnect = (params) => setElements((els) => addEdge(params, els));
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

  return (
    <div>
      <NamingForm type="condition" />
      <ReactFlowProvider>
        <div className={classes.root}>
          <DrapAndDropPanel />
          <div
            className={classes.content}
            ref={reactFlowWrapper}
          >
            <ReactFlow
              elements={elements}
              onElementsRemove={onElementsRemove}
              onConnect={onConnect}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <Controls />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>
        </div>
      </ReactFlowProvider>
      <div>
        <Tooltip title="Analyser">
          <Fab variant="extended" color="primary" className={classes.addBtn}>
            Analyse
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
};

OverviewFlow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OverviewFlow);
