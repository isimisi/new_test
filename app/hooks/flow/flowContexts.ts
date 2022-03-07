import { ContextTypes } from "@customTypes/reactFlow";
import { useState } from "react";
import { Edge, Node } from "react-flow-renderer";

const useFlowContextMenus = () => {
  const [contextAnchor, setContextAnchor] = useState({ x: 0, y: 0 });
  const [contextNode, setContextNode] = useState<Node<any> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [contextEdge, setContextEdge] = useState<Edge<any> | null>(null);
  const [contextSelection, setContextSelction] = useState<Node<any>[] | null>(null);

  const [contextType, setContextType] = useState<ContextTypes>(ContextTypes.Pane);

  const handleNodeContextMenu = (
    e: React.MouseEvent<Element, globalThis.MouseEvent>,
    n: Node
  ) => {
    setContextAnchor({
      x: e.pageX,
      y: e.pageY,
    });
    setContextNode(n);
    setContextType(ContextTypes.Node);
  };

  const handlePaneContextMenu = (e: React.MouseEvent<Element, globalThis.MouseEvent>) => {
    setContextAnchor({
      x: e.pageX,
      y: e.pageY,
    });
    setContextType(ContextTypes.Pane);
  };

  const handleSelctionContextMenu = (
    e: React.MouseEvent<Element, globalThis.MouseEvent>,
    _nodes: Node[]
  ) => {
    setContextAnchor({
      x: e.pageX,
      y: e.pageY,
    });
    setContextSelction(_nodes);
    setContextType(ContextTypes.Selection);
  };

  const handleEdgeContextMenu = (
    e: React.MouseEvent<Element, globalThis.MouseEvent>,
    ed: Edge
  ) => {
    setContextAnchor({
      x: e.pageX,
      y: e.pageY,
    });
    setContextEdge(ed);
    setContextType(ContextTypes.Edge);
  };

  return {
    handleNodeContextMenu,
    handlePaneContextMenu,
    handleSelctionContextMenu,
    handleEdgeContextMenu,
    contextAnchor,
    contextNode,
    contextSelection,
    contextType,
  };
};

export default useFlowContextMenus;
