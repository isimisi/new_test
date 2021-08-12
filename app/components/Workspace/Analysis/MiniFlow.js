/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactFlow, {
  ConnectionMode, ReactFlowProvider, Controls
} from 'react-flow-renderer';
import { CustomNode, CustomEdge } from '@components';

const nodeTypes = { custom: CustomNode };
const edgeTypes = { custom: CustomEdge };

const MiniFlow = (props) => {
  const { elements } = props;
  const [hover, setHover] = useState(false);


  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
    console.log(reactFlowInstance);
  };


  return (
    <ReactFlowProvider>
      <ReactFlow
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
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
      >
        {hover && (
          <Controls
            showZoom={false}
          />
        )}
      </ReactFlow>

    </ReactFlowProvider>
  );
};


export default MiniFlow;
