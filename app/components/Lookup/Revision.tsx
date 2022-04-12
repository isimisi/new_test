import NoContent from "@components/NoContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import InfoPaper from "./InfoPaper";
import useStyles from "./lookup.jss";

interface Props {
  data: any;
}

const Revision = (props: Props) => {
  const { data } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const auditor = data.participants.find(p => p.role === "AUDITOR" && !p.to);
  return (
    <div className={classes.lookupContainer}>
      <div className={classes.leadershipContainer}>
        <Typography variant="subtitle1" className={classes.leadershipSubtitle}>
          {t("lookup.accounting_period")}
        </Typography>
        {data.Regnskabsperiode.length > 0 ? (
          <InfoPaper
            header={t("lookup.accounting_period")}
            body={data.Regnskabsperiode}
          />
        ) : (
          <NoContent text={t("lookup.no_revision_period")} />
        )}
      </div>
      <div className={classes.leadershipContainer}>
        <Typography variant="subtitle1" className={classes.leadershipSubtitle}>
          {t("lookup.accontant")}
        </Typography>

        {auditor ? (
          <InfoPaper
            header={t("lookup.accontant")}
            body={auditor.participant.name}
          />
        ) : (
          <NoContent text={t("lookup.no_revision")} />
        )}
      </div>
    </div>
  );
};

export default Revision;
