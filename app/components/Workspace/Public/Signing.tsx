import React from "react";

import { useTranslation } from "react-i18next";
import styles from "../workspace-jss";
import { withStyles } from "@material-ui/core/styles";
import { loadFromLocalStorage } from "@api/localStorage/localStorage";
import logoBeta from "@images/logoBeta.svg";
import Typography from "@material-ui/core/Typography";

interface Props {
  classes: any;
  signedBy: string;
  id: string;
}

const Signing = ({ classes, signedBy, id }: Props) => {
  const { t } = useTranslation();
  const { logo } = loadFromLocalStorage();

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
};

export default withStyles(styles)(Signing);
