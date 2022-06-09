import React, { MouseEvent } from "react";
import {
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider
} from "@material-ui/core";

import AccountTreeIcon from "@material-ui/icons/AccountTree";
import NotesIcon from "@material-ui/icons/Notes";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckIcon from "@material-ui/icons/Check";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import { ContextTypes } from "@customTypes/reactFlow";
import { useTranslation } from "react-i18next";
import useStyles from "./menu.jss";

interface Props {
  x: number;
  y: number;
  contextType: ContextTypes;
  show: boolean;
  paste: (event: MouseEvent) => void;
  nodeClick: (event: React.MouseEvent<Element, globalThis.MouseEvent>) => void;
  stickyClick: () => void;
  handleShowGrid: () => void;
  handleVisability: boolean;
  handleSnapToGrid: () => void;
  snapToGrid: boolean;
  fitView: () => void;
}

const PaneContextMenu = ({
  x,
  y,
  contextType,
  show,
  paste,
  nodeClick,
  stickyClick,
  handleShowGrid,
  handleVisability,
  handleSnapToGrid,
  snapToGrid,
  fitView
}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  if (show && contextType === ContextTypes.Pane) {
    return (
      <Paper
        className={classes.menuContainer}
        style={{ top: y, left: x - 250 }}
      >
        <MenuList>
          <MenuItem onClick={paste}>
            <ListItemIcon>
              <AccountTreeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t("flow.pane_context_menu.paste")}</ListItemText>
            <Typography variant="body2" color="textSecondary">
              ⌘V
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={nodeClick}>
            <ListItemIcon>
              <CheckBoxOutlineBlankIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              {t("flow.pane_context_menu.create_node")}
            </ListItemText>
            <Typography variant="body2" color="textSecondary">
              ⌘I
            </Typography>
          </MenuItem>
          <MenuItem onClick={stickyClick}>
            <ListItemIcon>
              <NotesIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              {t("flow.pane_context_menu.create_sticky")}
            </ListItemText>
            <Typography variant="body2" color="textSecondary">
              N
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleShowGrid}>
            <ListItemIcon>
              {handleVisability && (
                <CheckIcon fontSize="small" color="primary" />
              )}
            </ListItemIcon>
            <ListItemText>{t("flow.pane_context_menu.show_grid")}</ListItemText>
            <Typography variant="body2" color="textSecondary">
              alt + G
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleSnapToGrid}>
            <ListItemIcon>
              {snapToGrid && <CheckIcon fontSize="small" color="primary" />}
            </ListItemIcon>
            <ListItemText>{t("flow.pane_context_menu.snap")}</ListItemText>
            <Typography variant="body2" color="textSecondary">
              alt + K
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={fitView}>
            <ListItemIcon>
              <AspectRatioIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t("flow.pane_context_menu.show_all")}</ListItemText>
            <Typography variant="body2" color="textSecondary">
              ⌘1
            </Typography>
          </MenuItem>
        </MenuList>
      </Paper>
    );
  }
  return <></>;
};

export default PaneContextMenu;
