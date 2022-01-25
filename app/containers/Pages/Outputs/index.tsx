/* eslint-disable camelcase */
import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { useHistory } from "react-router-dom";
import Notification from "@components/Notification/Notification";
import tableOptions from "@helpers/tableOptions";
import { useAuth0, User } from "@auth0/auth0-react";
import { getPlanId } from "@helpers/userInfo";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import {
  changeTagActivity,
  deleteTag,
  getTags,
  postTag,
  updateTag
} from "@components/Tags/reducers/tagsActions";
import Grid from "@material-ui/core/Grid";
import TagList from "@components/Tags/TagList";
import { Tag, WhereInApp } from "@customTypes/data";
import { useTranslation } from "react-i18next";
import { columns, reducer } from "./constants";
import useStyles from "./output-jss";
import {
  getOutput,
  postOutput,
  closeNotifAction,
  deleteOutput
} from "./reducers/outputActions";

const Outputs = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const outputs = useAppSelector(state => state[reducer].get("outputs")).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get("message"));
  const tags = useAppSelector(state => state.tags.get("tags")).toJS();
  const history = useHistory();
  const user = useAuth0().user as User;
  const plan_id = getPlanId(user);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getOutput(user));
    dispatch(getTags(user, WhereInApp.output));
    if (plan_id !== 4) {
      history.push("/app/plan");
    }
  }, [user]);

  const onDelete = ({ data }) => {
    const deletedOutput = data.map(v => ({
      id: outputs[v.index][3],
      title: outputs[v.index][0]
    }));
    deletedOutput.forEach(e => {
      dispatch(deleteOutput(user, e.id, e.title));
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
  const col = columns;
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
    const acTags = tags.filter(tag => tag.active);
    acTags.forEach(tag => {
      dispatch(changeTagActivity(tag));
    });
  };

  return (
    <div className={classes.table}>
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
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
            options={tableOptions(onDelete, false, handleFilterChanged)}
          />
        </Grid>
      </Grid>
      <Tooltip title="Nyt indhold">
        <Fab
          variant="extended"
          color="primary"
          className={classes.addBtn}
          onClick={() => dispatch(postOutput(user, history))}
        >
          {`${t("outputs.btn_create_new_output")}`}
        </Fab>
      </Tooltip>
    </div>
  );
};

export default Outputs;
