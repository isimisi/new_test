import React from "react";

import { useTranslation } from "react-i18next";
import useStyles from "../workspace-jss";

import { loadFromLocalStorage } from "@api/localStorage/localStorage";
import logoBeta from "@images/logoBeta.svg";
import Typography from "@material-ui/core/Typography";

interface Props {
  signedBy: string;
  id: string;
}

function Signing({ signedBy, id }: Props) {
  const { t } = useTranslation();
  const { logo } = loadFromLocalStorage();
  const classes = useStyles();

  return (
    <>
      <a href="https://www.juristic.io/" className={classes.signedLogo}>
        <img className={classes.img} src={logo || logoBeta} alt="juristic" />
      </a>

      <div className={classes.signed}>
        <div className={classes.signedRow}>
          <div className={classes.signedCircle} />
          <Typography className={classes.signedText}>
            {t("workspaces.approved_and_locked_off")}
            {' '}
            {signedBy}
          </Typography>
        </div>
        <div className={classes.signedRow}>
          <Typography className={classes.signedId}>
            {t("workspaces.id")}
            {' '}
            {window.btoa(signedBy + id)}
          </Typography>
        </div>
      </div>
    </>
  );
}

export default Signing;
