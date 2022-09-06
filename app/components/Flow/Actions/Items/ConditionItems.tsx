import React, { memo } from "react";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import useStyles from "../actions.jss";
import Divider from "@material-ui/core/Divider";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import SvgIcon from "@material-ui/core/SvgIcon";
import { useTranslation } from "react-i18next";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { onDragStartNode } from "@helpers/flow/dragHelper";

interface Props {
  mouseActive: boolean;
  toggleMouse?: () => void;
  nodeActive?: boolean;
  toggleNode?: () => void;
  zoom?: number;
}

function ConditionItems(props: Props) {
  const { mouseActive, toggleMouse, nodeActive, toggleNode, zoom } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const handleDragNode = (e) => onDragStartNode(e, zoom);

  return (
    <Paper elevation={4} className={classes.itemsPaper}>
      <Tooltip arrow title={`${t("workspaces.mouse")}`} placement="right">
        <IconButton className={classes.buttons} onClick={toggleMouse}>
          <SvgIcon
            viewBox="0 0 50 50"
            className={classNames(
              classes.buttons,
              classes.biggerIcon,
              mouseActive ? classes.activeButton : ""
            )}
          >
            <path d="M 29.699219 47 C 29.578125 47 29.457031 46.976563 29.339844 46.933594 C 29.089844 46.835938 28.890625 46.644531 28.78125 46.398438 L 22.945313 32.90625 L 15.683594 39.730469 C 15.394531 40.003906 14.96875 40.074219 14.601563 39.917969 C 14.238281 39.761719 14 39.398438 14 39 L 14 6 C 14 5.601563 14.234375 5.242188 14.601563 5.082031 C 14.964844 4.925781 15.390625 4.996094 15.683594 5.269531 L 39.683594 27.667969 C 39.972656 27.9375 40.074219 28.355469 39.945313 28.726563 C 39.816406 29.101563 39.480469 29.363281 39.085938 29.398438 L 28.902344 30.273438 L 35.007813 43.585938 C 35.117188 43.824219 35.128906 44.101563 35.035156 44.351563 C 34.941406 44.601563 34.757813 44.800781 34.515625 44.910156 L 30.113281 46.910156 C 29.980469 46.96875 29.84375 47 29.699219 47 Z" />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Tooltip arrow title={`${t("workspaces.add_node")}`} placement="right">
        <div onDragStart={handleDragNode} draggable>
          <IconButton className={classes.buttons} onClick={toggleNode}>
            <AddBoxIcon
              className={classNames(
                classes.buttons,
                classes.biggerIcon,
                nodeActive ? classes.activeButton : ""
              )}
            />
          </IconButton>
        </div>
      </Tooltip>
      <Divider flexItem className={classes.horDivider} />
      <Tooltip arrow title={`${t("workspaces.undo")}`} placement="right">
        <span>
          <IconButton className={classes.buttons} disabled>
            <UndoIcon
              className={classNames(classes.buttons, classes.biggerIcon)}
            />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip arrow title={`${t("workspaces.redo")}`} placement="right">
        <span>
          <IconButton className={classes.buttons} disabled>
            <RedoIcon
              className={classNames(classes.buttons, classes.biggerIcon)}
            />
          </IconButton>
        </span>
      </Tooltip>
    </Paper>
  );
}
export default ConditionItems;
