/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable no-param-reassign */
import React from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";

import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import useStyles from "./actions.jss";

import BorderHorizontalIcon from "@material-ui/icons/BorderHorizontal";
import BorderVerticalIcon from "@material-ui/icons/BorderVertical";
import TocIcon from "@material-ui/icons/Toc";

interface Props {
  openTableView: (bool: boolean) => void;
  view: "horizontal" | "vertical";
  changeView: (direction: "horizontal" | "vertical") => void;
}

const Items = (props: Props) => {
  const { openTableView, view, changeView } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const handleVertical = () => {
    changeView("vertical");
    openTableView(true);
  };

  const handleHorizontal = () => {
    changeView("horizontal");
    openTableView(false);
  };

  return (
    <>
      <Paper elevation={4} className={classes.itemsPaper}>
        <Tooltip arrow title={`${t("timeline.horizontal")}`} placement="right">
          <IconButton className={classes.buttons} onClick={handleHorizontal}>
            <BorderHorizontalIcon
              className={classNames(
                classes.buttons,
                classes.biggerIcon,
                view === "horizontal" ? classes.activeButton : ""
              )}
            />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title={`${t("timeline.vertical")}`} placement="right">
          <IconButton className={classes.buttons} onClick={handleVertical}>
            <BorderVerticalIcon
              className={classNames(
                classes.buttons,
                classes.biggerIcon,
                view === "vertical" ? classes.activeButton : ""
              )}
            />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title={`${t("timeline.table")}`} placement="right">
          <IconButton
            className={classes.buttons}
            onClick={() => openTableView(true)}
          >
            <TocIcon
              className={classNames(classes.buttons, classes.biggerIcon)}
            />
          </IconButton>
        </Tooltip>
      </Paper>
    </>
  );
};

export default Items;
