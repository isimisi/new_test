/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Fab from "@material-ui/core/Fab";
import { useHistory } from "react-router-dom";
import tableOptions from "@helpers/tableOptions";
import CryptoJS from "crypto-js";
import Notification from "@components/Notification/Notification";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import TagList from "@components/Tags/TagList";
import { WhereInApp } from "@customTypes/data";
import {
  deleteTag,
  postTag,
  updateTag,
  changeTagActivity,
  getTags
} from "@components/Tags/reducers/tagsActions";
import { columns, reducer } from "./constants";
import styles from "./conditions-jss";
import {
  closeNotifAction,
  getConditions,
  postCondition,
  deleteCondition
} from "./reducers/conditionActions";
import { useAuth0, User } from "@auth0/auth0-react";
import { getPlanId } from "@helpers/userInfo";
import { Tag } from "@customTypes/reducers/tags";

function Conditions(props) {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const conditions = useAppSelector(state =>
    state[reducer].get("conditions")
  ).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get("message"));
  const loading = useAppSelector(state => state[reducer].get("loading"));
  const history = useHistory();
  const tags = useAppSelector(state => state.tags.get("tags")).toJS();
  const user = useAuth0().user as User;
  const plan_id = getPlanId(user);
  const { t } = useTranslation();

  const col = columns(t);

  useEffect(() => {
    dispatch(getConditions(user));
    dispatch(getTags(user, WhereInApp.condition));

    if (plan_id === 1) {
      history.push("/app/plan");
    }
  }, [user]);

  const onDelete = ({ data }) => {
    const deletedNodes = data.map(v => ({
      id: conditions[v.dataIndex][3],
      title: conditions[v.dataIndex][0]
    }));
    deletedNodes.forEach(e => {
      const id = CryptoJS.AES.decrypt(
        decodeURIComponent(e.id),
        "path"
      ).toString(CryptoJS.enc.Utf8);
      dispatch(deleteCondition(user, id, e.title));
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

  const activeTags = tags
    .filter(tag => tag.active)
    .map(tag => `${tag.emoji ? tag.emoji : ""} ${tag.name}`);
  col[1].options.filterList = activeTags;

  const handleFilterChanged = (changedColumn, filterList) => {
    if (changedColumn === "Tags") {
      const deleted = activeTags.find(tag => !filterList[1].includes(tag));
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
            allNumber={conditions.length}
            findCountString="conditionTags"
          />
        </Grid>
        <Grid item md={9} lg={10}>
          <MUIDataTable
            title={t("conditions.your_conditions")}
            data={conditions}
            columns={col}
            options={tableOptions(onDelete, loading, handleFilterChanged)}
          />
        </Grid>
      </Grid>
      <Fab
        variant="extended"
        color="primary"
        className={classes.addBtn}
        onClick={() => dispatch(postCondition(user, history))}
      >
        {`${t("conditions.btn_new_condition")}`}
      </Fab>
    </div>
  );
}

Conditions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Conditions);
