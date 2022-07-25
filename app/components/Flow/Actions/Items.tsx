/* eslint-disable no-param-reassign */
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";

import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import useStyles from "./actions.jss";
import Divider from "@material-ui/core/Divider";
import BusinessIcon from "@material-ui/icons/Business";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";

import AddBoxIcon from "@material-ui/icons/AddBox";
import AssessmentIcon from "@material-ui/icons/Assessment";
import FlagIcon from "@material-ui/icons/Flag";
import SvgIcon from "@material-ui/core/SvgIcon";

import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Filter1Icon from "@material-ui/icons/Filter1";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CustomSwitch from "@components/Switch/CustomSwitch";
import LowPriorityIcon from "@material-ui/icons/LowPriority";
import { onDragStartNode, onDragStartNote } from "@helpers/flow/dragHelper";

interface Props {
  defineNodeOpen: boolean;
  mouseActive: boolean;
  stickyActive: boolean;
  nodeActive: boolean;
  toggleMouse: () => void;
  toggleSticky: () => void;
  toggleNode: () => void;
  handleOpenCvr: () => void;
  setShowAlertLog: React.Dispatch<React.SetStateAction<boolean>>;
  showAlertLog: boolean;
  history: any;
  id: string | undefined;
  zoom: number;
}

const Items = (props: Props) => {
  const {
    mouseActive,
    stickyActive,
    toggleMouse,
    toggleSticky,
    toggleNode,
    nodeActive,
    handleOpenCvr,
    setShowAlertLog,
    showAlertLog,
    history,
    id,
    zoom
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const [stepsOpen, setStepsOpen] = React.useState(false);

  const stepRef = React.useRef<HTMLButtonElement>(null);

  // const handleToggleStep = () => {
  //   setStepsOpen(prevOpen => !prevOpen);
  // };

  const handleCloseSteps = (event: React.MouseEvent<EventTarget>) => {
    if (
      stepRef.current &&
      stepRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setStepsOpen(false);
  };

  const [editSteps, setEditSteps] = React.useState(false);
  const toggleEditSteps = () => setEditSteps(prevVal => !prevVal);

  const toggleShowAlerts = () => setShowAlertLog(prevVal => !prevVal);
  const goToAnalysis = () => history.push(`analysis/${id}`);

  const handleDragNode = e => onDragStartNode(e, zoom);
  const handleDragNote = e => onDragStartNote(e, zoom);
  // const handleDragStep = e => (e, zoom);

  return (
    <>
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
        <Tooltip arrow title={`${t("workspaces.add_note")}`} placement="right">
          <div onDragStart={handleDragNote} draggable>
            <IconButton className={classes.buttons} onClick={toggleSticky}>
              <NoteAddIcon
                className={classNames(
                  classes.buttons,
                  classes.biggerIcon,
                  stickyActive ? classes.activeButton : ""
                )}
              />
            </IconButton>
          </div>
        </Tooltip>
        {/* <Tooltip arrow title={`${t("workspaces.add_step")}`} placement="right">
          <div onDragStart={handleDragStep} draggable>
            <IconButton
              className={classes.buttons}
              onClick={handleToggleStep}
              ref={stepRef}
            >
              <FormatListNumberedIcon
                className={classNames(
                  classes.buttons,
                  classes.biggerIcon,
                  stepsOpen ? classes.activeButton : ""
                )}
              />
            </IconButton>
          </div>
        </Tooltip> */}
        <Tooltip
          arrow
          title={`${t("workspaces.get_from_company_data")}`}
          placement="right"
        >
          <IconButton className={classes.buttons} onClick={handleOpenCvr}>
            <BusinessIcon
              className={classNames(classes.buttons, classes.biggerIcon)}
            />
          </IconButton>
        </Tooltip>
        <Divider flexItem className={classes.horDivider} />
        <Tooltip arrow title={`${t("workspaces.red_flags")}`} placement="right">
          <IconButton className={classes.buttons} onClick={toggleShowAlerts}>
            <FlagIcon
              className={classNames(
                classes.buttons,
                classes.biggerIcon,
                showAlertLog ? classes.activeButton : ""
              )}
            />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title={`${t("workspaces.analyse")}`} placement="right">
          <IconButton className={classes.buttons} onClick={goToAnalysis}>
            <AssessmentIcon
              className={classNames(classes.buttons, classes.biggerIcon)}
            />
          </IconButton>
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
      <Popper
        open={stepsOpen}
        anchorEl={stepRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 1000, marginLeft: 15 }}
        placement="right"
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper elevation={6} style={{ backgroundColor: "#fcfcfc" }}>
              <ClickAwayListener onClickAway={handleCloseSteps}>
                <MenuList autoFocusItem={stepsOpen}>
                  <MenuItem className={classes.menuItem}>
                    <ListItemIcon>
                      <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText>
                      {t("workspace.smart_step_automatic")}
                    </ListItemText>
                  </MenuItem>
                  <MenuItem className={classes.menuItem}>
                    <ListItemIcon>
                      <Filter1Icon />
                    </ListItemIcon>
                    <ListItemText>
                      {t("workspace.smart_step_manuel")}
                    </ListItemText>
                  </MenuItem>
                  <MenuItem
                    className={classes.menuItem}
                    onClick={toggleEditSteps}
                  >
                    <ListItemIcon>
                      <LowPriorityIcon />
                    </ListItemIcon>
                    <ListItemText>{t("workspace.edit_steps")}</ListItemText>
                    <CustomSwitch checked={editSteps} name="editSteps" />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default memo(Items);
