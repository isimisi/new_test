import { Grid, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import React from "react";

interface Props {
  company: any;
  country: any;
}

const MasterData = ({ company, country }: Props) => {
  const theme = useTheme();
  const auditor = company.participants.find(p => p.role === "AUDITOR" && !p.to);
  return (
    <Grid item lg={3}>
      <Typography
        variant="subtitle1"
        style={{
          color: theme.palette.primary.main,
          fontWeight: "bold",
          fontSize: 18
        }}
      >
        {t("lookup.master_data")}
      </Typography>
      <Paper
        style={{
          marginTop: 15,
          padding: 20,
          display: "flex",
          alignItems: "center"
        }}
      >
        <img
          src={country.src}
          alt={country.alt}
          style={{
            height: 40,
            width: 60,
            marginRight: 30
          }}
        />
        <div>
          <Typography variant="h6">{company.name}</Typography>
          <Typography color="textSecondary">
            {`${company.address.addressLines.join(", ")}, ${
              company.address.city
            } ${company.address.postalCode}`}
          </Typography>
        </div>
      </Paper>
      <Paper
        style={{
          marginTop: 15,
          padding: 20,

          alignItems: "center"
        }}
      >
        <Typography variant="h6">{t("lookup.cvr")}</Typography>
        <Typography style={{ marginTop: 5 }} color="textSecondary">
          {company.id}
        </Typography>
      </Paper>
      {company.Selskabskapital && (
        <Paper
          style={{
            marginTop: 15,
            padding: 20,

            alignItems: "center"
          }}
        >
          <Typography variant="h6">{t("lookup.capital")}</Typography>
          <Typography style={{ marginTop: 5 }} color="textSecondary">
            {company.Selskabskapital}
          </Typography>
        </Paper>
      )}
      {company.altNames && (
        <Paper
          style={{
            marginTop: 15,
            padding: 20,

            alignItems: "center"
          }}
        >
          <Typography variant="h6">{t("lookup.names")}</Typography>
          {company.altNames.map((name, index) => (
            <Typography
              style={{ marginTop: index === 0 ? 5 : 1 }}
              color="textSecondary"
            >
              {name}
            </Typography>
          ))}
        </Paper>
      )}
      {company.Tegningsregel && (
        <Paper
          style={{
            marginTop: 15,
            padding: 20,

            alignItems: "center"
          }}
        >
          <Typography variant="h6">{t("lookup.drawing_rule")}</Typography>

          <Typography style={{ marginTop: 5 }} color="textSecondary">
            {company.Tegningsregel}
          </Typography>
        </Paper>
      )}
      {company.primaryIndustry.id && (
        <Paper
          style={{
            marginTop: 15,
            padding: 20,

            alignItems: "center"
          }}
        >
          <Typography variant="h6">{t("lookup.industry")}</Typography>

          <Typography style={{ marginTop: 5 }} color="textSecondary">
            {company.primaryIndustry.name}
          </Typography>
          <Typography style={{ marginTop: 1 }} color="textSecondary">
            {company.primaryIndustry.id}
          </Typography>
        </Paper>
      )}
      {company.description && (
        <Paper
          style={{
            marginTop: 15,
            padding: 20,

            alignItems: "center"
          }}
        >
          <Typography variant="h6">{t("lookup.purpose")}</Typography>
          <Typography color="textSecondary">{company.description}</Typography>
        </Paper>
      )}
      {company.Regnskabsperiode && (
        <Paper
          style={{
            marginTop: 15,
            padding: 20,

            alignItems: "center"
          }}
        >
          <Typography variant="h6">{t("lookup.accounting_period")}</Typography>
          <Typography color="textSecondary">
            {company.Regnskabsperiode}
          </Typography>
        </Paper>
      )}
      {auditor && (
        <Paper
          style={{
            marginTop: 15,
            padding: 20,

            alignItems: "center"
          }}
        >
          <Typography variant="h6">{t("lookup.accontant")}</Typography>
          <Typography color="textSecondary">
            {auditor.participant.name}
          </Typography>
        </Paper>
      )}
    </Grid>
  );
};

export default MasterData;
