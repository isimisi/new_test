/* eslint-disable no-mixed-operators */
/* eslint-disable react/prop-types */
import React, { FC } from "react";
import {
  ConnectionLineComponentProps,
  getEdgeCenter
} from "react-flow-renderer";

const ConnectionLine: FC<ConnectionLineComponentProps> = ({
  sourceX,
  sourceY,
  targetX,
  targetY
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_centerX, _centerY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY
  });
  // const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, undefined);

  const lengthBetweenPoints = Math.sqrt(
    (sourceX - targetX) ** 2 + (sourceY - targetY) ** 2
  );
  const factor = 0.5;
  const offset = lengthBetweenPoints * factor;

  const cp1x = sourceX;
  const cp1y = _centerY + offset;

  return (
    <g>
      <path
        fill="none"
        stroke="#222"
        strokeWidth={1.5}
        d={`M${sourceX},${sourceY} C ${cp1x} ${cp1y} ${targetX} ${targetY} ${targetX},${targetY}`}
      />
      <circle
        cx={targetX}
        cy={targetY}
        fill="#fff"
        r={3}
        stroke="#222"
        strokeWidth={1.5}
      />
    </g>
  );
};

export default ConnectionLine;
