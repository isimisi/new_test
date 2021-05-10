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
import {
  WorkspaceMeta, /** WorkspaceFab, */ CustomNode,
  CustomConnectionLine,
  CustomEdge
} from '@components';
import PropTypes from 'prop-types';
import styles from './workspace-jss';


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
  const [metaOpen, setMetaOpen] = useState(false);

  const initElement = [
    {
      id: '1',
      type: 'custom',
      data: {
        label: (
          <>
            <strong>Lux Fund</strong>
          </>
        ),
      },
      position: { x: 250, y: 0 },
    },
    {
      id: '2',
      type: 'custom',
      data: {
        label: (
          <>
            <strong>DK HoldCo</strong>
          </>
        ),
      },
      position: { x: 245, y: 200 },
    },
    {
      id: '3',
      type: 'custom',
      data: {
        label: (
          <>
            <strong>Seller</strong>
          </>
        ),
      },
      position: { x: 540, y: 200 },
    },
    {
      id: '4',
      type: 'custom',
      data: {
        label: (
          <>
            <strong>Target</strong>
          </>
        ),
      },
      position: { x: 260, y: 350 },
    },
    {
      id: '5',
      type: 'custom',
      data: {
        label: (
          <>
            <strong>Investors</strong>
          </>
        ),
      },
      position: { x: 450, y: 0 },
    },
    {
      id: '6',
      type: 'custom',
      data: {
        label: (
          <>
            <strong>Investors</strong>
          </>
        ),
      },
      position: { x: 600, y: 0 },
    },
    {
      id: '11',
      source: '5',
      target: '3',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      style: { stroke: '#000' },
      type: 'smoothstep'
    },
    {
      id: '12',
      source: '6',
      target: '3',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      style: { stroke: '#000' },
      type: 'smoothstep'
    },
    {
      id: '13',
      source: '1',
      target: '2',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      style: { stroke: '#000' },
      label: '100%',
      type: 'straight'
    },
    {
      id: '14',
      source: '2',
      target: '3',
      sourceHandle: 'right',
      targetHandle: '1left',
      style: { stroke: '#F00' },
      label: 'SHARES',
      animated: true,
      labelStyle: { fontSize: '8' },
      arrowHeadType: 'arrowclosed',
      type: 'straight'
    },
    {
      id: '15',
      source: '3',
      target: '2',
      sourceHandle: 'left',
      targetHandle: '1right',
      style: { stroke: '#F00' },
      labelBgPadding: [0, 0],
      label: 'CASH',
      labelStyle: { fontSize: '8' },
      animated: true,
      arrowHeadType: 'arrowclosed',
      type: 'straight'
    },
    {
      id: '16',
      source: '2',
      target: '4',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      style: { stroke: '#000' },
      label: '100%',
      type: 'straight'
    },
    // {
    //   id: '17',
    //   source: '1',
    //   target: '2',
    //   sourceHandle: 'right',
    //   targetHandle: '1right',
    //   style: { stroke: '#000' },
    //   label: 'SHL',
    // },
    // {
    //   id: '18',
    //   source: '4',
    //   target: '2',
    //   sourceHandle: 'left',
    //   targetHandle: '1left',
    //   style: { stroke: '#334FFF' },
    //   label: 'dividends',
    //   type: 'smoothstep'
    // },
    {
      id: '19',
      source: '2',
      target: '1',
      sourceHandle: 'left',
      targetHandle: '1left',
      style: { stroke: '#334FFF' },
      data: {
        text: 'Interest (4%)',
        click: () => { setMetaOpen(true); }
      },
      type: 'custom',
    },
  ];

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
              connectionLineComponent={CustomConnectionLine}
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
      <WorkspaceMeta
        open={metaOpen}
        to="Interest rate"
        subject="4%"
        validMail=""
        closeForm={() => setMetaOpen(false)}
        sendEmail={() => {}}
        inputChange={() => {}}
      />
      {/* <WorkspaceFab /> */}
    </div>
  );
};

Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Workspace);
