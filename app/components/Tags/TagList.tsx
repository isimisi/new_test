/* eslint-disable camelcase */
import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Tag } from '@customTypes/data';
import { useTranslation } from 'react-i18next';
import useStyles from './tag.jss';

import CreateTag from './CreateTag';


interface Props {
  tags: Tag[];
  handleDelete: (id: number | null) => void;
  handlePostTag: (emoji: string | undefined, emoji_name: string | undefined, name: string) => void;
  handleUpdateTag: (id: number | undefined, emoji: string | undefined, emoji_name: string | undefined, name: string) => void;
  makeActive: (tag: Tag) => void;
  handleShowAll: () => void;
  allNumber: number;
  findCountString: 'workspaceTags' | 'actionTags'
}

const TagList = (props: Props) => {
  const {
    tags, handleDelete, handlePostTag, handleUpdateTag, allNumber, makeActive, findCountString, handleShowAll
  } = props;

  const classes = useStyles();
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openId, setOpenId] = useState(null);
  const contextOpen = Boolean(anchorEl);
  const { t } = useTranslation();


  const handleCloseTag = () => {
    setOpenId(null);
    setShowCreateTag(false);
  };
  const handleOpenTag = () => setShowCreateTag(true);

  const handleContextOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpenId(id);
  };
  const handleContextClose = (editing = false) => {
    setAnchorEl(null);
    if (!editing) {
      setOpenId(null);
    }
  };

  return (
    <>
      <Paper>
        <List className={classes.tagContainer}>
          <ListItem button className={!tags.some(tag => tag.active) ? classes.activelistItem : undefined} onClick={handleShowAll}>
            <ListItemText primary={t('tag-list.show_all')} />
            <ListItemSecondaryAction>
              <Paper className={classes.countContainer}>
                <Typography className={classes.tagCount}>
                  {allNumber}
                </Typography>
              </Paper>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={handleOpenTag}
            >
              {`${t('tag-list.add_new_tag')}`}
            </Button>
          </ListItem>
          <Divider className={classes.divider} />
          {tags.map((tag) => {
            const labelId = `tag-${tag.id.toString()}`;
            return (
              <ListItem
                key={tag.id.toString()}
                dense
                button
                onClick={() => makeActive(tag)}
                className={tag.active ? classes.activelistItem : undefined}
              >
                <ListItemAvatar className={classes.listItemAvatar}>
                  <span role="img" aria-label={tag.emoji_name}>{tag.emoji}</span>
                </ListItemAvatar>
                <ListItemText className={classes.text} id={labelId} primary={tag.name} />
                <ListItemSecondaryAction style={{ display: 'flex' }}>
                  <IconButton size="small" style={{ marginRight: 5 }} onClick={(e) => handleContextOpen(e, tag.id)}>
                    <MoreVertIcon fontSize="inherit" />
                  </IconButton>
                  <Paper className={classes.countContainer}>
                    <Typography className={classes.tagCount}>
                      {tag[findCountString]?.length}
                    </Typography>
                  </Paper>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Paper>
      <CreateTag
        open={showCreateTag}
        close={handleCloseTag}
        handlePostTag={handlePostTag}
        setOpenId={setOpenId}
        handleUpdate={openId ? handleUpdateTag : undefined}
        openId={openId}
        emojiName={openId ? tags.find(tag => tag.id === openId)?.emoji_name : undefined}
        emoji={openId ? tags.find(tag => tag.id === openId)?.emoji : undefined}
        initialName={openId ? tags.find(tag => tag.id === openId)?.name : undefined}
      />
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={contextOpen}
        onClose={() => handleContextClose()}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => {
          handleContextClose(true);
          handleOpenTag();
        }}
        >
          <EditIcon fontSize="inherit" className={classes.editIcon} />
        </MenuItem>
        <MenuItem onClick={() => {
          handleContextClose();
          handleDelete(openId);
        }}
        >
          <DeleteIcon fontSize="inherit" className={classes.deleteIcon} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default TagList;
