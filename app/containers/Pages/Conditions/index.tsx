/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Fab from '@material-ui/core/Fab';
import { useHistory } from 'react-router-dom';
import tableOptions from '@helpers/tableOptions';
import CryptoJS from 'crypto-js';
import Notification from '@components/Notification/Notification';
import { loadFromLocalStorage } from '@utils/localStorage';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import TagList from '@components/Tags/TagList';
import { Tag, WhereInApp } from '@customTypes/data';
import {
  deleteTag,
  postTag,
  updateTag,
  changeTagActivity,
  getTags
} from '@components/Tags/reducers/tagsActions';
import { columns, reducer } from './constants';
import styles from './conditions-jss';
import {
  closeNotifAction,
  getConditions,
  postCondition,
  deleteCondition
} from './reducers/conditionActions';

function Conditions(props) {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const conditions = useAppSelector(state => state[reducer].get('conditions')
  ).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get('message'));
  const loading = useAppSelector(state => state[reducer].get('loading'));
  const history = useHistory();
  const tags = useAppSelector(state => state.tags.get('tags')).toJS();
  const { plan_id } = loadFromLocalStorage();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getConditions());
    dispatch(getTags(WhereInApp.condition));

    if (plan_id === 1) {
      history.push('/app/plan');
    }
  }, []);

  const onDelete = ({ data }) => {
    const deletedNodes = data.map(v => ({
      id: conditions[v.index][3],
      title: conditions[v.index][0]
    }));
    deletedNodes.forEach(e => {
      const id = CryptoJS.AES.decrypt(
        decodeURIComponent(e.id),
        'path'
      ).toString(CryptoJS.enc.Utf8);
      dispatch(deleteCondition(id, e.title));
    });
  };

  const handleDeleteTag = id => {
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

  const handleShowAll = () => {
    const actTags = tags.filter(tag => tag.active);
    actTags.forEach(tag => {
      dispatch(changeTagActivity(tag));
    });
  };
  console.log(tags);
  return (
    <div className={classes.table}>
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
      />
      <Grid container spacing={2} direction="row">
        <Grid item md={3} lg={2}>
          <TagList
            tags={tags}
            handleDelete={handleDeleteTag}
            handlePostTag={handlePostTag}
            handleShowAll={handleShowAll}
            handleUpdateTag={handleUpdateTag}
            makeActive={handleMakeActiveTag}
            allNumber={conditions.length}
            findCountString="conditionTags"
          />
        </Grid>
        <Grid item md={9} lg={10}>
          <MUIDataTable
            title={t('conditions.your_conditions')}
            data={conditions}
            columns={columns(t)}
            options={tableOptions(onDelete, loading)}
          />
        </Grid>
      </Grid>
      <Fab
        variant="extended"
        color="primary"
        className={classes.addBtn}
        onClick={() => dispatch(postCondition(history))}
      >
        {`${t('conditions.your_conditions')}`}
      </Fab>
    </div>
  );
}

Conditions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Conditions);
