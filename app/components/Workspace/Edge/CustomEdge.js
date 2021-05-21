/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';
import {
  useHistory
} from 'react-router-dom';

const drawCurve = (sourceX, sourceY, targetX, targetY, convert) => {
  // mid-point of line:
  let mpx = (targetX + sourceX) * 0.5;
  let mpy = (targetY + sourceY) * 0.5;

  if (convert) {
    mpx = (sourceX + targetX) * 0.5;
    mpy = (sourceY + targetY) * 0.5;
  }

  // angle of perpendicular to line:
  let theta = Math.atan2(targetY - sourceY, targetX - sourceX) - Math.PI / 2;

  if (convert) {
    theta = Math.atan2(sourceY - targetY, sourceX - targetX) - Math.PI / 2;
  }

  // distance of control point from mid-point of line:
  let offset = 100;

  if (convert) {
    offset = 50;
  }

  // location of control point:
  const c1x = mpx + offset * Math.cos(theta);
  const c1y = mpy + offset * Math.sin(theta);
  // construct the command to draw a quadratic curve
  let curve = 'M' + sourceX + ' ' + sourceY + ' Q ' + c1x + ' ' + c1y + ' ' + targetX + ' ' + targetY;

  if (convert) {
    curve = 'M' + targetX + ' ' + targetY + ' Q ' + c1x + ' ' + c1y + ' ' + sourceX + ' ' + sourceY;
  }

  return curve;
};

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
  label,
  arrowHeadType,
  markerEndId,
}) => {
  const edgePath = drawCurve(
    sourceX, sourceY, targetX, targetY, data.convert
  );
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const history = useHistory();
  const isCondition = history.location.pathname.includes('conditions');
  let text = `${data.showLabel ? data.label : ''}${data.showLabel ? ': ' : ''}${data.value}`;

  if (isCondition) {
    text = `${data.label} ${data.comparison_type} ${data.comparison_value}`;
  }

  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      <text dy="-10">
        <textPath href={`#${id}`} style={{ fontSize: '12px' }} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </>
  );
};

export default CustomEdge;
