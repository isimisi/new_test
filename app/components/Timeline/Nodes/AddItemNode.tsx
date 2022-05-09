import React, { memo, useState } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import useStyles from "../timeline.jss";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { useAppDispatch } from "@hooks/redux";
import { createElementChange } from "../../../containers/Pages/Timelines/reducers/timelineActions";

export default memo(({ data, isConnectable }: NodeProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const handleOpenCreateElement = () => dispatch(createElementChange(true));

  return (
    <Paper style={{ borderRadius: "100%" }} className="nodrag">
      <Tooltip arrow title="Add item" placement="top">
        <IconButton onClick={handleOpenCreateElement}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Handle
        type="target"
        style={{ left: 1 }}
        position={Position.Left}
        className={classes.horizontalHandle}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ right: 1 }}
        className={classes.horizontalHandle}
      />
    </Paper>
  );
});
