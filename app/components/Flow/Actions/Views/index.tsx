/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */

import React from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";

import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import useStyles from "../actions.jss";

import BorderHorizontalIcon from "@material-ui/icons/BorderHorizontal";
import BorderVerticalIcon from "@material-ui/icons/BorderVertical";

import Divider from "@material-ui/core/Divider";
import AllInboxIcon from "@material-ui/icons/AllInbox";

import ErrorIcon from "@material-ui/icons/Error";
import Badge from "@material-ui/core/Badge";
import { TCustomNode } from "@customTypes/reducers/timeline";

interface Props {
  openTableView: (bool?: boolean) => void;
  view: "horizontal" | "vertical";
  changeView: (direction: "horizontal" | "vertical") => void;
  handleOpenImportEmails: () => void;
  handleToggleCorectEmails: () => void;
  openTable: boolean;
  toggleDrawer: (bool?: boolean) => void;
  nodes: TCustomNode[];
}

function Views(props: Props) {
  const {
    openTableView,
    view,
    changeView,
    handleOpenImportEmails,
    handleToggleCorectEmails,
    openTable,
    nodes,
    toggleDrawer
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const handleVertical = () => {
    changeView("vertical");
    toggleDrawer(true);
  };

  const handleHorizontal = () => {
    changeView("horizontal");
    toggleDrawer(false);
  };

  const handleTable = () => {
    openTableView();
  };

  const badges = nodes.filter((e) => !e.data?.date && e.id !== "static-button");

  return (
    <Paper elevation={4} className={classes.viewsPaper}>
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
      {/* <Tooltip arrow title={`${t("timeline.table")}`} placement="right">
          <IconButton className={classes.buttons} onClick={handleTable}>
            <TocIcon
              className={classNames(
                classes.buttons,
                classes.biggerIcon,
                openTable ? classes.activeButton : ""
              )}
            />
          </IconButton>
        </Tooltip> */}
      <Divider flexItem className={classes.horDivider} />
      <Tooltip arrow title={`${t("timeline.import_mails")}`} placement="right">
        <IconButton
          className={classes.buttons}
          onClick={handleOpenImportEmails}
        >
          <AllInboxIcon
            className={classNames(classes.buttons, classes.biggerIcon)}
          />
        </IconButton>
      </Tooltip>
      {badges.length > 0 && (
        <Tooltip
          arrow
          title={`${t("timeline.import_mails_with_error")}`}
          placement="right"
        >
          <IconButton
            className={classes.buttons}
            onClick={handleToggleCorectEmails}
          >
            <Badge
              color="error"
              badgeContent={badges.length}
              style={{ color: "white" }}
              overlap="circular"
            >
              <ErrorIcon
                className={classNames(classes.buttons, classes.biggerIcon)}
              />
            </Badge>
          </IconButton>
        </Tooltip>
      )}
    </Paper>
  );
}

export default Views;
