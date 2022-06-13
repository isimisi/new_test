/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import CircularProgress from "@material-ui/core/CircularProgress";
import React, { memo } from "react";
import {
  EdgeText,
  getEdgeCenter,
  getMarkerEnd,
  Position
} from "react-flow-renderer";
import { useHistory } from "react-router-dom";

const getFactor = (
  sourcePosition: Position,
  targetPosition: Position,
  sourceY: number,
  targetY: number,
  sourceX: number,
  targetX: number,
  cpComputedPosition: { x: number; y: number } | undefined
) => {
  const leftAndRight = [Position.Left, Position.Right];
  let factor = 0;

  if (sourcePosition === Position.Top && targetPosition === Position.Bottom) {
    factor = 0.2;
    if (targetY + 100 < sourceY) {
      factor = 0.1;
    } else if (targetY - 120 > sourceY) {
      factor = 0.8;
    } else if (targetY - 60 > sourceY) {
      factor = 0.6;
    } else if (targetY > sourceY) {
      factor = 0.4;
    }
  }

  if (targetPosition === Position.Top && sourcePosition === Position.Bottom) {
    factor = 0.2;
    if (sourceY + 100 < targetY) {
      factor = 0.1;
    } else if (sourceY - 120 > targetY) {
      factor = 0.8;
    } else if (sourceY - 60 > targetY) {
      factor = 0.6;
    } else if (sourceY > targetY) {
      factor = 0.4;
    }
  }

  if (
    leftAndRight.includes(sourcePosition) &&
    leftAndRight.includes(targetPosition)
  ) {
    factor = 0.2;
  }

  if (
    sourcePosition === Position.Top &&
    leftAndRight.includes(targetPosition)
  ) {
    factor = 0.2;
  }
  if (
    sourcePosition === Position.Bottom &&
    leftAndRight.includes(targetPosition)
  ) {
    factor = targetY + 60 < sourceY ? 0.6 : 0.4;
  }

  if (
    leftAndRight.includes(sourcePosition) &&
    targetPosition === Position.Bottom
  ) {
    factor = targetY + 60 < sourceY ? 0.6 : 0.4;
  }

  if (
    leftAndRight.includes(sourcePosition) &&
    targetPosition === Position.Top
  ) {
    factor = sourceY + 60 < targetY ? 0.6 : 0.4;
  }

  if (
    sourcePosition === targetPosition &&
    leftAndRight.includes(sourcePosition)
  ) {
    factor = 0.3;
    if (sourceX + 100 < targetX) {
      factor = 0.6;
    } else if (targetX + 100 < sourceX) {
      factor = 0.6;
    }
  }

  if (
    sourcePosition === targetPosition &&
    !leftAndRight.includes(sourcePosition)
  ) {
    factor = 0.3;
    if (sourceY + 100 < targetY) {
      factor = 0.6;
    } else if (targetY + 100 < sourceY) {
      factor = 0.6;
    }
  }

  return factor;
};

