import { TCustomNode, TCustomEdge } from "@customTypes/reducers/workspace";
import { changeEdges, changeNodes } from "@pages/Workspaces/reducers/workspaceActions";
import { AppDispatch } from "@redux/configureStore";
import { useCallback } from "react";
import {
  applyEdgeChanges,
  applyNodeChanges,
  OnNodesChange,
  OnEdgesChange,
} from "react-flow-renderer10";

const useChangeElements = (
  dispatch: AppDispatch,
  nodeElements: TCustomNode[],
  edgeElements: TCustomEdge[]
) => {
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      dispatch(changeNodes(applyNodeChanges(changes, nodeElements)));
    },
    [nodeElements]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      dispatch(changeEdges(applyEdgeChanges(changes, edgeElements)));
    },
    [edgeElements]
  );

  return { onNodesChange, onEdgesChange };
};

export default useChangeElements;
