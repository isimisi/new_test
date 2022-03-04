import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "@api/dummy/brand";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Notification from "@components/Notification/Notification";
import PublicWorkspace from "@components/Workspace/PublicWorkspace";
import LockForm from "@components/Forms/LockForm";
import styles from "@components/Forms/user-jss";
import { useSelector, useDispatch } from "react-redux";
import { getId, getIdFromEncrypted } from "@api/constants";
import { useHistory } from "react-router-dom";
import {
  closeNotifAction,
  accessPublicWorkspace,
  setPublicAccessFalse
} from "./reducers/workspaceActions";

function PublicFirewall(props) {
  const reducer = "workspace";

  const messageNotif = useSelector(state => state[reducer].get("message"));
  const publicAuthenticated = useSelector(state =>
    state[reducer].get("publicAuthenticated")
  );
  const label = useSelector(state => state[reducer].get("label"));
  const publicAuthenticatedId = useSelector(state =>
    state[reducer].get("publicAuthenticatedId")
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = history.location;
  const userId = getIdFromEncrypted(new URLSearchParams(search).get(
    "userId"
  ) as string);
  const firstName = new URLSearchParams(search).get("firstName");
  const lastName = new URLSearchParams(search).get("lastName");
  const workspaceId = getId(history);

  const submitForm = values => {
    const securityCode = values.get("securityCode");
    dispatch(
      accessPublicWorkspace(
        workspaceId as string,
        userId,
        firstName as string,
        lastName as string,
        securityCode
      )
    );
  };

  useEffect(() => {
    if (workspaceId !== publicAuthenticatedId) {
      dispatch(setPublicAccessFalse);
    }
  }, []);

  const title = brand.name + " - " + label;
  const description = brand.desc;
  const { classes } = props;
  return (
    <div className={classes.rootFull}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
      />
      {!publicAuthenticated ? (
        <div className={classes.container}>
          <div className={classes.userFormWrap}>
            <LockForm onSubmit={values => submitForm(values)} />
          </div>
        </div>
      ) : (
        <PublicWorkspace />
      )}
    </div>
  );
}

PublicFirewall.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PublicFirewall);
