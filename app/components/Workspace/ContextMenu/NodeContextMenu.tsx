import React, { MouseEvent, useMemo, memo } from 'react';
import {
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  CircularProgress,

} from '@material-ui/core';

import { useTheme } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import EditIcon from '@material-ui/icons/Edit';
import { MyTheme } from '@customTypes/styling';
import { ContextTypes } from '@customTypes/reactFlow';
import { useTranslation } from 'react-i18next';
import useStyles from './menu.jss';
import { NodeData, TCustomNode } from '@customTypes/reducers/workspace';
import { Node } from 'react-flow-renderer10';

interface Props {
  x: number;
  y: number;
  contextNode: TCustomNode | null;
  contextType: ContextTypes;
  show: boolean;
  handleEdit: (event: MouseEvent, element: TCustomNode, showFull: boolean) => void;
  handleShowNodeRelations: (node: Node<NodeData>) => void;
  showCompanyInfo: (id: string) => void;
  getAddressInfo: (id: string) => void;
  loading: boolean;
  cut: (e: any, Node) => void;
  copy: (e: any, Node) => void;
  onElementsRemove: (elementsToRemove: TCustomNode[]) => void
}

const NodeContextMenu = ({
  x, y,
  contextNode,
  contextType,
  show,
  handleEdit,
  handleShowNodeRelations,
  showCompanyInfo,
  loading,
  getAddressInfo,
  cut,
  copy,
  onElementsRemove
}: Props) => {
  const theme = useTheme<MyTheme>();
  const { t } = useTranslation();
  const classes = useStyles();

  const hanldeEditClick = (e) => contextNode && handleEdit(e, contextNode, true);
  const hanldeShowCompanyInfo = () => contextNode && showCompanyInfo(contextNode.id);
  const hanldeShowAddressInfo = () => contextNode && getAddressInfo(contextNode.id);
  const handleCut = (e) => contextNode && cut(e, contextNode);
  const handleCopy = (e) => contextNode && copy(e, contextNode);
  const handleRemove = () => contextNode && onElementsRemove([contextNode]);
  const showNodeRelationships = () => contextNode && handleShowNodeRelations(contextNode as Node<NodeData>);

  const notSticky = useMemo(() => contextNode?.type !== 'sticky', [contextNode]);
  const showInfoButtons = useMemo(() => contextNode?.data && "unitNumber" in contextNode.data && contextNode.data.unitNumber, [contextNode]);


  if (show && contextType === ContextTypes.Node) {
    return (
      <Paper
        className={classes.menuContainer}
        style={{ top: y, left: x - 250 }}
      >
        {loading ? (
          <div className={classes.loadingConatiner}>
            <CircularProgress />
          </div>
        )
          : (
            <MenuList>


              {notSticky && <MenuItem onClick={hanldeEditClick}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  {t('flow.node_context_menu.edit')}
                </ListItemText>
                <Typography
                  variant="body2"
                  color="primary"
                  className={classes.editName}
                >
                  {/* @ts-ignore */}
                  {contextNode?.data?.displayName}
                </Typography>
              </MenuItem>}
              {notSticky && <MenuItem onClick={showNodeRelationships}>
                <ListItemText>{t('flow.node_context_menu.relations_info')}</ListItemText>
                <Typography variant="body2" color="textSecondary">
              alt + R
                </Typography>
              </MenuItem>}
              {showInfoButtons && (<MenuItem onClick={hanldeShowCompanyInfo}>
                <ListItemText>{t('flow.node_context_menu.company_info')}</ListItemText>
                <Typography variant="body2" color="textSecondary">
                    alt + S
                </Typography>
              </MenuItem>)}
              {showInfoButtons && <MenuItem onClick={hanldeShowAddressInfo}>
                <ListItemText>{t('flow.node_context_menu.building_info')}</ListItemText>
                <Typography variant="body2" color="textSecondary">
            alt + E
                </Typography>
              </MenuItem>
              }

              <MenuItem onClick={handleCut}>
                <ListItemIcon>
                  <FlipToBackIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('flow.node_context_menu.cut')}</ListItemText>
                <Typography variant="body2" color="textSecondary">
              ⌘X
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCopy}>
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
                  <DeleteIcon fontSize="small" style={{ color: theme.palette.error.contrastText }} />
                </ListItemIcon>
                <ListItemText
                  primary={t('flow.node_context_menu.delete')}
                  primaryTypographyProps={{
                    style: {
                      color: theme.palette.error.contrastText
                    }
                  }}
                  /* @ts-ignore */
                  secondary={contextNode?.data?.displayName}
                  secondaryTypographyProps={{
                    style: {
                      maxWidth: 200,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: theme.palette.error.contrastText
                    }
                  }}
                />
                <Typography variant="body2" color="textSecondary">
              ←
                </Typography>
              </MenuItem>
            </MenuList>
          )}
      </Paper>
    );
  }
  return <></>;
};

export default memo(NodeContextMenu);
