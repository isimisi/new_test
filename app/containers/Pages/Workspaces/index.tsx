/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";

import Fab from "@material-ui/core/Fab";
import { useHistory } from "react-router-dom";
import tableOptions from "@helpers/tableOptions";
import CryptoJS from "crypto-js";
import Notification from "@components/Notification/Notification";

import TagList from "@components/Tags/TagList";
import { Tag, WhereInApp } from "@customTypes/data";
import {
  changeTagActivity,
  deleteTag,
  getTags,
  postTag,
  updateTag
} from "@components/Tags/reducers/tagsActions";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useTranslation } from "react-i18next";
import { columns, reducer } from "./constants";
import styles from "./workspace-jss";
import {
  getWorkspaces,
  closeNotifAction,
  postWorkspace,
  deleteWorkspaces,
  showNotifAction
} from "./reducers/workspaceActions";
import { useAuth0, User } from "@auth0/auth0-react";
import { getPlanId } from "@helpers/userInfo";

const Workspaces = props => {
  const { classes } = props;

  const dispatch = useAppDispatch();
  const workspaces = useAppSelector(state =>
    state[reducer].get("workspaces")
  ).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get("message"));
  const loading = useAppSelector(state => state[reducer].get("loading"));
  const tags = useAppSelector(state => state.tags.get("tags")).toJS();
  const history = useHistory();
  const { t } = useTranslation();
  const user = useAuth0().user as User;
  const plan_id = getPlanId(user);

  const col = columns(t);

  useEffect(() => {
    if (user) {
      dispatch(getWorkspaces(user));
      dispatch(getTags(user, WhereInApp.workspace));
    }
  }, [user]);

  const onDelete = ({ data }) => {
    const deletedWorkspaces = data.map(v => ({
      id: workspaces[v.index][4],
      title: workspaces[v.index][0]
    }));
    deletedWorkspaces.forEach(e => {
      const id = CryptoJS.AES.decrypt(
        decodeURIComponent(e.id),
        "path"
      ).toString(CryptoJS.enc.Utf8);

      const title = e.title.split("∉")[0];
      dispatch(deleteWorkspaces(user, id, title));
    });
  };

  const createWorkspace = () => {
    if (plan_id === 1 && workspaces.length === 50) {
      dispatch(showNotifAction(t("workspaces.can_not_create_more_workspaces")));
    } else {
      dispatch(postWorkspace(user, history));
    }
  };

  const handleDeleteTag = id => {
    dispatch(deleteTag(user, id));
  };

  const handlePostTag = (emoji, emojiName, name) => {
    dispatch(postTag(user, emoji, emojiName, name));
  };

  const handleUpdateTag = (id, emoji, emojiName, name) => {
    dispatch(updateTag(user, id, emoji, emojiName, name));
  };

  const handleMakeActiveTag = (tag: Tag) => {
    dispatch(changeTagActivity(tag));
  };

  const activeTags = tags
    .filter(tag => tag.active)
    .map(tag => `${tag.emoji ? tag.emoji : ""} ${tag.name}`);
  col[2].options.filterList = activeTags;

  const handleFilterChanged = (changedColumn, filterList) => {
    if (changedColumn === "Tags") {
      const deleted = activeTags.find(tag => !filterList[2].includes(tag));
      if (deleted) {
        const tagObj = tags.find(
          tag => `${tag.emoji ? tag.emoji : ""} ${tag.name}` === deleted
        );
        handleMakeActiveTag(tagObj);
      }
    }
  };

  const handleShowAll = () => {
    const actTags = tags.filter(tag => tag.active);
    actTags.forEach(tag => {
      dispatch(changeTagActivity(tag));
    });
  };

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
            allNumber={workspaces.length}
            findCountString="workspaceTags"
          />
        </Grid>
        <Grid item md={9} lg={10}>
          <MUIDataTable
            title={t("workspaces.your_workspace")}
            data={workspaces}
            columns={col}
            options={tableOptions(onDelete, loading, handleFilterChanged)}
          />
        </Grid>
      </Grid>
      <Fab
        variant="extended"
        color="primary"
        className={classes.addBtn}
        onClick={createWorkspace}
      >
        {`${t("workspaces.btn_new_workspace")}`}
      </Fab>
    </div>
  );
};

Workspaces.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Workspaces);
