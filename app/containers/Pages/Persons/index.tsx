/* eslint-disable camelcase */
import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Fab from "@material-ui/core/Fab";
import Notification from "@components/Notification/Notification";
import { useHistory } from "react-router-dom";
import CryptoJS from "crypto-js";
import tableOptions from "@helpers/tableOptions";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useTranslation } from "react-i18next";
import { CircularProgress, Grid } from "@material-ui/core";
import TagList from "@components/Tags/TagList";
import { WhereInApp } from "@customTypes/data";
import {
  changeTagActivity,
  deleteTag,
  getTags,
  postTag,
  updateTag
} from "@components/Tags/reducers/tagsActions";
import useStyles from "./person-jss";
import { columns, reducer } from "./constants";

import { useAuth0, User } from "@auth0/auth0-react";
import { getPlanId } from "@helpers/userInfo";
import { Tag } from "@customTypes/reducers/tags";
import {
  closeNotifAction,
  deletePerson,
  getPersons,
  postPerson
} from "./reducers/personActions";

const Persons = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const persons = useAppSelector(state => state[reducer].get("persons"));
  const messageNotif = useAppSelector(state => state[reducer].get("message"));
  const loadings = useAppSelector(state => state[reducer].get("loadings"));
  const tags = useAppSelector(state => state.tags.get("tags")).toJS();
  const history = useHistory();
  const user = useAuth0().user as User;
  const plan_id = getPlanId(user);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getPersons(user));
    dispatch(getTags(user, WhereInApp.timelinePerson));

    if (plan_id === 1) {
      history.push("/app/plan");
    }
  }, [user]);

  const onDelete = ({ data }) => {
    const deletedNodes = data.map(v => ({
      id: persons.get(v.dataIndex).get(4)
    }));
    deletedNodes.forEach(e => {
      const id = CryptoJS.AES.decrypt(
        decodeURIComponent(e.id),
        "path"
      ).toString(CryptoJS.enc.Utf8);
      dispatch(deletePerson(user, id));
    });
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

  const handleShowAll = () => {
    const actTags = tags.filter(tag => tag.active);
    actTags.forEach(tag => {
      dispatch(changeTagActivity(tag));
    });
  };

  return (
    <div className={classes.table}>
      <Notification
        close={() => {
          dispatch(closeNotifAction);
        }}
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
            allNumber={persons.size}
            findCountString="timelinePersonTags"
          />
        </Grid>
        <Grid item md={9} lg={10}>
          <MUIDataTable
            title={t("persons.your_persons")}
            data={persons.toJS()}
            columns={columns(t)}
            options={tableOptions(onDelete, loadings.get("main"))}
          />
        </Grid>
      </Grid>
      <Fab
        variant="extended"
        color="primary"
        disabled={loadings.get("post")}
        className={classes.addBtn}
        onClick={() => dispatch(postPerson(user, history))}
      >
        {loadings.get("post") ? (
          <CircularProgress />
        ) : (
          `${t("persons.btn_new_persons")}`
        )}
      </Fab>
    </div>
  );
};

export default Persons;
