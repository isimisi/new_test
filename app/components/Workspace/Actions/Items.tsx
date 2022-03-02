/* eslint-disable no-param-reassign */
import React from "react";
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
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
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

interface Props {
  setDefineNodeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defineNodeOpen: boolean;
  handlePostSticky: () => void;
  handleOpenCvr: () => void;
  setShowAlertLog: React.Dispatch<React.SetStateAction<boolean>>;
  showAlertLog: boolean;
  history: any;
  id: string | undefined;
}

const Items = (props: Props) => {
  const {
    setDefineNodeOpen,
    defineNodeOpen,
    handlePostSticky,
    handleOpenCvr,
    setShowAlertLog,
    showAlertLog,
    history,
    id
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const [stepsOpen, setStepsOpen] = React.useState(false);
  const stepRef = React.useRef<HTMLButtonElement>(null);

  const handleToggleStep = () => {
    setStepsOpen(prevOpen => !prevOpen);
  };

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

  const toggleOpenNode = () => setDefineNodeOpen(prevVal => !prevVal);
  const toggleShowAlerts = () => setShowAlertLog(prevVal => !prevVal);
  const goToAnalysis = () => history.push(`analysis/${id}`);

  // const [dragging, setDragging] = React.useState(false);
  // const onDragStart = (event, nodeType) => {
  //   setDragging(true);
  //   event.dataTransfer.setData("application/reactflow", nodeType);
  //   event.dataTransfer.effectAllowed = "move";
  // };

  return (
    <>
      <Paper elevation={4} className={classes.itemsPaper}>
        <Tooltip arrow title={`${t("workspaces.add_node")}`} placement="right">
          <IconButton className={classes.buttons} onClick={toggleOpenNode}>
            <AddBoxIcon
              className={classNames(
                classes.buttons,
                classes.biggerIcon,
                defineNodeOpen ? classes.activeButton : ""
              )}
            />
            {/* <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "#fc00fc"
              }}
            /> */}
          </IconButton>
        </Tooltip>
        <Tooltip arrow title={`${t("workspaces.add_note")}`} placement="right">
          <IconButton className={classes.buttons} onClick={handlePostSticky}>
            <NoteAddIcon
              className={classNames(classes.buttons, classes.biggerIcon)}
            />
          </IconButton>
        </Tooltip>
        {/* <Tooltip arrow title={`${t("workspaces.add_step")}`} placement="right">
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
      {/* <Popper
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
      </Popper> */}
    </>
  );
};

export default Items;
