/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Handle, Position } from 'react-flow-renderer';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

const CustomNode = ({ data }) => {
  const theme = useTheme();
  const handleVisability = useSelector(state => state.getIn(['workspace', 'handleVisability']));

  const nodeStyle = {
    border: '1px solid',
    borderRadius: theme.rounded.small,
    display: 'flex',
    padding: 10,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: data.backgroundColor ? data.backgroundColor : '#ffffff',
    borderColor: data.borderColor ? data.borderColor : '#000000'
  };

  const handleStyle = {
    height: handleVisability ? 8 : 0,
    width: handleVisability ? 8 : 0,
  };

  return (
    <div style={nodeStyle}>
      <Handle
        style={handleStyle}
        type="source"
        id="top"
        position={Position.Top}
      />
      <Handle
        style={{
          top: '30%',
          ...handleStyle
        }}
        type="source"
        id="leftTop"
        position={Position.Left}
      />
      <Handle
        style={{
          top: '70%',
          ...handleStyle
        }}
        type="source"
        id="leftBottom"
        position={Position.Left}
      />
      <Handle
        style={{
          top: '30%',
          ...handleStyle
        }}
        type="source"
        id="rightBottom"
        position={Position.Right}
      />
      <Handle
        style={{
          top: '70%',
          ...handleStyle
        }}
        type="source"
        id="rightTop"
        position={Position.Right}
      />
      <Handle
        style={handleStyle}
        type="source"
        id="bottom"
        position={Position.Bottom}
      />
      <Typography variant="subtitle1" style={{ fontSize: 10 }}>{data.displayName || data.label}</Typography>
      {data.conditionValues && data.conditionValues.map(cv => (
        <Typography variant="body2" style={{ fontSize: 6 }}>
          {cv.attribut.label}
          {' '}
          {cv.comparison_type}
          {' '}
          {cv.comparison_value}
        </Typography>
      ))}
    </div>
  );
};

export default memo(CustomNode);
