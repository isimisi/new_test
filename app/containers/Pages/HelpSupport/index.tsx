import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import brand from "@api/ui/brand";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Notification from "@components/Notification/Notification";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import styles from "./helpSupport-jss";
import Qna from "./Qna";
import ContactForm from "./ContactForm";
import {
  helpMe,
  closeNotifAction
} from "../Dashboard/reducers/dashboardActions";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  width: any;
  dashboard: any;
}

function Settings(props: Props) {
  const title = brand.name;
  const description = brand.desc;
  const { width } = props;
  const [valueForm, setValueForm] = useState([]);
  const dispatch = useAppDispatch();
  const messageNotif = useAppSelector(state => state.dashboard.get("message"));
  const { user } = useAuth0();

  const showResult = useCallback(
    values => {
      setValueForm(values);

      const name = values.get("name");
      const email = values.get("email");
      const message = values.get("message");
      if (user) {
        dispatch(helpMe(user, name, email, message));
      }
    },
    [valueForm]
  );

  return (
    <div>
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
      <Grid
        container
        spacing={2}
        direction={isWidthUp("md", width) ? "row" : "column-reverse"}
      >
        <Grid item md={6} xs={12}>
          <Qna />
        </Grid>
        <Grid item md={6} xs={12}>
          <ContactForm onSubmit={values => showResult(values)} />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(withWidth()(Settings));
