/* eslint-disable react/prop-types */
import React from 'react';
import ReactFlow, { ConnectionMode, ReactFlowProvider } from 'react-flow-renderer';
import { CustomNode, CustomEdge } from '@components';

const nodeTypes = { custom: CustomNode };
const edgeTypes = { custom: CustomEdge };

const MiniFlow = (props) => {
  const { elements } = props;


  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
  };

  return (
    <ReactFlowProvider>
      <ReactFlow
        elements={elements}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnScroll={false}
        zoomOnDoubleClick={false}
        selectNodesOnDrag={false}
        paneMoveable={false}
        minZoom={0.3}
        maxZoom={2}
        nodeTypes={nodeTypes}
        onLoad={onLoad}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
      />
    </ReactFlowProvider>
  );
};


export default MiniFlow;
