/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { memo } from 'react';
import {
  EdgeText,
  getEdgeCenter,
  getMarkerEnd,
  Position
} from 'react-flow-renderer';
import { useHistory } from 'react-router-dom';

type Point = [number, number];

const getFactor = (
  sourcePosition,
  targetPosition,
  sourceY,
  targetY,
  sourceX,
  targetX
) => {
  const leftAndRight = [Position.Left, Position.Right];
  let factor = 0;

  if (sourcePosition === targetPosition) {
    factor = 0.4;
  }

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

  if (sourcePosition === Position.Left && targetPosition === Position.Right) {
    factor = 0.2;
    if (targetX + 100 < sourceX) {
      factor = 0.1;
    } else if (targetX - 120 > sourceX) {
      factor = 0.8;
    } else if (targetX - 60 > sourceX) {
      factor = 0.6;
    } else if (targetX > sourceX) {
      factor = 0.4;
    }
  }

  if (targetPosition === Position.Left && sourcePosition === Position.Right) {
    factor = 0.2;
    if (sourceX + 100 < targetX) {
      factor = 0.1;
    } else if (sourceX - 120 > targetX) {
      factor = 0.8;
    } else if (sourceX - 60 > targetX) {
      factor = 0.6;
    } else if (sourceX > targetX) {
      factor = 0.4;
    }
  }

  if (
    sourcePosition === Position.Top
    && leftAndRight.includes(targetPosition)
  ) {
    factor = sourceY + 60 < targetY ? 0.6 : 0.4;
  }
  if (
    sourcePosition === Position.Bottom
    && leftAndRight.includes(targetPosition)
  ) {
    factor = targetY + 60 < sourceY ? 0.6 : 0.4;
  }

  if (
    leftAndRight.includes(sourcePosition)
    && targetPosition === Position.Bottom
  ) {
    factor = targetY + 60 < sourceY ? 0.6 : 0.4;
  }

  if (
    leftAndRight.includes(sourcePosition)
    && targetPosition === Position.Top
  ) {
    factor = sourceY + 60 < targetY ? 0.6 : 0.4;
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
  centerX?: number,
  centerY?: number
): { path: string; points: Point[] } => {
  const [_centerX, _centerY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY
  });

  const cX = typeof centerX !== 'undefined' ? centerX : _centerX;
  const cY = typeof centerY !== 'undefined' ? centerY : _centerY;

  const lengthBetweenPoints = Math.sqrt(
    // eslint-disable-next-line no-mixed-operators
    (sourceX - targetX) ** 2 + (sourceY - targetY) ** 2
  );
  let cp1x;
  let cp1y;
  let cp2x;
  let cp2y;
  const factor = getFactor(
    sourcePosition,
    targetPosition,
    sourceY,
    targetY,
    sourceX,
    targetX
  );
  const offset = lengthBetweenPoints * factor;

  if (sourcePosition === Position.Top && targetPosition === Position.Bottom) {
    cp1x = sourceX;
    cp1y = cY - offset;
    cp2x = targetX;
    cp2y = cY + offset;
  } else if (
    sourcePosition === Position.Top
    && targetPosition === Position.Top
  ) {
    cp1x = sourceX;
    cp1y = cY - offset;
    cp2x = targetX;
    cp2y = cY - offset;
  } else if (
    sourcePosition === Position.Top
    && targetPosition.includes('left')
  ) {
    cp1x = sourceX;
    cp1y = sourceY - offset;
    cp2x = targetX - offset;
    cp2y = targetY;
  } else if (
    sourcePosition === Position.Top
    && targetPosition.includes('right')
  ) {
    cp1x = sourceX;
    cp1y = sourceY - offset;
    cp2x = targetX + offset;
    cp2y = targetY;
  } else if (
    sourcePosition === Position.Bottom
    && targetPosition === Position.Bottom
  ) {
    cp1x = sourceX;
    cp1y = cY + offset;
    cp2x = targetX;
    cp2y = cY + offset;
  } else if (
    sourcePosition === Position.Bottom
    && targetPosition === Position.Top
  ) {
    cp1x = sourceX;
    cp1y = cY + offset;
    cp2x = targetX;
    cp2y = cY - offset;
  } else if (
    sourcePosition === Position.Bottom
    && targetPosition.includes('left')
  ) {
    cp1x = sourceX;
    cp1y = cY + offset;
    cp2x = targetX - offset;
    cp2y = targetY;
  } else if (
    sourcePosition === Position.Bottom
    && targetPosition.includes('right')
  ) {
    cp1x = sourceX;
    cp1y = cY + offset;
    cp2x = targetX + offset;
    cp2y = targetY;
  } else if (
    sourcePosition.includes('left')
    && targetPosition === Position.Bottom
  ) {
    cp1x = sourceX - offset;
    cp1y = sourceY;
    cp2x = targetX;
    cp2y = targetY + offset;
  } else if (
    sourcePosition.includes('left')
    && targetPosition === Position.Top
  ) {
    cp1x = sourceX - offset;
    cp1y = sourceY;
    cp2x = targetX;
    cp2y = targetY - offset;
  } else if (
    sourcePosition.includes('left')
    && targetPosition.includes('left')
  ) {
    cp1x = cX - offset;
    cp1y = sourceY;
    cp2x = cX - offset;
    cp2y = targetY;
  } else if (
    sourcePosition.includes('left')
    && targetPosition.includes('right')
  ) {
    cp1x = cX - offset;
    cp1y = sourceY;
    cp2x = cX + offset;
    cp2y = targetY;
  } else if (
    sourcePosition.includes('right')
    && targetPosition === Position.Bottom
  ) {
    cp1x = sourceX + offset;
    cp1y = sourceY;
    cp2x = targetX;
    cp2y = targetY + offset;
  } else if (
    sourcePosition.includes('right')
    && targetPosition === Position.Top
  ) {
    cp1x = sourceX + offset;
    cp1y = sourceY;
    cp2x = targetX;
    cp2y = targetY - offset;
  } else if (
    sourcePosition.includes('right')
    && targetPosition === Position.Left
  ) {
    cp1x = cX + offset;
    cp1y = sourceY;
    cp2x = cX - offset;
    cp2y = targetY;
  } else if (
    sourcePosition.includes('right')
    && targetPosition.includes('right')
  ) {
    cp1x = cX + offset;
    cp1y = sourceY;
    cp2x = cX + offset;
    cp2y = targetY;
  }

  const path = `M${sourceX},${sourceY} C${cp1x},${cp1y} ${cp2x},${cp2y} ${targetX},${targetY}`;
  const points: Point[] = [
    [sourceX, sourceY],
    [cp1x, cp1y],
    [cp2x, cp2y],
    [targetX, targetY]
  ];

  return { path, points };
};

