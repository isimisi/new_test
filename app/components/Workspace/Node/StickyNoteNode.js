import React, { memo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Resizable } from 're-resizable';


const StickyNote = ({ data }) => {
  const theme = useTheme();

  return (
    <Resizable
      defaultSize={{
        width: 320,
      }}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      }}
    >
      <TextareaAutosize
        rowsMin={3}
        placeholder="Note"
        style={{
          border: 0,
          width: '100%',
          backgroundColor: `${theme.palette.secondary.light}44`,
          padding: 10,
          borderTopRightRadius: 30
        }}
      />
    </Resizable>
  );
};

export default memo(StickyNote);
