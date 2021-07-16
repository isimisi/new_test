/* eslint-disable react/prop-types */
import React from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';


export default ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  arrowHeadType,
  markerEndId,
}) => (
  <g>
    <path
      fill="none"
      stroke="#B1B1B7"
      strokeWidth={3}
      className="animated"
      d={getBezierPath({
        sourceX,
        sourceY: sourceY - 16,
        targetX,
        targetY: targetY + 15,
      })}
      markerEnd={getMarkerEnd(arrowHeadType, markerEndId)}
    />
  </g>
);
