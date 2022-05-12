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
import { useAppDispatch } from "@hooks/redux";
import { createElementChange } from "../../../containers/Pages/Timelines/reducers/timelineActions";

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
  const handleOpenCreateElement = () => dispatch(createElementChange(true));
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

  return (
    <g onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={235}
        height={foreignObjectSize}
        x={sourceX}
        y={edgeCenterY - foreignObjectSize / 2}
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
