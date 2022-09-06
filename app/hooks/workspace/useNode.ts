/* eslint-disable consistent-return */

import { User } from "@auth0/auth0-react";
import { SelectChoice } from "@customTypes/data";
import { NodeDropdownInstance } from "@customTypes/reactFlow";
import { Attribut, NodeData, TCustomNode } from "@customTypes/reducers/workspace";
import { initialAttribut } from "@pages/Workspaces/constants";
import {
  addWorkspaceNodeAttributToList,
  addWorkspaceNodeToList,
  changeHandleVisability,
  postNode,
  postSticky,
  putNode,
  showNotifAction,
} from "@pages/Workspaces/reducers/workspaceActions";

import { AppDispatch } from "@redux/configureStore";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, Node, ReactFlowInstance } from "react-flow-renderer";
import { TFunction } from "react-i18next";

const useNode = (
  dispatch: AppDispatch,
  plan_id: number | null,
  t: TFunction<"translation", undefined>,
  user: User,
  rfInstance: ReactFlowInstance | null,
  reactFlowContainer: React.RefObject<HTMLDivElement>,
  reactFlowDimensions: Dimensions | null,
  id: string,
  handleAlerts: (_alerts: any, initial: any) => void,
  signed: boolean,
  nodes: NodeDropdownInstance[],
  setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>,
  mouse: any
) => {
  const [isUpdatingNode, setIsUpdatingNode] = useState(false);
  const [nodeToUpdate, setNodeToUpdate] = useState<TCustomNode | null>(null);
  const [defineNodeOpen, setDefineNodeOpen] = useState(false);
  const [nodeLabel, setNodeLabel] = useState("");
  const [nodePopperRef, setNodePopperRef] = useState<EventTarget | null>(null);
  const [showNodePopper, setShowNodePopper] = useState(false);
  const [nodeDisplayName, setNodeDisplayName] = useState("");
  const [nodeFigur, setNodeFigur] = useState<string | null>(null);
  const [attributes, setAttributes] = useState<Attribut[]>([initialAttribut]);
  const [choosenNode, setChoosenNode] = useState<NodeDropdownInstance | null>(null);
  const [deletedAttributes, setDeletedAttributes] = useState([]);
  const [showNodeRelations, setShowNodeRelations] = useState(false);
  const [activeNodeRelations, setActiveNodeRelations] = useState<Node<NodeData> | null>(
    null
  );

  const handleChangeLabelNode = useCallback((_label: SelectChoice) => {
    if (_label.__isNew__ && plan_id !== 1) {
      dispatch(
        addWorkspaceNodeToList({
          attributes: [],
          description: null,
          id: null,
          label: _label.value,
          style:
            '{"borderColor": {"a": 1, "b": 0, "g": 0, "r": 0}, "backgroundColor": {"a": 1, "b": 255, "g": 255, "r": 255}}',
        })
      );
    }
    if (_label.__isNew__ && plan_id === 1) {
      dispatch(showNotifAction(t("workspaces.you_can_not_create_new_item_types")));
    } else {
      setNodeLabel(_label.value);
    }
  }, []);

  const handleNodeFigur = useCallback(
    (_figur) => setNodeFigur(_figur ? _figur.value : null),
    []
  );

  const handleChangeAttributes = useCallback((_attributes, newRow, isNew) => {
    if (isNew && plan_id !== 1) {
      newRow.value = newRow.label;
      dispatch(addWorkspaceNodeAttributToList(newRow));
    }

    if (isNew && plan_id === 1) {
      dispatch(showNotifAction(t("workspaces.you_can_not_create_new_attribute_types")));
    } else {
      setAttributes(_attributes);
    }
  }, []);

  const handelRemoveAttributes = useCallback((_id, index) => {
    setAttributes((att) => att.filter((v, i) => i !== index));
    if (_id) {
      // @ts-ignore
      setDeletedAttributes((attr) => [...attr, _id]);
    }
  }, []);

  const [nodeColor, setNodeColor] = useState({
    r: "255",
    g: "255",
    b: "255",
    a: "1",
  });
  const handleNodeColorChange = useCallback((color) => setNodeColor(color.rgb), []);
  const [nodeBorderColor, setNodeBorderColor] = useState({
    r: "0",
    g: "0",
    b: "0",
    a: "1",
  });
  const handleBorderColorChange = useCallback(
    (color) => setNodeBorderColor(color.rgb),
    []
  );

  const [nodeLabelColor, setNodeLabelColor] = useState({
    r: "0",
    g: "0",
    b: "0",
    a: "1",
  });
  const handleLabelColorChange = useCallback((color) => setNodeLabelColor(color.rgb), []);
  const handleChangeNodeColor = useCallback((color) => setNodeColor(color.rgb), []);
  const handleDisplayNameChange = useCallback(
    (e) => setNodeDisplayName(e.target.value),
    []
  );

  const handleShowNodeRelations = (contextNode?: Node<NodeData>) => {
    setShowNodeRelations((prevVal) => !prevVal);
    if (contextNode) {
      setActiveNodeRelations(contextNode);
    }
  };

  const handleShowNodePopper = () => {
    setShowNodePopper(true);
  };

  const handleHideNodePopper = useCallback((stopReffrence = false) => {
    setShowNodePopper(false);

    if (stopReffrence) {
      setNodePopperRef(null);
    }
  }, []);

  const closeNode = useCallback(() => {
    if (!showNodePopper) {
      setDefineNodeOpen(false);
      setNodeLabel("");
      setNodeDisplayName("");
      setNodeFigur(null);
      setAttributes([initialAttribut]);
      setChoosenNode(null);
      setIsUpdatingNode(false);
    }
  }, [showNodePopper]);

  const updateNodeDisplayName = (name) => {
    const _attributes = JSON.stringify(attributes.filter((a) => a.label));
    const nodeId = choosenNode ? choosenNode.id : null;
    const _nodeLabel = choosenNode ? choosenNode.label : null;
    if (isUpdatingNode && nodeToUpdate) {
      dispatch(
        putNode(
          user,
          nodeToUpdate.id,
          nodeId,
          _nodeLabel,
          name,
          nodeFigur,
          JSON.stringify(nodeColor),
          JSON.stringify(nodeBorderColor),
          JSON.stringify(nodeLabelColor),
          _attributes,
          JSON.stringify(deletedAttributes),
          closeNode
        )
      );
    }
  };

  const handleNodeSave = useCallback(
    (x?: number, y?: number, drag?: boolean) => {
      const _attributes = JSON.stringify(attributes.filter((a) => a.label));
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

      const nodeId = choosenNode ? choosenNode.id : null;
      const _nodeLabel = choosenNode ? choosenNode.label : null;

      if (isUpdatingNode && nodeToUpdate && !drag) {
        dispatch(
          putNode(
            user,
            nodeToUpdate.id,
            nodeId,
            _nodeLabel,
            nodeDisplayName,
            nodeFigur,
            JSON.stringify(nodeColor),
            JSON.stringify(nodeBorderColor),
            JSON.stringify(nodeLabelColor),
            _attributes,
            JSON.stringify(deletedAttributes),
            closeNode
          )
        );
      } else if (drag) {
        dispatch(
          postNode(
            user,
            id,
            null,
            null,
            "",
            null,
            JSON.stringify({
              r: 255,
              g: 255,
              b: 255,
              a: 1,
            }),
            JSON.stringify({
              r: 0,
              g: 0,
              b: 0,
              a: 1,
            }),
            JSON.stringify([initialAttribut].filter((a) => a.label)),
            closeNode,
            handleAlerts,
            x,
            y
          )
        );
      } else {
        dispatch(
          postNode(
            user,
            id as string,
            nodeId,
            _nodeLabel,
            nodeDisplayName,
            nodeFigur,
            JSON.stringify(nodeColor),
            JSON.stringify(nodeBorderColor),
            _attributes,
            closeNode,
            handleAlerts,
            x,
            y
          )
        );
      }
    },
    [
      attributes,
      rfInstance,
      choosenNode,
      isUpdatingNode,
      nodeToUpdate,
      nodeDisplayName,
      nodeFigur,
      nodeColor,
      nodeBorderColor,
      nodeLabelColor,
      deletedAttributes,
      id,
    ]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: TCustomNode, showFull?: boolean) => {
      if (signed) {
        return undefined;
      }

      setDefineNodeOpen(false);
      setIsUpdatingNode(true);
      setNodeToUpdate(node);
      setDeletedAttributes([]);

      const {
        backgroundColor: nodeBgColor,
        borderColor: nodeBorder,
        labelColor: lColor,
        label: _label,
        displayName,
        figur,
        attributes: _attributes,
      } = node.data as NodeData;

      const backgroundColor = nodeBgColor
        ? nodeBgColor.replace(/[^\d,]/g, "").split(",")
        : ["255", "255", "255", "1"];
      const borderColor =
        nodeBorder && !nodeBorder.includes("undefined")
          ? nodeBorder.replace(/[^\d,]/g, "").split(",")
          : ["0", "0", "0", "1"];
      const labelColor = lColor
        ? lColor.replace(/[^\d,]/g, "").split(",")
        : ["0", "0", "0", "1"];

      setNodeLabel(_label || "");
      setNodeDisplayName(displayName || "");
      setNodeFigur(figur);
      setAttributes([..._attributes, initialAttribut]);
      setNodeColor({
        r: backgroundColor[0],
        g: backgroundColor[1],
        b: backgroundColor[2],
        a: backgroundColor[3],
      });

      setNodeBorderColor({
        r: borderColor[0],
        g: borderColor[1],
        b: borderColor[2],
        a: borderColor[3],
      });
      setNodeLabelColor({
        r: labelColor[0],
        g: labelColor[1],
        b: labelColor[2],
        a: labelColor[3],
      });
      if (showFull) {
        setDefineNodeOpen(true);
      } else if (node.type === "custom") {
        const target = event.target as HTMLElement;
        const ifDivtarget = target.querySelector("#nodeLabel");
        handleShowNodePopper();
        setNodePopperRef(target.nodeName === "H6" ? event.target : ifDivtarget);
      }
    },
    []
  );

  const handlePostSticky = (
    e?: React.MouseEvent<Element, globalThis.MouseEvent>,
    shortcut = false,
    x?: number,
    y?: number
  ) => {
    const rf = rfInstance?.toObject();

    const reactFlowBounds = reactFlowContainer.current?.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };

    const position = rfInstance?.project({
      x: (mouse.clientX || 0) - reactFlowBounds.left,
      y: (mouse.clientY || 0) - reactFlowBounds.top,
    });

    if (!x && !y) {
      x = shortcut
        ? position?.x
        : rf && reactFlowDimensions
        ? (rf.viewport.x * -1 + reactFlowDimensions.width / 3) / rf.viewport.zoom - 250
        : 0;
      y = shortcut
        ? position?.y
        : rf && reactFlowDimensions
        ? (rf.viewport.y * -1 + reactFlowDimensions.height / 2) / rf.viewport.zoom - 150
        : 0;
    }

    if (x && y) {
      dispatch(postSticky(user, id as string, x, y));
    }

    setShowContextMenu(false);
  };

  useEffect(() => {
    const _node = nodes.find((r) => r.label === nodeLabel);
    if (_node) {
      setChoosenNode(_node);
      setNodeColor(JSON.parse(_node.style).backgroundColor);
      setNodeBorderColor(JSON.parse(_node.style).borderColor);
      setAttributes([..._node.attributes, initialAttribut]);
    }
  }, [nodeLabel]);

  return {
    onNodeClick,
    defineNodeOpen,
    nodePopperRef,
    showNodeRelations,
    activeNodeRelations,
    handleChangeLabelNode,
    handleNodeFigur,
    handleChangeAttributes,
    handelRemoveAttributes,
    handleNodeColorChange,
    handleBorderColorChange,
    updateNodeDisplayName,
    handleNodeSave,
    handleHideNodePopper,
    setDefineNodeOpen,
    setNodePopperRef,
    setIsUpdatingNode,
    setNodeToUpdate,
    handleShowNodeRelations,
    closeNode,
    handleShowNodePopper,
    nodeLabel,
    attributes,
    nodeColor,
    handleChangeNodeColor,
    nodeBorderColor,
    nodeLabelColor,
    handleLabelColorChange,
    handleDisplayNameChange,
    nodeDisplayName,
    nodeFigur,
    isUpdatingNode,
    nodeToUpdate,
    showNodePopper,
    handlePostSticky,
  };
};

export default useNode;
