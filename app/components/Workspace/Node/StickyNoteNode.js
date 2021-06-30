/* eslint-disable react/prop-types */
import React, { memo, useMemo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' },
        { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  };

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
      <ReactQuill theme="bubble" style={textArea} modules={modules} className="nodrag" />
    </Resizable>
  );
};

export default memo(StickyNote);
