/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Handle, Position } from 'react-flow-renderer';

const CustomNode = (data) => {
  const theme = useTheme();
  const nodeStyle = {
    border: '2px solid',
    display: 'flex',
    borderRadius: 10,
    padding: 18,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
  };


  return (
    <div style={nodeStyle}>
      <div onClick={data.data.click}>
        <Handle
          style={{ backgroundColor: theme.palette.secondary.main }}
          type="target"
          id="top"
          position={Position.Top}
        />
        <Handle
          style={{
            top: 37
          }}
          type="source"
          id="left"
          position={Position.Left}
        />
        <Handle
          style={{
            top: 27, backgroundColor: theme.palette.secondary.main
          }}
          type="target"
          id="1left"
          position={Position.Left}
        />
        <Handle
          style={{
            top: 27
          }}
          type="source"
          id="right"
          position={Position.Right}
        />
        <Handle
          style={{
            top: 37, backgroundColor: theme.palette.secondary.main
          }}
          type="target"
          id="1right"
          position={Position.Right}
        />
        <Handle type="source" id="bottom" position={Position.Bottom} />
        {data.data.label}
      </div>
    </div>
  );
};

export default memo(CustomNode);