const drawCurve = (
  sourceX: number,
  sourceY: number,
  sourcePosition: Position,
  targetX: number,
  targetY: number,
  targetPosition: Position,
  controlPoints: string,
  source: string,
  target: string
): string => {
  const [_centerX, _centerY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY
  });

  const cX = _centerX;
  const cY = _centerY;

  const lengthBetweenPoints = Math.sqrt(
    // eslint-disable-next-line no-restricted-properties
    Math.pow(sourceX - targetX, 2) + Math.pow(sourceY - targetY, 2)
  );

  let cp1x = 0;
  let cp1y = 0;
  let cp2x = 0;
  let cp2y = 0;

  const cpMiddle = document.querySelector(`[data-id=${controlPoints}]`);

  const middleRadius = 3;
  let cpComputedPosition;
  if (cpMiddle) {
    // @ts-ignore
    const { x, y } = cpMiddle.computedStyleMap().get("transform")[0];
    cpComputedPosition = {
      x: x.value,
      y: y.value
    };
  }

  let cpMidX = cpComputedPosition ? cpComputedPosition.x - 50 : 0;
  const cpMidY = cpComputedPosition ? cpComputedPosition.y : 0;

  const factor = getFactor(
    sourcePosition,
    targetPosition,
    sourceY,
    targetY,
    sourceX,
    targetX,
    cpComputedPosition
  );

  const offset = lengthBetweenPoints * factor;

  if (sourcePosition === Position.Top && targetPosition === Position.Bottom) {
    cp1x = sourceX;
    cp1y = cY - offset;
    cp2x = targetX;
    cp2y = cY + offset;
  } else if (
    sourcePosition === Position.Top &&
    targetPosition === Position.Top
  ) {
    cp1x = sourceX;
    cp1y = cY - offset;
    cp2x = targetX;
    cp2y = cY - offset;
    cpMidX = cpComputedPosition ? cpComputedPosition.x - 10 : 0;
  } else if (
    sourcePosition === Position.Top &&
    targetPosition.includes("left")
  ) {
    cp1x = sourceX;
    cp1y = sourceY - offset;
    cp2x = targetX - offset;
    cp2y = targetY;
  } else if (
    sourcePosition === Position.Top &&
    targetPosition.includes("right")
  ) {
    cp1x = sourceX;
    cp1y = sourceY - offset;
    cp2x = targetX + offset;
    cp2y = targetY;
  } else if (
    sourcePosition === Position.Bottom &&
    targetPosition === Position.Bottom
  ) {
    cp1x = sourceX;
    cp1y = cY + offset;
    cp2x = targetX;
    cp2y = cY + offset;
  } else if (
    sourcePosition === Position.Bottom &&
    targetPosition === Position.Top
  ) {
    if (source === target) {
      cp1x = sourceX;
      cp1y = cY + offset;
      cp2x = targetX;
      cp2y = cY - offset;
    } else {
      cp1x = sourceX;
      cp1y = cY + offset;
      cp2x = targetX;
      cp2y = cY - offset;
    }
  } else if (
    sourcePosition === Position.Bottom &&
    targetPosition.includes("left")
  ) {
    cp1x = sourceX;
    cp1y = cY + offset;
    cp2x = targetX - offset;
    cp2y = targetY;
  } else if (
    sourcePosition === Position.Bottom &&
    targetPosition.includes("right")
  ) {
    cp1x = sourceX;
    cp1y = cY + offset;
    cp2x = targetX + offset;
    cp2y = targetY;
  } else if (
    sourcePosition.includes("left") &&
    targetPosition === Position.Bottom
  ) {
    cp1x = sourceX - offset;
    cp1y = sourceY;
    cp2x = targetX;
    cp2y = targetY + offset;
  } else if (
    sourcePosition.includes("left") &&
    targetPosition === Position.Top
  ) {
    cp1x = sourceX - offset;
    cp1y = sourceY;
    cp2x = targetX;
    cp2y = targetY - offset;
  } else if (
    sourcePosition.includes("left") &&
    targetPosition.includes("left")
  ) {
    cp1x = cX - offset;
    cp1y = sourceY;
    cp2x = cX - offset;
    cp2y = targetY;
  } else if (
    sourcePosition.includes("left") &&
    targetPosition.includes("right")
  ) {
    cp1x = cX - offset;
    cp1y = sourceY;
    cp2x = cX + offset;
    cp2y = targetY;
  } else if (
    sourcePosition.includes("right") &&
    targetPosition === Position.Bottom
  ) {
    cp1x = sourceX + offset;
    cp1y = sourceY;
    cp2x = targetX;
    cp2y = targetY + offset;
  } else if (
    sourcePosition.includes("right") &&
    targetPosition === Position.Top
  ) {
    cp1x = sourceX + offset;
    cp1y = sourceY;
    cp2x = targetX;
    cp2y = targetY - offset;
  } else if (
    sourcePosition.includes("right") &&
    targetPosition.includes("left")
  ) {
    cp1x = sourceX + offset;
    cp1y = sourceY;
    cp2x = targetX - offset;
    cp2y = targetY;
    cpMidX = cpComputedPosition ? cpComputedPosition.x - 50 : 0;
  } else if (
    sourcePosition.includes("right") &&
    targetPosition.includes("right")
  ) {
    cp1x = cX + offset;
    cp1y = sourceY;
    cp2x = cX + offset;
    cp2y = targetY;
  }

  let path = `
  M${sourceX},${sourceY}
  C${cp1x},${cp1y} ${cp2x},${cp2y} ${targetX},${targetY}`;

  if (cpComputedPosition) {
    path = `
    M${sourceX},${sourceY}
    C${cp1x},${cp1y} ${cpMidX},${cpMidY} ${cpComputedPosition.x +
      middleRadius},${cpComputedPosition.y + middleRadius}
    S${cp2x},${cp2y} ${targetX},${targetY}`;
  }

  return path;
};

export const findPointOnEdge = (
  d: string,
  prcnt: number
): { x: number; y: number } => {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);

  const pathLength = Math.floor(path.getTotalLength());

  // eslint-disable-next-line no-param-reassign
  prcnt = (prcnt * pathLength) / 100;

  // Get x and y values at a certain point in the line
  const pt = path.getPointAtLength(prcnt);
  const x = Math.round(pt.x);
  const y = Math.round(pt.y);

  path.remove();

  return { x, y };
};

const CustomEdge = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  // label,
  labelStyle,
  labelShowBg,
  labelBgStyle,
  labelBgPadding,
  labelBgBorderRadius,
  arrowHeadType,
  markerEndId
}) => {
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  const path = drawCurve(
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    data.controlPoints,
    source,
    target
  );

  const center = findPointOnEdge(path, 50);

  const history = useHistory();
  const isCondition = history.location.pathname.includes("conditions");
  let label = `${data.showLabel || !data.value ? data.label : ""}${
    data.showLabel ? ": " : ""
  }${data.value}`;

  if (isCondition) {
    label = `${data.label} ${data.comparison_type} ${data.comparison_value}`;
  }

  const text = label ? (
    <EdgeText
      x={center.x}
      y={center.y}
      label={label}
      labelStyle={labelStyle}
      labelShowBg={labelShowBg}
      labelBgStyle={labelBgStyle}
      labelBgPadding={labelBgPadding}
      labelBgBorderRadius={labelBgBorderRadius}
    />
  ) : null;

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={path}
        markerEnd={markerEnd}
      />
      {text}
    </>
  );
};

export default memo(CustomEdge);
