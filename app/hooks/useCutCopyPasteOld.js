/* eslint-disable no-return-assign */

/* eslint-disable import/prefer-default-export */
import { useEffect } from "react";
import { useStoreState, isEdge, getConnectedEdges } from "react-flow-renderer";
function getSelectedGraph(selectedNodes, elements) {
  const allEdges = [];
  const allNodeMap = {};
  elements.forEach((node) => {
    if (isEdge(node)) {
      allEdges.push(node);
    } else {
      allNodeMap[node.id] = node;
    }
  });
  const edgeMap = {};
  const selectedNodeIds = [];
  const nodes = [];
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
    if (selectedNodeIds.includes(edge.source) && selectedNodeIds.includes(edge.target)) {
      nodes.push(edge);
    }
  });

  return nodes;
}

export function useCutCopyPaste(elements, onElementsRemove, handleSave) {
  const selectedElements = useStoreState((store) => store.selectedElements);

  function cut(event, element = null) {
    // remove selected nodes from graph
    // copy to clipboard
    if ((selectedElements && selectedElements.length) || element) {
      const data = element
        ? JSON.stringify([element])
        : JSON.stringify(getSelectedGraph(selectedElements, elements));
      navigator.clipboard.writeText(data);

      if (element) {
        onElementsRemove([element]);
      } else {
        onElementsRemove(selectedElements);
      }

      event.preventDefault();
    }
  }
  function copy(event, element = null) {
    if ((selectedElements && selectedElements.length) || element) {
      const data = element
        ? JSON.stringify([element])
        : JSON.stringify(getSelectedGraph(selectedElements, elements));

      navigator.clipboard.writeText(data);
      event.preventDefault();
    }
  }
  async function paste(event) {
    try {
      const elementsToAdd = JSON.parse(await navigator.clipboard.readText());
      event.preventDefault();
      handleSave(elementsToAdd);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    document.addEventListener("cut", cut);
    document.addEventListener("copy", copy);
    document.addEventListener("paste", paste);
    return () => {
      document.removeEventListener("cut", cut);
      document.removeEventListener("copy", copy);
      document.removeEventListener("paste", paste);
    };
  }, [elements, onElementsRemove, selectedElements, handleSave]);

  return { cut, copy, paste };
}
