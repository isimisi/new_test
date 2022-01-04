import React from 'react';
import {
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider
} from '@material-ui/core';
import { FlowElement, Node } from 'react-flow-renderer';
import { useTheme } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import { MyTheme } from '@customTypes/styling';
import { ContextTypes } from '@customTypes/reactFlow';
import { useTranslation } from 'react-i18next';
import useStyles from './menu.jss';

interface Props {
  x: number;
  y: number;
  contextSelection: Node<any>[] | null;
  contextType: ContextTypes;
  show: boolean;
  cut: (e: any) => void;
  copy: (e: any) => void;
  onElementsRemove: (elementsToRemove: FlowElement[]) => void;
}

const NodeContextMenu = ({
  x,
  y,
  contextSelection,
  contextType,
  show,
  cut,
  copy,
  onElementsRemove
}: Props) => {
  const theme = useTheme<MyTheme>();
  const { t } = useTranslation();
  const classes = useStyles();

  const handleRemove = () => contextSelection && onElementsRemove(contextSelection);

  if (show && contextType === ContextTypes.Selection) {
    return (
      <Paper
        className={classes.menuContainer}
        style={{ top: y, left: x - 250 }}
      >
        <MenuList>
          <MenuItem onClick={cut}>
            <ListItemIcon>
              <FlipToBackIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('flow.node_context_menu.cut')}</ListItemText>
            <Typography variant="body2" color="textSecondary">
              ⌘X
            </Typography>
          </MenuItem>
          <MenuItem onClick={copy}>
            <ListItemIcon>
              <FileCopyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('flow.node_context_menu.copy')}</ListItemText>
            <Typography variant="body2" color="textSecondary">
              ⌘C
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleRemove}>
            <ListItemIcon>
              <DeleteIcon
                fontSize="small"
                style={{ color: theme.palette.error.contrastText }}
              />
            </ListItemIcon>
            <ListItemText
              primary={t('flow.node_context_menu.delete')}
              primaryTypographyProps={{
                style: {
                  color: theme.palette.error.contrastText
                }
              }}
            />
            <Typography variant="body2" color="textSecondary">
              ←
            </Typography>
          </MenuItem>
        </MenuList>
      </Paper>
    );
  }
  return <></>;
};

export default NodeContextMenu;
