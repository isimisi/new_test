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
import MouseIcon from "@material-ui/icons/Mouse";
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
  mouseActive: boolean;
  stickyActive: boolean;
  toggleMouse: () => void;
  toggleSticky: () => void;
  handleOpenCvr: () => void;
  setShowAlertLog: React.Dispatch<React.SetStateAction<boolean>>;
  showAlertLog: boolean;
  history: any;
  id: string | undefined;
  zoom: number;
}

const Items = (props: Props) => {
  const {
    setDefineNodeOpen,
    defineNodeOpen,
    mouseActive,
    stickyActive,
    toggleMouse,
    toggleSticky,
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

  const onDragStartNode = event => {
    const drag_icon = document.createElement("div");

    drag_icon.style.position = "absolute";
    drag_icon.style.top = "-300px";
    drag_icon.style.right = "0px";
    drag_icon.style.width = `${172 * zoom}px`;
    drag_icon.style.height = `${36 * zoom}px`;
    // drag_icon.style.backgroundColor = "white";
    drag_icon.style.borderRadius = "8px";
    drag_icon.style.border = "1px solid #73B1FF";
    drag_icon.style.opacity = "0.99999";

    document.body.appendChild(drag_icon);

    const dt = event.dataTransfer;

    dt.setDragImage(drag_icon, 0, 0);

    dt.setData("application/reactflow", "custom");
    dt.effectAllowed = "move";
  };

  const onDragStartNote = event => {
    const drag_icon = document.createElement("div");
    const header = document.createElement("div");
    const body = document.createElement("div");
    drag_icon.appendChild(header);
    drag_icon.appendChild(body);

    header.style.backgroundColor = "#f1f1f1";
    header.style.width = "100%";
    header.style.height = `${20 * zoom}px`;
    header.style.borderTopLeftRadius = `${5 * zoom}px`;
    header.style.borderTopRightRadius = `${5 * zoom}px`;
    header.style.opacity = "0.99999";

    body.style.backgroundColor = "#fdfdfd";
    body.style.width = "100%";
    body.style.height = "100%";
    body.style.borderBottomLeftRadius = `${5 * zoom}px`;
    body.style.borderBottomRightRadius = `${5 * zoom}px`;
    body.style.opacity = "0.99999";

    drag_icon.style.position = "absolute";
    drag_icon.style.top = "-300px";
    drag_icon.style.right = "0px";
    drag_icon.style.width = `${100 * zoom}px`;
    drag_icon.style.height = `${45 * zoom}px`;
    drag_icon.style.borderRadius = `${5 * zoom}px`;
    drag_icon.style.border = "2px solid #f1f1f1";
    drag_icon.style.opacity = "0.99999";

    document.body.appendChild(drag_icon);

    const dt = event.dataTransfer;

    dt.setDragImage(drag_icon, 0, 0);

    dt.setData("application/reactflow", "sticky");
    dt.effectAllowed = "move";
  };

  const onDragStartStep = event => {
    const drag_icon = document.createElement("div");
    const number = document.createElement("p");

    drag_icon.appendChild(number);

    number.innerHTML = "1";
    number.style.fontSize = `${10 * zoom}px`;
    number.style.textAlign = "center";
    number.style.marginTop = `${5 * zoom}px`;

    drag_icon.style.position = "absolute";
    drag_icon.style.top = "-300px";
    drag_icon.style.right = "0px";
    drag_icon.style.width = `${20 * zoom}px`;
    drag_icon.style.height = `${20 * zoom}px`;
    drag_icon.style.borderRadius = `100%`;
    drag_icon.style.backgroundColor = "#fdfdfd";
    drag_icon.style.border = "1px solid #f1f1f1";
    drag_icon.style.opacity = "0.99999";
    drag_icon.style.display = "flex";
    drag_icon.style.justifyContent = "center";
    drag_icon.style.alignItems = "center";

    document.body.appendChild(drag_icon);

    const dt = event.dataTransfer;

    dt.setDragImage(drag_icon, 0, 0);

    dt.setData("application/reactflow", "input");
    dt.effectAllowed = "move";
  };

  return (
    <>
      <Paper elevation={4} className={classes.itemsPaper}>
        <Tooltip arrow title={`${t("workspaces.mouse")}`} placement="right">
          <IconButton className={classes.buttons} onClick={toggleMouse}>
            <MouseIcon
              className={classNames(
                classes.buttons,
                classes.biggerIcon,
                mouseActive ? classes.activeButton : ""
              )}
            />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title={`${t("workspaces.add_node")}`} placement="right">
          <div onDragStart={onDragStartNode} draggable>
            <IconButton className={classes.buttons} onClick={toggleOpenNode}>
              <AddBoxIcon
                className={classNames(
                  classes.buttons,
                  classes.biggerIcon,
                  defineNodeOpen ? classes.activeButton : ""
                )}
              />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip arrow title={`${t("workspaces.add_note")}`} placement="right">
          <div onDragStart={onDragStartNote} draggable>
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
        <Tooltip arrow title={`${t("workspaces.add_step")}`} placement="right">
          <div onDragStart={onDragStartStep} draggable>
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
        </Tooltip>
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

export default Items;
