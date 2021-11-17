/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';

import Fab from '@material-ui/core/Fab';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import tableOptions from '@helpers/tableOptions';
import CryptoJS from 'crypto-js';
import Notification from '@components/Notification/Notification';
import { loadFromLocalStorage } from '@utils/localStorage';

import TagList from '@components/Tags/TagList';
import { Tag } from '@customTypes/data';
import {
  columns,
  reducer
} from './constants';
import styles from './workspace-jss';
import {
  getWorkspaces,
  closeNotifAction,
  postWorkspace,
  deleteWorkspaces,
  showNotifAction,
  getTags,
  deleteTag,
  postTag,
  updateTag,
  changeTagActivity
} from './reducers/workspaceActions';

const { plan_id } = loadFromLocalStorage();

const Workspaces = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();
  const workspaces = useSelector(state => state[reducer].get('workspaces')).toJS();
  const messageNotif = useSelector(state => state[reducer].get('message'));
  const loading = useSelector(state => state[reducer].get('loading'));
  const tags = useSelector(state => state[reducer].get('tags'))?.toJS();
  const history = useHistory();

  const col = columns;

  useEffect(() => {
    dispatch(getWorkspaces());
    dispatch(getTags());
  }, []);

  const onDelete = ({ data }) => {
    const deletedWorkspaces = data.map(v => ({ id: workspaces[v.index][3], title: workspaces[v.index][0] }));
    deletedWorkspaces.forEach(e => {
      const id = CryptoJS.AES.decrypt(decodeURIComponent(e.id), 'path').toString(CryptoJS.enc.Utf8);
      const title = e.title.split('∉')[0];
      dispatch(deleteWorkspaces(id, title));
    });
  };

  const createWorkspace = () => {
    if (plan_id === 1 && workspaces.length === 50) {
      dispatch(showNotifAction('Du kan ikke lave flere arbejdsområder. Opgrader for at lave flere.'));
    } else {
      dispatch(postWorkspace(history));
    }
  };

  const handleDeleteTag = (id) => {
    dispatch(deleteTag(id));
  };

  const handlePostTag = (emoji, emojiName, name) => {
    dispatch(postTag(emoji, emojiName, name));
  };

  const handleUpdateTag = (id, emoji, emojiName, name) => {
    dispatch(updateTag(id, emoji, emojiName, name));
  };

  const handleMakeActiveTag = (tag: Tag) => {
    dispatch(changeTagActivity(tag));
  };

  
    const activeTags = tags.filter(tag => tag.active).map(tag => `${tag.emoji ? tag.emoji : ''} ${tag.name}`);
    col[2].options.filterList = activeTags
  
  const handleFilterChanged = (changedColumn, filterList, type, changedColumnIndex, displayData) => {
    if(changedColumn === 'Tags') {
      const deleted = activeTags.find(tag => !filterList[2].includes(tag))
      if(deleted) {
        const tagObj = tags.find(tag => `${tag.emoji ? tag.emoji : ''} ${tag.name}` === deleted)
        handleMakeActiveTag(tagObj)
      }
    }

  }

  return (
    <div className={classes.table}>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <Grid container spacing={2} direction="row" justify="center">
        <Grid item md={3} lg={2}>
          <TagList
            tags={tags}
            handleDelete={handleDeleteTag}
            handlePostTag={handlePostTag}
            handleUpdateTag={handleUpdateTag}
            makeActive={handleMakeActiveTag}
            allNumber={workspaces.length}
          />
        </Grid>
        <Grid item md={9} lg={10}>
          <MUIDataTable
            title="Dine arbejdsområder"
            data={workspaces}
            columns={col}
            options={tableOptions(onDelete, loading, 'arbejdsområder', handleFilterChanged)}
          />
        </Grid>
      </Grid>
      <Tooltip title="Nyt arbejdsområde">
        <Fab variant="extended" color="primary" className={classes.addBtn} onClick={createWorkspace}>
            Nyt arbejdsområde
        </Fab>
      </Tooltip>
    </div>
  );
};

Workspaces.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Workspaces);
