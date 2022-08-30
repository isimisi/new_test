/* eslint-disable consistent-return */
import { User } from "@auth0/auth0-react";
import { RGBA } from "@customTypes/data";
import {
  EdgeData,
  TCustomEdge,
  WorkspaceRelationship,
} from "@customTypes/reducers/workspace";
import {
  addEdgeToList,
  postEdge,
  putEdge,
  showNotifAction,
} from "@pages/Workspaces/reducers/workspaceActions";
import { AppDispatch } from "@redux/configureStore";
import { List } from "immutable";
import { useCallback, useRef, useState } from "react";
import { Connection, Edge } from "react-flow-renderer";
import { TFunction } from "react-i18next";

const useEdge = (
  dispatch: AppDispatch,
  user: User,
  relationships: List<WorkspaceRelationship>,
  handleAlerts: (_alerts: any, initial: any) => void,
  id: string,
  signed: boolean,
  plan_id: number | null,
  t: TFunction<"translation", undefined>
) => {
  const edgePopperComponentRef = useRef<any>(null);
  const [isUpdatingEdge, setIsUpdatingEdge] = useState(false);
  const [edgeToUpdate, setEdgeToUpdate] = useState<TCustomEdge | null>(null);
  const [edgePopperRef, setEdgePopperRef] = useState<SVGElement | null>(null);
  const [showEdgePopper, setShowEdgePopper] = useState(false);
  const [defineEdgeOpen, setDefineEdgeOpen] = useState(false);
  const [relationshipLabel, setRelationshipLabel] = useState("");
  const [relationshipValue, setRelationshipValue] = useState("");
  const [relationshipType, setRelationshipType] = useState("custom");
  const [relationshipColor, setRelationshipColor] = useState<RGBA>({
    r: "0",
    g: "0",
    b: "0",
    a: "1",
  });
  const [showArrow, setShowArrow] = useState(false);
  const [animatedLine, setAnimatedLine] = useState(false);
  const [showLabel, setShowlabel] = useState(false);
  const [lineThrough, setLineThrough] = useState(false);

  const handleShowEdgePopper = () => {
    setShowEdgePopper(true);
  };

  const handleHideEdgePopper = (stopReffrence = false) => {
    setShowEdgePopper(false);
    if (stopReffrence) {
      setEdgePopperRef(null);
    }
  };

  const closeDefineEdge = useCallback(() => {
    if (!showEdgePopper) {
      setDefineEdgeOpen(false);
      setIsUpdatingEdge(false);
      setRelationshipLabel("");
      setRelationshipValue("");
      setRelationshipType("custom");
      setRelationshipColor({
        r: "0",
        g: "0",
        b: "0",
        a: "1",
      });
      setShowArrow(false);
      setAnimatedLine(false);
      setShowlabel(false);
      setLineThrough(false);
    }
  }, [showEdgePopper]);

  const updateEdgeDisplayName = (name, edgeTextTarget, edgeTextActualTarget, edge) => {
    const choosenRelationship = relationships
      .toJS()
      .find((r) => r.label === edge.data.label);
    if (isUpdatingEdge && edgeToUpdate && choosenRelationship) {
      dispatch(
        putEdge(
          user,
          edgeToUpdate.id,
          choosenRelationship.id,
          choosenRelationship.label,
          name,
          relationshipColor,
          relationshipType,
          showArrow,
          animatedLine,
          showLabel,
          lineThrough,
          closeDefineEdge,
          handleAlerts,
          id,
          edgeTextTarget,
          edgeTextActualTarget
        )
      );
    }
  };

  const handleNoLabelDoubleClick = (
    event: React.MouseEvent<Element, globalThis.MouseEvent>,
    edge: TCustomEdge
  ) => {
    event.persist();
    setRelationshipLabel(edge.data?.label || "");
    setRelationshipValue(edge.data?.value || "");
    setRelationshipType(edge.type || "custom");
    setRelationshipColor(
      edge.data?.color || {
        r: "0",
        g: "0",
        b: "0",
        a: "1",
      }
    );
    setShowArrow(edge.data?.showArrow || false);
    setAnimatedLine(edge.data?.animated || false);
    setShowlabel(edge.data?.showLabel || false);
    setLineThrough(edge.data?.lineThrough || false);
    const target = event.target as SVGElement;
    handleShowEdgePopper();
    setEdgePopperRef(target);

    if (edgePopperComponentRef.current) {
      edgePopperComponentRef.current.toggleLabelMenu(event);
    }
  };

  const handleRelationshipSave = () => {
    const choosenRelationship = relationships
      .toJS()
      .find((r) => r.label === relationshipLabel);

    if (isUpdatingEdge && edgeToUpdate) {
      dispatch(
        putEdge(
          user,
          edgeToUpdate.id,
          choosenRelationship?.id,
          choosenRelationship?.label,
          relationshipValue,
          relationshipColor,
          relationshipType,
          showArrow,
          animatedLine,
          showLabel,
          lineThrough,
          closeDefineEdge,
          handleAlerts,
          id
        )
      );
    }
  };

  const onConnect = (data: Edge<any> | Connection) => {
    if (data.source !== data.target) {
      const color = {
        r: "0",
        g: "0",
        b: "0",
        a: "1",
      };
      const edge = {
        relationship_id: null,
        relationshipLabel: null,
        relationshipValue: null,
        relationshipColor: color,
        relationshipType: "custom",
        showArrow: false,
        animatedLine: false,
        showLabel: false,
        lineThrough: false,
        ...(data as Connection),
      };

      dispatch(postEdge(user, id as string, edge, closeDefineEdge));
    }
  };

  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: TCustomEdge, showFull?: boolean) => {
      if (signed) {
        return undefined;
      }

      setEdgeToUpdate(edge);
      setDefineEdgeOpen(false);
      setIsUpdatingEdge(true);

      const foreignObj = document.getElementById("doubleClickForeign");

      if (foreignObj) {
        if (foreignObj.contains(event.target as HTMLElement)) {
          return undefined;
        }
      }

      // if (edgeTarget) {
      //   return undefined;
      // }

      const {
        label: edgeLabel,
        value,
        color,
        showArrow: edgeShowarrow,
        animated,
        showLabel: edgeShowLabel,
        lineThrough: edgeLineThrough,
      } = edge.data as EdgeData;

      event.persist();
      setRelationshipLabel(edgeLabel || "");
      setRelationshipValue(value);
      setRelationshipType(edge.type || "custom");
      setRelationshipColor(color);
      setShowArrow(edgeShowarrow);
      setAnimatedLine(animated);
      setShowlabel(edgeShowLabel);
      setLineThrough(edgeLineThrough);
      if (showFull) {
        setDefineEdgeOpen(true);
      } else {
        const target = event.target as SVGElement;
        handleShowEdgePopper();
        setEdgePopperRef(target);
      }
    },
    []
  );

  const handleChangeLabel = useCallback((_label) => {
    if (_label.__isNew__ && plan_id !== 1) {
      dispatch(
        addEdgeToList({
          id: null,
          label: _label.value,
          description: null,
          values: [],
          style: '{"color": {"a": 1, "b": 0, "g": 0, "r": 0}',
        })
      );
    }
    if (_label.__isNew__ && plan_id === 1) {
      dispatch(
        showNotifAction(t("workspaces.you_can_not_create_new_relationship_types"))
      );
    } else {
      setRelationshipLabel(_label.value);
      setRelationshipValue("");
    }
  }, []);
  const handleChangeValue = useCallback((value) => {
    if (value.value) {
      setRelationshipValue(value.value);
    } else {
      setRelationshipValue(value.target.value);
    }
  }, []);
  const handleTypeChange = useCallback((type) => setRelationshipType(type.value), []);
  const handleColorChange = useCallback((color) => setRelationshipColor(color.rgb), []);
  const handleShowArrowChange = useCallback(() => setShowArrow((val) => !val), []);
  const handleAnimatedLineChange = useCallback(() => setAnimatedLine((val) => !val), []);
  const handleShowLabelChange = useCallback(() => setShowlabel((val) => !val), []);
  const handleLineThroughChange = useCallback(() => setLineThrough((val) => !val), []);

  return {
    edgePopperRef,
    defineEdgeOpen,
    updateEdgeDisplayName,
    handleNoLabelDoubleClick,
    handleRelationshipSave,
    handleChangeLabel,
    handleChangeValue,
    handleTypeChange,
    handleColorChange,
    handleShowArrowChange,
    handleAnimatedLineChange,
    handleShowLabelChange,
    handleLineThroughChange,
    handleHideEdgePopper,
    setEdgePopperRef,
    setIsUpdatingEdge,
    setEdgeToUpdate,
    setDefineEdgeOpen,
    handleShowEdgePopper,
    onConnect,
    onEdgeClick,
    closeDefineEdge,
    relationshipLabel,
    relationshipValue,
    relationshipType,
    relationshipColor,
    showArrow,
    animatedLine,
    showLabel,
    lineThrough,
    isUpdatingEdge,
    edgeToUpdate,
    showEdgePopper,
    edgePopperComponentRef,
  };
};

export default useEdge;
