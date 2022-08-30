import { TCustomNode, TCustomEdge } from "@customTypes/reducers/conditions";
import { changeEdges, changeNodes } from "@pages/Conditions/reducers/conditionActions";
import { AppDispatch } from "@redux/configureStore";
import { useCallback } from "react";
import {
  applyEdgeChanges,
  applyNodeChanges,
  OnNodesChange,
  OnEdgesChange,
} from "react-flow-renderer";

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
