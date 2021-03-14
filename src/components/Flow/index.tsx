import React, { useState, MouseEvent, CSSProperties } from 'react';

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  isNode,
  Node,
  Elements,
  FlowElement,
  OnLoadParams,
  FlowTransform,
  SnapGrid,
  ArrowHeadType,
  Connection,
  Edge,
} from 'react-flow-renderer';

const onNodeDragStart = (_: MouseEvent, node: Node) =>
  console.log('drag start', node);
const onNodeDrag = (_: MouseEvent, node: Node) => console.log('drag', node);
const onNodeDragStop = (_: MouseEvent, node: Node) =>
  console.log('drag stop', node);
const onPaneClick = (event: MouseEvent) => console.log('pane click', event);
const onPaneScroll = (event?: MouseEvent) => console.log('pane scroll', event);
const onPaneContextMenu = (event: MouseEvent) =>
  console.log('pane context menu', event);
const onSelectionDrag = (_: MouseEvent, nodes: Node[]) =>
  console.log('selection drag', nodes);
const onSelectionDragStart = (_: MouseEvent, nodes: Node[]) =>
  console.log('selection drag start', nodes);
const onSelectionDragStop = (_: MouseEvent, nodes: Node[]) =>
  console.log('selection drag stop', nodes);
const onSelectionContextMenu = (event: MouseEvent, nodes: Node[]) => {
  event.preventDefault();
  console.log('selection context menu', nodes);
};
const onElementClick = (_: MouseEvent, element: FlowElement) =>
  console.log(`${isNode(element) ? 'node' : 'edge'} click:`, element);
const onSelectionChange = (elements: Elements | null) =>
  console.log('selection change', elements);
const onLoad = (reactFlowInstance: OnLoadParams) => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
};

const onMoveEnd = (transform?: FlowTransform) =>
  console.log('zoom/move end', transform);
const onEdgeContextMenu = (_: MouseEvent, edge: Edge) =>
  console.log('edge context menu', edge);
const onEdgeMouseEnter = (_: MouseEvent, edge: Edge) =>
  console.log('edge mouse enter', edge);
const onEdgeMouseMove = (_: MouseEvent, edge: Edge) =>
  console.log('edge mouse move', edge);
const onEdgeMouseLeave = (_: MouseEvent, edge: Edge) =>
  console.log('edge mouse leave', edge);

const initialElements: Elements = [
  {
    id: '1',
    type: 'input',
    data: {
      label: <>Selskab i Danmark</>,
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: <>Selskab i England</>,
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: {
      label: <>Samarbejdspartner i USA</>,
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
      label: <>Undeleverandør</>,
    },
  },
  {
    id: '5',
    data: {
      label: <>AWS</>,
    },
    position: { x: 250, y: 325 },
  },
  {
    id: '6',
    type: 'output',
    data: {
      label: <>Database</>,
    },
    position: { x: 100, y: 480 },
  },
  {
    id: '7',
    type: 'output',
    data: { label: 'Filopbevaring' },
    position: { x: 400, y: 450 },
  },
  { id: 'e1-2', source: '1', target: '2', label: 'Databehandleraftale' },
  { id: 'e1-3', source: '1', target: '3' },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    label: 'Ingen Databehandleraftale',
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    arrowHeadType: ArrowHeadType.Arrow,
    label: 'Databehandleraftale',
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'smoothstep',
    label: 'Kryptering',
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    type: 'step',
    style: { stroke: '#f6ab6c' },
    label: 'Ingen kryptering af personfølsom data',
    animated: true,
    labelStyle: { fill: '#f6ab6c', fontWeight: 700 },
  },
];

const connectionLineStyle: CSSProperties = { stroke: '#ddd' };
const snapGrid: SnapGrid = [16, 16];

const nodeStrokeColor = (n: Node): string => {
  if (n.style?.background) return n.style.background as string;
  if (n.type === 'input') return '#0041d0';
  if (n.type === 'output') return '#ff0072';
  if (n.type === 'default') return '#1a192b';

  return '#eee';
};

const nodeColor = (n: Node): string => {
  if (n.style?.background) return n.style.background as string;

  return '#fff';
};

const OverviewFlow = () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements(els => removeElements(elementsToRemove, els));
  const onConnect = (params: Connection | Edge) =>
    setElements(els => addEdge(params, els));

  return (
    <ReactFlow
      elements={elements}
      onElementClick={onElementClick}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onPaneClick={onPaneClick}
      onPaneScroll={onPaneScroll}
      onPaneContextMenu={onPaneContextMenu}
      onNodeDragStart={onNodeDragStart}
      onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDragStop}
      onSelectionDragStart={onSelectionDragStart}
      onSelectionDrag={onSelectionDrag}
      onSelectionDragStop={onSelectionDragStop}
      onSelectionContextMenu={onSelectionContextMenu}
      onSelectionChange={onSelectionChange}
      onMoveEnd={onMoveEnd}
      onLoad={onLoad}
      connectionLineStyle={connectionLineStyle}
      snapToGrid
      snapGrid={snapGrid}
      onEdgeContextMenu={onEdgeContextMenu}
    >
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default OverviewFlow;
