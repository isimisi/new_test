import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import InfoPaper from "./InfoPaper";
import useStyles from "./lookup.jss";

interface Props {
  data: any;
}

const Owners = (props: Props) => {
  const { data } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.lookupContainer}>
      <div className={classes.leadershipContainer}>
        <Typography variant="subtitle1" className={classes.leadershipSubtitle}>
          {t("lookup.legal_owners")}
        </Typography>
        {data.owners.length > 0 &&
          data.owners.map(x => (
            <InfoPaper
              header={x.owner.name}
              body={
                x.stakeFrom === 100
                  ? `${x.stakeFrom}%`
                  : `${x.stakeFrom}-${x.stakeTo}%`
              }
            />
          ))}
      </div>
      <div className={classes.leadershipContainer}>
        <Typography variant="subtitle1" className={classes.leadershipSubtitle}>
          {t("lookup.real_owners")}
        </Typography>

        {data.beneficialOwners.length > 0 &&
          data.beneficialOwners.map(x => (
            <InfoPaper header={x.name} body={x.ownership} />
          ))}
      </div>
    </div>
  );
};

export default Owners;
