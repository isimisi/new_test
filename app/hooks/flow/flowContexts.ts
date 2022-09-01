import { ContextTypes } from "@customTypes/reactFlow";
import { TCustomEdge, TCustomNode } from "@customTypes/reducers/workspace";
import { useCallback, useState } from "react";
import { Edge, Node } from "react-flow-renderer";

const useFlowContextMenus = () => {
  const [contextAnchor, setContextAnchor] = useState({ x: 0, y: 0 });
  const [contextNode, setContextNode] = useState<TCustomNode | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [contextEdge, setContextEdge] = useState<TCustomEdge | null>(null);
  const [contextSelection, setContextSelction] = useState<TCustomNode[] | null>(null);

  const [contextType, setContextType] = useState<ContextTypes>(ContextTypes.Pane);

  const handleNodeContextMenu = useCallback(
    (e: React.MouseEvent<Element, globalThis.MouseEvent>, n: Node) => {
      setContextAnchor({
        x: e.pageX,
        y: e.pageY,
      });
      setContextNode(n);
      setContextType(ContextTypes.Node);
    },
    []
  );

  const handlePaneContextMenu = useCallback(
    (e: React.MouseEvent<Element, globalThis.MouseEvent>) => {
      setContextAnchor({
        x: e.pageX,
        y: e.pageY,
      });
      setContextType(ContextTypes.Pane);
    },
    []
  );

  const handleSelctionContextMenu = useCallback(
    (e: React.MouseEvent<Element, globalThis.MouseEvent>, _nodes: Node[]) => {
      setContextAnchor({
        x: e.pageX,
        y: e.pageY,
      });
      setContextSelction(_nodes);
      setContextType(ContextTypes.Selection);
    },
    []
  );

  const handleEdgeContextMenu = useCallback(
    (e: React.MouseEvent<Element, globalThis.MouseEvent>, ed: Edge) => {
      setContextAnchor({
        x: e.pageX,
        y: e.pageY,
      });
      setContextEdge(ed);
      setContextType(ContextTypes.Edge);
    },
    []
  );

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
