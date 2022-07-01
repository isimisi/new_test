/* eslint-disable react/button-has-type */
import IconButton from "@material-ui/core/IconButton";
import React, { useCallback, useState } from "react";

import {
  EdgeProps,
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd
} from "react-flow-renderer";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import {
  createElementChange,
  setTimelineNode
} from "@pages/Timelines/reducers/timelineActions";

const foreignObjectSize = 24;

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId
}: EdgeProps) {
  const dispatch = useAppDispatch();
  const view = useAppSelector(state => state.timeline.get("view"));
  const handleOpenCreateElement = () => {
    dispatch(setTimelineNode(null));
    dispatch(createElementChange(true));
  };
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY
  });

  const [showButton, setShowButton] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setShowButton(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowButton(false);
  }, []);

  const isHorizontal = view === "horizontal";

  return (
    <g onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={isHorizontal ? 220 : foreignObjectSize}
        height={!isHorizontal ? 100 : foreignObjectSize}
        x={
          isHorizontal
            ? sourceX - foreignObjectSize / 2
            : edgeCenterX - foreignObjectSize / 2
        }
        y={
          isHorizontal
            ? edgeCenterY - foreignObjectSize / 2
            : sourceY - foreignObjectSize / 2
        }
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <body
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {showButton && (
            <IconButton
              style={{ backgroundColor: "#F3F5F8" }}
              size="small"
              onClick={handleOpenCreateElement}
            >
              <AddBoxIcon />
            </IconButton>
          )}
        </body>
      </foreignObject>
    </g>
  );
}
