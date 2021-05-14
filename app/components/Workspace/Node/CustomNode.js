/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Handle, Position } from 'react-flow-renderer';
import Typography from '@material-ui/core/Typography';

const CustomNode = (data) => {
  const theme = useTheme();
  const nodeStyle = {
    border: '1px solid',
    display: 'flex',
    borderRadius: 10,
    padding: 18,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: 'white'
  };


  return (
    <div style={nodeStyle}>
      <Handle
        style={{
          backgroundColor: theme.palette.secondary.main,
          height: 8,
          width: 8,
        }}
        type="target"
        id="top"
        position={Position.Top}
      />
      <Handle
        style={{
          top: 37,
          height: 8,
          width: 8,
        }}
        type="source"
        id="left"
        position={Position.Left}
      />
      <Handle
        style={{
          top: 27,
          backgroundColor: theme.palette.secondary.main,
          height: 8,
          width: 8,
        }}
        type="target"
        id="1left"
        position={Position.Left}
      />
      <Handle
        style={{
          top: 27,
          height: 8,
          width: 8,
        }}
        type="source"
        id="right"
        position={Position.Right}
      />
      <Handle
        style={{
          top: 37,
          backgroundColor: theme.palette.secondary.main,
          height: 8,
          width: 8,
        }}
        type="target"
        id="1right"
        position={Position.Right}
      />
      <Handle
        style={{
          height: 8,
          width: 8,
        }}
        type="source"
        id="bottom"
        position={Position.Bottom}
      />
      {data.data.label}
    </div>
  );
};

export default memo(CustomNode);
