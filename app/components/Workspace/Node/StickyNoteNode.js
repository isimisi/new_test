/* eslint-disable react/prop-types */
import React, { memo, useMemo, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { Resizable } from "re-resizable";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  putSticky,
  deleteWorkspaceElement,
} from "@pages/Workspaces/reducers/workspaceActions";
import { useAuth0 } from "@auth0/auth0-react";

const StickyNote = ({ data }) => {
  const handleVisability = useSelector((state) =>
    state.workspace.get("handleVisability")
  );
  const [value, setValue] = useState(data.text);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();
  const user = useAuth0().user;

  const elements = useSelector((state) => state.workspace.get("elements")).toJS();

  useEffect(() => {
    setValue(data.text);
  }, [data.text]);

  const titleContainer = useMemo(
    () => ({
      width: "100%",
      backgroundColor: "#f1f1f1",
      minHeight: 20,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    }),
    []
  );

  const textArea = useMemo(
    () => ({
      border: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#fdfdfd",
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    }),
    []
  );

  const container = useMemo(
    () => ({
      border: "1px solid #f1f1f1",
      borderRadius: 5,
    }),
    []
  );

  const button = useMemo(
    () => ({
      height: 15,
      width: 15,
      marginRight: 2,
    }),
    []
  );

  const icon = useMemo(
    () => ({
      height: 10,
      width: 10,
    }),
    []
  );

  const handleEnable = useMemo(
    () => ({
      top: false,
      right: true,
      bottom: false,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false,
    }),
    []
  );

  const handleClasses = useMemo(
    () => ({
      top: "nodrag",
      right: "nodrag",
      bottom: "nodrag",
      left: "nodrag",
      topRight: "nodrag",
      bottomRight: "nodrag",
      bottomLeft: "nodrag",
      topLeft: "nodrag",
    }),
    []
  );

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: true,
    },
  };

  const handleBlur = useCallback(() => {
    setShowDelete(false);
    dispatch(putSticky(user, data.id, value));
  }, [value]);

  const handleChange = useCallback((html) => {
    setValue(html);
  }, []);

  const handelShowDelete = useCallback(() => {
    setShowDelete(true);
  }, []);

  const deleteNote = useCallback(() => {
    const elementsToRemove = [{ id: `sticky-${data.id}` }];
    const remainingElements = elements.filter((e) => e.id !== elementsToRemove[0].id);
    dispatch(deleteWorkspaceElement(user, elementsToRemove, remainingElements));
  }, [elements]);

  return (
    <Resizable
      style={container}
      minWidth={100}
      enable={handleEnable}
      handleClasses={handleClasses}
      className="resizeable"
    >
      <div
        onMouseOver={handelShowDelete}
        onFocus={handelShowDelete}
        onMouseLeave={handleBlur}
        onBlur={handleBlur}
      >
        {handleVisability && (
          <div style={titleContainer}>
            {showDelete && (
              <IconButton
                aria-label="delete"
                size="small"
                className="nodrag"
                style={button}
                onClick={deleteNote}
              >
                <DeleteIcon style={icon} />
              </IconButton>
            )}
          </div>
        )}
        <ReactQuill
          placeholder="Note"
          theme="bubble"
          style={textArea}
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
          modules={modules}
          className="nodrag"
        />
      </div>
    </Resizable>
  );
};

export default memo(StickyNote);
