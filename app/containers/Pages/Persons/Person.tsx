import React, { useEffect } from "react";
import Notification from "@components/Notification/Notification";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { getId } from "@api/constants";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@hooks/redux";

import { reducer } from "./constants";
import { useAuth0, User } from "@auth0/auth0-react";

import {
  changePerson,
  closeNotifAction,
  getGroupDropDown,
  putPerson,
  showPerson
} from "./reducers/personActions";
import Paper from "@material-ui/core/Paper";
import useStyles from "./person-jss";

import EditAvatar from "../Avatar";

import Loader from "@components/Loading/LongLoader";
import CircularProgress from "@material-ui/core/CircularProgress";
import PersonForm from "@components/Person/PersonForm";
import Typography from "@material-ui/core/Typography";

function Person() {
  const dispatch = useAppDispatch();
  const messageNotif = useAppSelector((state) => state[reducer].get("message"));
  const person = useAppSelector((state) => state[reducer].get("person"));
  const loadings = useAppSelector((state) => state[reducer].get("loadings"));

  const history = useHistory();
  const id = getId(history) as string;
  const classes = useStyles();
  const { t } = useTranslation();

  const user = useAuth0().user as User;

  useEffect(() => {
    dispatch(showPerson(user, id));
    dispatch(getGroupDropDown(user));
  }, []);

  const handleGetConfig = (_config: any) => {
    delete _config.id;
    dispatch(changePerson(JSON.stringify(_config), "person_icon"));
  };

  const onSave = () => {
    dispatch(putPerson(user, id, person.toJS(), history));
  };

  if (loadings.get("main")) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",

          position: "absolute",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Loader bigFont />
      </div>
    );
  }

  return (
    <>
      <Notification
        close={() => {
          dispatch(closeNotifAction);
        }}
        message={messageNotif}
      />

      <Grid container spacing={2}>
        <Paper className={classes.profilePaper}>
          <Typography variant="h5" component="h3">
            {t("person.form_header")}
          </Typography>
          <PersonForm />
        </Paper>
      </Grid>
      <Fab
        variant="extended"
        color="primary"
        disabled={loadings.get("post")}
        style={{
          position: "fixed",
          bottom: 30,
          right: 50,
          zIndex: 100
        }}
        onClick={onSave}
      >
        {loadings.get("post") ? <CircularProgress /> : `${t("save")}`}
      </Fab>
    </>
  );
}

export default Person;
