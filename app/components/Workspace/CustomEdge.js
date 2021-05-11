/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';

const drawCurve = (sourceX, sourceY, targetX, targetY) => {
  // mid-point of line:
  const mpx = (targetX + sourceX) * 0.5;
  const mpy = (targetY + sourceY) * 0.5;

  // angle of perpendicular to line:
  const theta = Math.atan2(targetY - sourceY, targetX - sourceX) - Math.PI / 2;

  // distance of control point from mid-point of line:
  const offset = 100;

  // location of control point:
  const c1x = mpx + offset * Math.cos(theta);
  const c1y = mpy + offset * Math.sin(theta);

  // construct the command to draw a quadratic curve
  const curve = 'M' + sourceX + ' ' + sourceY + ' Q ' + c1x + ' ' + c1y + ' ' + targetX + ' ' + targetY;
  return curve;
};

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
  markerEndId,
}) {
  const edgePath = drawCurve(
    sourceX, sourceY, targetX, targetY
  );
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      <text onClick={data.click}>
        <textPath href={`#${id}`} style={{ fontSize: '12px' }} startOffset="50%" textAnchor="middle">
          {data.text}
        </textPath>
      </text>
    </>
  );
}
