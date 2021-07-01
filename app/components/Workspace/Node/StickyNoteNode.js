/* eslint-disable react/prop-types */
import React, {
  memo, useMemo, useState, useCallback
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { Resizable } from 're-resizable';
import { putSticky } from '../../../containers/Pages/Workspaces/reducers/workspaceActions';


const StickyNote = ({ data }) => {
  const handleVisability = useSelector(state => state.getIn(['workspace', 'handleVisability']));
  const [value, setValue] = useState(data.text);

  const dispatch = useDispatch();

  const titleContainer = useMemo(() => ({
    width: '100%',
    backgroundColor: '#f1f1f1',
    padding: 5,
    minHeight: 20,
  }), []);

  const textArea = useMemo(() => ({
    border: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    borderRadius: 5
  }), []);

  const container = useMemo(() => ({
    border: '1px solid #f1f1f1',
    borderRadius: 5
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
      ['link'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: true,
    }
  };

  const handleBlur = useCallback(() => {
    dispatch(putSticky(data.id, value));
  }, [value]);


  return (
    <Resizable
      style={container}
      minWidth={100}
      enable={handleEnable}
      handleClasses={handleClasses}
      className="resizeable"
    >
      {handleVisability && <div style={titleContainer} />}
      <div className={`quill-${data.id}`} />
      <ReactQuill
        bounds={`.quill-${data.id}`}
        placeholder="Note"
        theme="bubble"
        style={textArea}
        value={value}
        onBlur={handleBlur}
        onChange={setValue}
        modules={modules}
        className="nodrag"
      />
    </Resizable>
  );
};

export default memo(StickyNote);
