import { Grid, Typography, Paper } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { t } from "i18next";
import React from "react";

interface Props {
  company: any;
  country: any;
}

const MasterData = ({ company, country }: Props) => {
  const theme = useTheme();

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
          {company.id.slice(2)}
        </Typography>
      </Paper>
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
      <Paper
        style={{
          marginTop: 15,
          padding: 20,

          alignItems: "center"
        }}
      >
        <Typography variant="h6">{t("lookup.drawing_rule")}</Typography>

        <Typography style={{ marginTop: 5 }} color="textSecondary">
          {company.primaryIndustry.name}
        </Typography>
        <Typography style={{ marginTop: 1 }} color="textSecondary">
          {company.primaryIndustry.id}
        </Typography>
      </Paper>
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
    </Grid>
  );
};

export default MasterData;
