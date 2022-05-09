import React, { useEffect, useState } from "react";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { getId } from "@api/constants";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import Notification from "@components/Notification/Notification";
import { reducer } from "./constants";
import { useAuth0, User } from "@auth0/auth0-react";
import {
  closeNotifAction,
  getGroupDropDown,
  putDocument,
  showDocument
} from "./reducers/documentActions";
import Loader from "@components/Loading/LongLoader";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./document-jss";

import Typography from "@material-ui/core/Typography";

import DocumentForm from "@components/Document/DocumentForm";
import UploadForm from "@components/Document/UploadForm";

const Document = () => {
  const dispatch = useAppDispatch();
  const messageNotif = useAppSelector(state => state[reducer].get("message"));
  const loadings = useAppSelector(state => state[reducer].get("loadings"));
  const doc = useAppSelector(state => state[reducer].get("document"));

  const history = useHistory();
  const id = getId(history) as string;
  const user = useAuth0().user as User;
  const classes = useStyles();

  const [file, setFile] = useState<any | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(showDocument(user, id));
    dispatch(getGroupDropDown(user));
  }, []);

  const handleFileChange = _files => {
    if (_files) {
      setFile(_files[0]);
    } else {
      setFile(null);
    }
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

  const onSave = () => {
    dispatch(putDocument(user, id, doc.toJS(), file, history));
  };

  return (
    <>
      <Notification
        close={() => {
          dispatch(closeNotifAction);
        }}
        message={messageNotif}
      />
      <Grid container spacing={2}>
        <Grid item lg={6} md={12}>
          <Paper className={classes.profilePaper}>
            <Typography variant="h5" component="h3">
              {t("document.form_header")}
            </Typography>
            <DocumentForm />
          </Paper>
        </Grid>
        <Grid item lg={6} md={12}>
          <Paper className={classes.profilePaper}>
            <UploadForm file={file} handleFileChange={handleFileChange} />
          </Paper>
        </Grid>
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
};

export default Document;
