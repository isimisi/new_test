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


  return (
    <div style={nodeStyle}>
      <Handle
        style={{
          backgroundColor: theme.palette.secondary.main,
          height: handleVisability ? 8 : 0,
          width: handleVisability ? 8 : 0,
        }}
        type="target"
        id="top"
        position={Position.Top}
      />
      <Handle
        style={{
          top: 30,
          height: handleVisability ? 8 : 0,
          width: handleVisability ? 8 : 0,
        }}
        type="source"
        id="sourceLeft"
        position={Position.Left}
      />
      <Handle
        style={{
          top: 20,
          backgroundColor: theme.palette.secondary.main,
          height: handleVisability ? 8 : 0,
          width: handleVisability ? 8 : 0,
        }}
        type="target"
        id="targetLeft"
        position={Position.Left}
      />
      <Handle
        style={{
          top: 20,
          height: handleVisability ? 8 : 0,
          width: handleVisability ? 8 : 0,
        }}
        type="source"
        id="sourceRight"
        position={Position.Right}
      />
      <Handle
        style={{
          top: 30,
          backgroundColor: theme.palette.secondary.main,
          height: handleVisability ? 8 : 0,
          width: handleVisability ? 8 : 0,
        }}
        type="target"
        id="targetRight"
        position={Position.Right}
      />
      <Handle
        style={{
          height: handleVisability ? 8 : 0,
          width: handleVisability ? 8 : 0,
        }}
        type="source"
        id="bottom"
        position={Position.Bottom}
      />
      <Typography variant="subtitle1">{data.label}</Typography>
    </div>
  );
};

export default memo(CustomNode);
