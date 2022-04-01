import React from "react";
import Select from "react-select";
import { selectStyles } from "@api/ui/helper";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { useTranslation } from "react-i18next";

interface Props {
  years: number[];
  handleYear: (year: number) => void;
  year: number;
  activeChip: string;
  handleActiveChip: (chip: string) => void;
}

const AccountingTop = (props: Props) => {
  const { years, handleYear, year, activeChip, handleActiveChip } = props;
  const { t } = useTranslation();
  return (
    <Grid container spacing={3} style={{ margin: 10, marginBottom: 0 }}>
      <Grid item xs={3}>
        <Select
          styles={selectStyles()}
          inputId="react-select-single-workspace"
          options={years}
          value={year}
          menuPortalTarget={document.body}
          menuPlacement="auto"
          menuPosition="absolute"
          onChange={handleYear}
        />
      </Grid>
      <Grid
        item
        xs={5}
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex"
        }}
      >
        <Chip
          size="small"
          label={t("workspace.companyData.result")}
          clickable
          color="primary"
          variant={
            activeChip === t("workspace.companyData.result")
              ? "default"
              : "outlined"
          }
          onClick={() => {
            handleActiveChip(t("workspace.companyData.result"));
          }}
        />
        <Chip
          size="small"
          label={t("workspace.companyData.balance")}
          clickable
          color="primary"
          variant={
            activeChip === t("workspace.companyData.balance")
              ? "default"
              : "outlined"
          }
          onClick={() => {
            handleActiveChip(t("workspace.companyData.balance"));
          }}
        />
        <Chip
          size="small"
          label={t("workspace.companyData.keyFigures")}
          clickable
          color="primary"
          variant={
            activeChip === t("workspace.companyData.keyFigures")
              ? "default"
              : "outlined"
          }
          onClick={() => {
            handleActiveChip(t("workspace.companyData.keyFigures"));
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AccountingTop;
