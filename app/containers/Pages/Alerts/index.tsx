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
import { Grid } from "@material-ui/core";
import TagList from "@components/Tags/TagList";
import { Tag, WhereInApp } from "@customTypes/data";
import {
  changeTagActivity,
  deleteTag,
  getTags,
  postTag,
  updateTag
} from "@components/Tags/reducers/tagsActions";
import useStyles from "./alert-jss";
import { columns, reducer } from "./constants";
import {
  getAlerts,
  postAlert,
  deleteAlert,
  closeNotifAction
} from "./reducers/alertActions";
import { useAuth0, User } from "@auth0/auth0-react";
import { getPlanId } from "@helpers/userInfo";

const Alerts = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const alerts = useAppSelector(state => state[reducer].get("alerts")).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get("message"));
  const tags = useAppSelector(state => state.tags.get("tags")).toJS();
  const history = useHistory();
  const user = useAuth0().user as User;
  const plan_id = getPlanId(user);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAlerts(user));
    dispatch(getTags(user, WhereInApp.alert));

    if (plan_id === 1) {
      history.push("/app/plan");
    }
  }, [user]);

  const onDelete = ({ data }) => {
    const deletedNodes = data.map(v => ({
      id: alerts[v.index][3],
      title: alerts[v.index][0]
    }));
    deletedNodes.forEach(e => {
      const id = CryptoJS.AES.decrypt(
        decodeURIComponent(e.id),
        "path"
      ).toString(CryptoJS.enc.Utf8);
      dispatch(deleteAlert(user, id, e.title));
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
            allNumber={alerts.length}
            findCountString="alertTags"
          />
        </Grid>
        <Grid item md={9} lg={10}>
          <MUIDataTable
            title={t("alerts.your_red_flags")}
            data={alerts}
            columns={columns(t)}
            options={tableOptions(onDelete, false)}
          />
        </Grid>
      </Grid>
      <Fab
        variant="extended"
        color="primary"
        className={classes.addBtn}
        onClick={() => dispatch(postAlert(user, history))}
      >
        {`${t("alerts.btn_new_red_flag")}`}
      </Fab>
    </div>
  );
};

export default Alerts;
