/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, {
  ConnectionMode, ReactFlowProvider, Controls
} from 'react-flow-renderer';
import { CustomNode, CustomEdge } from '@components';


const nodeTypes = { custom: CustomNode };

const MiniFlow = (props) => {
  const { elements } = props;

  const reactFlowContainer = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);

  const [hover, setHover] = useState(false);

  const onLoad = (_reactFlowInstance) => {
    setRfInstance(_reactFlowInstance);
    _reactFlowInstance.fitView();
  };

  // useEffect(() => {
  //   if (rfInstance) {
  //     rfInstance.fitView();
  //   }
  // }, [elements, rfInstance]);

  return (
    <ReactFlowProvider>
      <ReactFlow
        ref={reactFlowContainer}
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
        edgeTypes={{ custom: CustomEdge }}
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