/**
 *
 * @param A array: [x,y] coordiantes
 * @param B array: [x,y] coordiantes
 * @param t 0 <= t <= 1
 * @returns [x,y] coordiantes
 */
// A and B are arrays where the first element is the x
// and the second element is the y coordinate of the point
// if(t == .5) the function returns a point in the center of the line AB
// t is always a number between 0 and 1
// 0 <= t <= 1
const lerp = (A: Point, B: Point, t: number): Point => [
  (B[0] - A[0]) * t + A[0],
  (B[1] - A[1]) * t + A[1]
];

const CustomEdge = ({
  id,
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

  const { path, points } = drawCurve(
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  );

  const t = 0.5;
  const helperPoints: Point[] | [] = [];
  // https://codepen.io/enxaneta/post/how-to-add-a-point-to-an-svg-path
  helperPoints[0] = lerp(points[0], points[1], t);
  helperPoints[1] = lerp(points[1], points[2], t);
  helperPoints[2] = lerp(points[2], points[3], t);
  helperPoints[3] = lerp(helperPoints[0], helperPoints[1], t);
  helperPoints[4] = lerp(helperPoints[1], helperPoints[2], t);
  helperPoints[5] = lerp(helperPoints[3], helperPoints[4], t);

  const history = useHistory();
  const isCondition = history.location.pathname.includes('conditions');
  let label = `${data.showLabel || !data.value ? data.label : ''}${
    data.showLabel ? ': ' : ''
  }${data.value}`;

  if (isCondition) {
    label = `${data.label} ${data.comparison_type} ${data.comparison_value}`;
  }

  const text = label ? (
    <EdgeText
      x={helperPoints[5][0]}
      y={helperPoints[5][1]}
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
