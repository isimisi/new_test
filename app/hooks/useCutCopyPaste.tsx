/* eslint-disable no-return-assign */

/* eslint-disable import/prefer-default-export */
import { TCustomEdge, TCustomNode } from "@customTypes/reducers/workspace";
import { MousePosition } from "@react-hook/mouse-position";
import { useCallback, useEffect } from "react";
import {
  isEdge,
  getConnectedEdges,
  OnNodesChange,
  isNode,
  ReactFlowInstance,
  Dimensions
} from "react-flow-renderer";

interface NodeMap {
  [nodeId: string]: TCustomNode;
}

interface EdgeMap {
  [edgeId: string]: TCustomEdge;
}

function getSelectedGraph(
  selectedNodes: TCustomNode[],
  elements: Array<TCustomNode | TCustomEdge>
): Array<TCustomNode | TCustomEdge> {
  const allEdges: TCustomEdge[] = [];
  const allNodeMap: NodeMap = {};
  elements.forEach((node) => {
    if (isEdge(node)) {
      allEdges.push(node);
    } else {
      allNodeMap[node.id] = node;
    }
  });
  const edgeMap: EdgeMap = {};
  const selectedNodeIds: string[] = [];
  const nodes: Array<TCustomNode | TCustomEdge> = [];
  selectedNodes.forEach((node) => {
    if (!isEdge(node)) {
      selectedNodeIds.push(node.id);
      const connectedEdges = getConnectedEdges([node], allEdges);
      connectedEdges.forEach((edge) => (edgeMap[edge.id] = edge));
      nodes.push(allNodeMap[node.id]);
    }
  });
  // pick edges which has both nodes present in selectedNodes
  Object.values(edgeMap).forEach((edge) => {
    if (
      selectedNodeIds.includes(edge.source) &&
      selectedNodeIds.includes(edge.target)
    ) {
      nodes.push(edge);
    }
  });

  return nodes;
}

export function useCutCopyPaste(
  nodes: TCustomNode[],
  edges: TCustomEdge[],
  onNodesDelete: (nodes: TCustomNode[]) => void,
  onNodesChange: OnNodesChange,
  _addElements: (elements: Array<TCustomNode | TCustomEdge>) => void,
  mouse: MousePosition,
  rfInstance: ReactFlowInstance | null,
  reactFlowContainer: React.RefObject<HTMLDivElement>,
  reactFlowDimensions: Dimensions | null
) {
  const selectedNodes = nodes.filter((node) => node.selected);

  const cut = useCallback(
    (event, element = null) => {
      // remove selected nodes from graph
      // copy to clipboard
      if (selectedNodes.length > 0 || element) {
        const data = element
          ? JSON.stringify([element])
          : JSON.stringify(
              getSelectedGraph(selectedNodes, [...nodes, ...edges])
            );
        navigator.clipboard.writeText(data);

        if (element) {
          onNodesDelete([element]);
          onNodesChange([element].map((el) => ({ id: el.id, type: "remove" })));
        } else {
          onNodesDelete(selectedNodes);
          onNodesChange(
            selectedNodes.map((el) => ({ id: el.id, type: "remove" }))
          );
        }

        event.preventDefault();
      }
    },
    [selectedNodes, nodes, edges, onNodesDelete]
  );

  const copy = useCallback(
    (event, element = null) => {
      if (selectedNodes.length > 0 || element) {
        const data = element
          ? JSON.stringify([element])
          : JSON.stringify(
              getSelectedGraph(selectedNodes, [...nodes, ...edges])
            );

        navigator.clipboard.writeText(data);
        event.preventDefault();
      }
    },
    [edges, nodes, selectedNodes]
  );

  const handlePaste = (elementsToAdd) => {
    if (mouse && rfInstance && reactFlowContainer.current) {
      const reactFlowBounds =
        reactFlowContainer.current.getBoundingClientRect();

      const position = rfInstance.project({
        x: (mouse.clientX as number) - reactFlowBounds.left,
        y: (mouse.clientY as number) - reactFlowBounds.top
      });

      if (!mouse.clientY) {
        const rf = rfInstance?.toObject();
        if (rf && reactFlowDimensions) {
          position.x =
            (rf.viewport.x * -1 + reactFlowDimensions.width) /
              rf.viewport.zoom -
            250;
          position.y =
            (rf.viewport.y * -1 + reactFlowDimensions.height) /
              rf.viewport.zoom -
            150;
        }
      }

      const sortedByY = elementsToAdd
        .filter((e) => isNode(e))
        .sort((a, b) => b.position.y - a.position.y);
      const topNode = sortedByY[sortedByY.length - 1];

      const now = Date.now();
      elementsToAdd.map((element) => {
        if (isEdge(element)) {
          element.id = `${element.id}_${now}-edit`;
          element.source = `${element.source}_${now}-edit`;
          element.target = `${element.target}_${now}-edit`;
        } else {
          element.id = `${element.id}_${now}-edit`;
          const xDistanceToTopNode = element.position.x - topNode.position.x;
          const yDistanceToTopNode = element.position.y - topNode.position.y;

          element.position.x = position.x + xDistanceToTopNode;
          element.position.y = position.y + yDistanceToTopNode;
        }
        return element;
      });

      _addElements(elementsToAdd);
    }
  };

  const paste = async (event) => {
    try {
      const elementsToAdd = JSON.parse(await navigator.clipboard.readText());

      event.preventDefault();
      handlePaste(elementsToAdd);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.addEventListener("cut", cut);
    document.addEventListener("copy", copy);
    document.addEventListener("paste", paste);
    return () => {
      document.removeEventListener("cut", cut);
      document.removeEventListener("copy", copy);
      document.removeEventListener("paste", paste);
    };
  }, [nodes, edges, selectedNodes, cut, copy, paste]);

  return { cut, copy, paste };
}
