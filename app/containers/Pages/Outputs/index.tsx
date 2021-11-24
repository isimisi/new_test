/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { useHistory } from 'react-router-dom';
import Notification from '@components/Notification/Notification';
import tableOptions from '@helpers/tableOptions';
import { loadFromLocalStorage } from '@utils/localStorage';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import {
  changeTagActivity,
  deleteTag,
  getTags,
  postTag,
  updateTag
} from '@components/Tags/reducers/tagsActions';
import Grid from '@material-ui/core/Grid';
import TagList from '@components/Tags/TagList';
import { Tag, WhereInApp } from '@customTypes/data';
import { columns, reducer } from './constants';
import useStyles from './output-jss';
import {
  getOutput,
  postOutput,
  closeNotifAction,
  deleteOutput
} from './reducers/outputActions';
import {useTranslation} from 'react-i18next';

const Outputs = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const outputs = useAppSelector(state => state[reducer].get('outputs')).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get('message'));
  const tags = useAppSelector(state => state.tags.get('tags')).toJS();
  const history = useHistory();
  const { plan_id } = loadFromLocalStorage();
  const {t} = useTranslation();

  useEffect(() => {
    dispatch(getOutput());
    dispatch(getTags(WhereInApp.output));
    if (plan_id !== 4) {
      history.push('/app/plan');
    }
  }, []);

  const onDelete = ({ data }) => {
    const deletedOutput = data.map(v => ({
      id: outputs[v.index][3],
      title: outputs[v.index][0]
    }));
    deletedOutput.forEach(e => {
      dispatch(deleteOutput(e.id, e.title));
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
  const col = columns;
  const activeTags = tags
    .filter(tag => tag.active)
    .map(tag => `${tag.emoji ? tag.emoji : ''} ${tag.name}`);
  col[2].options.filterList = activeTags;

  const handleFilterChanged = (changedColumn, filterList) => {
    if (changedColumn === 'Tags') {
      const deleted = activeTags.find(tag => !filterList[2].includes(tag));
      if (deleted) {
        const tagObj = tags.find(
          tag => `${tag.emoji ? tag.emoji : ''} ${tag.name}` === deleted
        );
        handleMakeActiveTag(tagObj);
      }
    }
  };

  const handleShowAll = () => {
    const acTags = tags.filter(tag => tag.active);
    acTags.forEach(tag => {
      dispatch(changeTagActivity(tag));
    });
  };

  return (
    <div className={classes.table}>
<<<<<<< Updated upstream
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <MUIDataTable
        title={t('outputs.outputs.title')}
        data={outputs}
        columns={columns}
        options={tableOptions(onDelete, false, t('outputs.outputs.loadingMeassage'))}
=======
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
>>>>>>> Stashed changes
      />
      <Grid container spacing={2} direction="row" justify="center">
        <Grid item md={3} lg={2}>
          <TagList
            tags={tags}
            handleDelete={handleDeleteTag}
            handlePostTag={handlePostTag}
            handleUpdateTag={handleUpdateTag}
            makeActive={handleMakeActiveTag}
            handleShowAll={handleShowAll}
            allNumber={outputs.length}
            findCountString="actionTags"
          />
        </Grid>
        <Grid item md={9} lg={10}>
          <MUIDataTable
            title="Dit indhold"
            data={outputs}
            columns={columns}
            options={tableOptions(
              onDelete,
              false,
              'rapportindhold',
              handleFilterChanged
            )}
          />
        </Grid>
      </Grid>
      <Tooltip title="Nyt indhold">
<<<<<<< Updated upstream
        <Fab variant="extended" color="primary" className={classes.addBtn} onClick={() => dispatch(postOutput(history))}>
          {`${t('outputs.outputs.btn_create_new_output')}`}
=======
        <Fab
          variant="extended"
          color="primary"
          className={classes.addBtn}
          onClick={() => dispatch(postOutput(history))}
        >
          Create new Output
>>>>>>> Stashed changes
        </Fab>
      </Tooltip>
    </div>
  );
};

export default Outputs;
