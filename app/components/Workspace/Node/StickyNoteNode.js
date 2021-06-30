/* eslint-disable react/prop-types */
import React, { memo, useMemo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';

import { Resizable } from 're-resizable';


const StickyNote = (data) => {
  const theme = useTheme();

  const titleContainer = useMemo(() => ({
    width: '100%',
    backgroundColor: `${theme.palette.secondary.light}aa`,
    padding: 5,
    minHeight: 20
  }), []);

  const textArea = useMemo(() => ({
    border: 0,
    width: '100%',
    backgroundColor: `${theme.palette.secondary.light}44`,
    padding: 10,
  }), []);

  const handleEnable = useMemo(() => ({
    top: false,
    right: true,
    bottom: false,
    left: false,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false
  }), []);

  const handleClasses = useMemo(() => ({
    top: 'nodrag',
    right: 'nodrag',
    bottom: 'nodrag',
    left: 'nodrag',
    topRight: 'nodrag',
    bottomRight: 'nodrag',
    bottomLeft: 'nodrag',
    topLeft: 'nodrag'
  }), []);

  return (
    <Resizable
      minWidth={100}
      enable={handleEnable}
      handleClasses={handleClasses}
    >
      <div style={titleContainer}>
        <Typography variant="subtitle2">
          {data.title}
        </Typography>
      </div>
      <TextareaAutosize
        rowsMin={3}
        placeholder="Note"
        className="nodrag"
        style={textArea}
      />
    </Resizable>
  );
};

export default memo(StickyNote);
