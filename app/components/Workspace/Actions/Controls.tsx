import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import MapIcon from "@material-ui/icons/Map";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import SelectAllIcon from "@material-ui/icons/SelectAll";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import HelpIcon from "@material-ui/icons/Help";
import Button from "@material-ui/core/Button";
import useStyles from "./actions.jss";
import Expand from "react-expand-animated";
import { MiniMap, OnLoadParams } from "react-flow-renderer";
import { useTheme } from "@material-ui/core/styles";
import { closeFullScreen, openFullScreen } from "@helpers/fullScreen";

interface Props {
  currentZoom: number;
  reactFlowInstance: OnLoadParams | null;
}

const Controls = (props: Props) => {
  const { currentZoom, reactFlowInstance } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const [showMiniMap, setShowMiniMap] = React.useState(true);
  const handleToggleMiniMap = () => setShowMiniMap(prevVal => !prevVal);

  const [fullScreen, setFullScreen] = React.useState(false);
  const handleToggleFullScreen = () => {
    fullScreen ? closeFullScreen(setFullScreen) : openFullScreen(setFullScreen);
  };

  const fitToView = () => reactFlowInstance?.fitView();
  const zoomIn = () => reactFlowInstance?.zoomIn();
  const zoomOut = () => reactFlowInstance?.zoomOut();
  const zoomTo = () => reactFlowInstance?.zoomTo(1);

  return (
    <>
      <Paper elevation={4} className={classes.controlsPaper}>
        <Tooltip
          arrow
          title={`${
            fullScreen
              ? t("workspaces.exit_full_screen")
              : t("workspaces.full_screen")
          }`}
          placement="top"
        >
          <IconButton
            className={classes.buttons}
            onClick={handleToggleFullScreen}
          >
            <FullscreenIcon
              className={classNames(
                classes.buttons,
                fullScreen ? classes.activeButton : ""
              )}
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          arrow
          title={`${
            showMiniMap ? t("workspaces.dont_show_map") : t("workspaces.map")
          }`}
          placement="top"
        >
          <IconButton className={classes.buttons} onClick={handleToggleMiniMap}>
            <MapIcon
              className={classNames(
                classes.buttons,
                showMiniMap ? classes.activeButton : ""
              )}
            />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title={`${t("workspaces.fit_to_view")}`} placement="top">
          <IconButton className={classes.buttons} onClick={fitToView}>
            <SelectAllIcon className={classes.buttons} />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title={`${t("workspaces.zoom_out")}`} placement="top">
          <IconButton className={classes.buttons} onClick={zoomOut}>
            <RemoveIcon className={classes.buttons} />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title={`${t("workspaces.zoom_to_100")}`} placement="top">
          <Button className={classes.buttons} style={{ fontSize: 15 }} onClick={zoomTo}>
            {`${Math.round(currentZoom * 100)}%`}
          </Button>
        </Tooltip>
        <Tooltip arrow title={`${t("workspaces.zoom_in")}`} placement="top">
          <IconButton className={classes.buttons} onClick={zoomIn}>
            <AddIcon className={classes.buttons} />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title={`${t("workspaces.help")}`} placement="top">
          <IconButton className={classes.buttons}>
            <HelpIcon className={classes.buttons} />
          </IconButton>
        </Tooltip>
      </Paper>
      <Expand
        open={showMiniMap}
        duration={500}
        transitions={["height", "opacity", "background"]}
      >
        <div data-html2canvas-ignore="true">
          <MiniMap
            nodeStrokeWidth={3}
            nodeColor={theme.palette.secondary.main}
            className={classes.miniMap}
          />
        </div>
      </Expand>
    </>
  );
};

export default Controls;
