/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { TCustomEdge, TCustomNode } from "@customTypes/reducers/workspace";
import { useCallback, useEffect } from "react";
import { isEdge, getConnectedEdges } from "react-flow-renderer10";

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
  elements.forEach(node => {
    if (isEdge(node)) {
      allEdges.push(node);
    } else {
      allNodeMap[node.id] = node;
    }
  });
  const edgeMap: EdgeMap = {};
  const selectedNodeIds: string[] = [];
  const nodes: Array<TCustomNode | TCustomEdge> = [];
  selectedNodes.forEach(node => {
    if (!isEdge(node)) {
      selectedNodeIds.push(node.id);
      const connectedEdges = getConnectedEdges([node], allEdges);
      connectedEdges.forEach(edge => (edgeMap[edge.id] = edge));
      nodes.push(allNodeMap[node.id]);
    }
  });
  // pick edges which has both nodes present in selectedNodes
  Object.values(edgeMap).forEach(edge => {
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
  onEdgesDelete: (edges: TCustomEdge[]) => void,
  handleSave: (elementsToAdd: Array<TCustomNode | TCustomEdge>) => void
) {
  const selectedNodes: TCustomNode[] = []; // get selected elements

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
          // onElementsRemove([element]);
        } else {
          // onElementsRemove(selectedElements);
        }

        event.preventDefault();
      }
    },
    [selectedNodes]
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
    [selectedNodes]
  );

  const paste = useCallback(async event => {
    try {
      const elementsToAdd = JSON.parse(await navigator.clipboard.readText());
      event.preventDefault();
      handleSave(elementsToAdd);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("cut", cut);
    document.addEventListener("copy", copy);
    document.addEventListener("paste", paste);
    return () => {
      document.removeEventListener("cut", cut);
      document.removeEventListener("copy", copy);
      document.removeEventListener("paste", paste);
    };
  }, [nodes, edges, selectedNodes]);

  return { cut, copy, paste };
}
