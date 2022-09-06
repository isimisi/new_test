import { User } from "@auth0/auth0-react";
import { SelectChoice } from "@customTypes/data";
import { NodeDropdownInstance } from "@customTypes/reactFlow";
import { ConditionValueSelector, TCustomNode } from "@customTypes/reducers/conditions";
import { nonValueArray } from "@pages/Conditions/constants";

import {
  addAttributToList,
  addNodeToList,
  postNode,
  putNode,
} from "@pages/Conditions/reducers/conditionActions";
import { AppDispatch } from "@redux/configureStore";
import { useCallback, useState } from "react";
import { Dimensions, ReactFlowInstance } from "react-flow-renderer";

const useNode = (
  dispatch: AppDispatch,
  user: User,
  rfInstance: ReactFlowInstance | null,
  reactFlowDimensions: Dimensions | null,
  id: string,
  nodes: NodeDropdownInstance[]
) => {
  const [isUpdatingNode, setIsUpdatingNode] = useState(false);
  const [nodeToUpdate, setNodeToUpdate] = useState<TCustomNode | null>(null);

  const [defineNodeOpen, setDefineNodeOpen] = useState(false);
  const [nodeLabel, setNodeLabel] = useState("");
  const [conditionValues, setConditionValues] = useState<ConditionValueSelector[]>([]);

  const handleChangeLabel = (_label) => {
    if (_label.__isNew__) {
      dispatch(
        addNodeToList({
          attributes: [],
          description: "",
          id: null,
          label: _label.value,
        })
      );
    }
    setNodeLabel(_label.value);
  };

  const closeNode = useCallback(() => {
    setDefineNodeOpen(false);
    setIsUpdatingNode(false);
    setNodeLabel("");
    setConditionValues([]);
  }, []);

  const handleNodeSave = useCallback(
    (x?: number, y?: number, drag?: boolean) => {
      const choosenNode = nodes.find(
        (r) => r.label === nodeLabel
      ) as NodeDropdownInstance;

      const rf = rfInstance?.toObject();
      if (!x && !y) {
        x =
          rf && reactFlowDimensions
            ? (rf.viewport.x * -1 + reactFlowDimensions.width) / rf.viewport.zoom - 250
            : undefined;
        y =
          rf && reactFlowDimensions
            ? (rf.viewport.y * -1 + reactFlowDimensions.height) / rf.viewport.zoom - 150
            : undefined;
      }
      console.log(nodeToUpdate, choosenNode);
      if (isUpdatingNode && nodeToUpdate && !drag) {
        const originalElementIds = nodeToUpdate.data.conditionValues.map((cv) => cv.id);
        const newConditionValueIds = conditionValues.map((cv) => cv.conditionNodeValueId);
        const deletedConditionValues = originalElementIds.filter(
          (dcv) => !newConditionValueIds.includes(dcv)
        );
        dispatch(
          putNode(
            user,
            nodeToUpdate.id,
            choosenNode.id,
            choosenNode.label,
            JSON.stringify(conditionValues),
            JSON.stringify(deletedConditionValues),
            closeNode
          )
        );
      } else if (drag) {
        dispatch(postNode(user, id, null, null, JSON.stringify([]), x, y, closeNode));
      } else {
        dispatch(
          postNode(
            user,
            id,
            choosenNode.id,
            choosenNode.label,
            JSON.stringify(conditionValues),
            x,
            y,
            closeNode
          )
        );
      }
    },
    [conditionValues, rfInstance, isUpdatingNode, nodeToUpdate, id, nodeLabel]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: TCustomNode) => {
    setDefineNodeOpen(false);
    setIsUpdatingNode(true);
    setNodeToUpdate(node);

    setNodeLabel(node.data.label);
    setConditionValues(
      node.data.conditionValues.map((e) => ({
        conditionNodeValueId: e.id,
        attribut: e.attribut.label,
        comparison_type: e.comparison_type,
        comparison_value: e.comparison_value,
      }))
    );

    setDefineNodeOpen(true);
  }, []);

  const handleNodeChange = (value, index, _type, isNew = false) => {
    const newArray = [...conditionValues];

    if (_type === "comparison_type" && nonValueArray.includes(value)) {
      newArray[index].comparison_value = "";
    }

    newArray[index] = { ...newArray[index], [_type]: value };

    if (_type === "attribut" && isNew) {
      dispatch(addAttributToList({ label: value, value }));
    }

    setConditionValues(newArray);
  };

  const addConditionValues = () =>
    setConditionValues([
      ...conditionValues,
      {
        attribut: null,
        comparison_type: "is equal to",
        comparison_value: "",
      },
    ]);

  const deleteConditionValue = (index) =>
    setConditionValues((values) => values.filter((v, i) => i !== index));

  return {
    onNodeClick,
    defineNodeOpen,
    handleNodeSave,
    setDefineNodeOpen,
    setIsUpdatingNode,
    setNodeToUpdate,
    closeNode,
    nodeLabel,
    isUpdatingNode,
    nodeToUpdate,
    handleChangeLabel,
    handleNodeChange,
    conditionValues,
    addConditionValues,
    deleteConditionValue,
  };
};

export default useNode;
