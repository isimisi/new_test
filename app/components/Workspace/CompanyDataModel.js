/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable indent */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MuiTableCell from "@material-ui/core/TableCell";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InfoIcon from "@material-ui/icons/Info";
import Select from "react-select";
import { selectStyles } from "@api/ui/helper";
import css from "@styles/Form.scss";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import styles from "./workspace-jss";
import FloatingPanel from "../Panel/FloatingPanel";
import moment from "moment";
import "moment/locale/da";

const TableCell = withStyles({
  root: {
    borderBottom: "thin solid #eeeeee",
    padding: 10,
  },
})(MuiTableCell);

const tabs = ["Virksomhedsdata", "Regnskab"];

function CompanyDataModel(props) {
  const { open, close, companyData } = props;

  const { t } = useTranslation();
  const branch = "";
  const [value, setValue] = React.useState(0);
  const years = companyData
    ? Object.keys(companyData?.Regnskab?.Resultat).map((x) => ({
        value: x,
        label: x,
      }))
    : [{ value: 2022, label: 2022 }];
  const [year, setYear] = React.useState(years[years.length - 1]);
  const handleYear = (v) => setYear(v);
  const [activeChip, setActiveChip] = React.useState(t("workspace.companyData.result"));
  const handleActiveChip = (v) => setActiveChip(v);
  const chips = {
    [t("workspace.companyData.result")]: "Resultat",
    [t("workspace.companyData.balance")]: "Balance",
    [t("workspace.companyData.keyFigures")]: "Nøgletal",
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data =
    value === 0
      ? companyData[tabs[value]]
      : companyData[tabs[value]][chips[activeChip]][year.value];

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        closeForm={close}
        title={"Selskabsdata for " + companyData.navn}
        extraSize
        expanded
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          centered
          textColor="primary"
        >
          <Tab icon={<InfoIcon />} label="Generelt" />
          <Tab icon={<TrendingUpIcon />} label="Regnskab" />
        </Tabs>
        {value === 1 ? (
          <Grid container spacing={3} style={{ margin: 10, marginBottom: 0 }}>
            <Grid item xs={3}>
              <Select
                styles={selectStyles()}
                inputId="react-select-single-workspace"
                TextFieldProps={{
                  label: t("workspaces.workspace-form.select_group"),
                  InputLabelProps: {
                    htmlFor: "react-select-single-workspace",
                    shrink: true,
                  },
                  placeholder: t("workspaces.workspace-form.select_group"),
                }}
                placeholder={t("workspaces.workspace-form.select_group")}
                options={years}
                value={year}
                onChange={handleYear}
              />
            </Grid>
            <Grid
              item
              xs={5}
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                display: "flex",
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
        ) : null}
        <div style={{ maxHeight: 400, overflow: "auto" }}>
          <TableContainer component={Paper} style={{ padding: 14, paddingTop: 0 }}>
            <Table>
              <TableBody>
                {data && Object.keys(data).length > 0 ? (
                  Object.keys(data).map(
                    (key) =>
                      data[key] && (
                        <TableRow key={key} hover>
                          <TableCell
                            component="th"
                            scope="row"
                            variant="head"
                            width="25%"
                          >
                            {key}
                          </TableCell>
                          <TableCell align="right">{data[key]}</TableCell>
                        </TableRow>
                      )
                  )
                ) : (
                  <Typography style={{ textAlign: "center" }}>
                    Vi kunne ikke finde noget data vedrørende {activeChip} på{" "}
                    {companyData.navn} i {year.value}
                  </Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={css.buttonArea}>
          {companyData.Virksomhedsdata &&
            ["DK", "GB"].includes(companyData.Virksomhedsdata.Land) && (
              <Button
                variant="text"
                color="primary"
                type="button"
                target="_blank"
                href={
                  companyData.Virksomhedsdata.Land === "DK"
                    ? `https://datacvr.virk.dk/data/visenhed?enhedstype=virksomhed&id=${
                        companyData?.Virksomhedsdata["CVR-nummer"]
                      }`
                    : `https://find-and-update.company-information.service.gov.uk/company/${companyData?.Virksomhedsdata[
                        "CVR-nummer"
                      ].substring(2)}/persons-with-significant-control`
                }
              >
                Åben i enhedsvisning for {companyData.navn} direkte i{" "}
                {companyData.Virksomhedsdata.Land === "DK" ? "CVR" : "Companies House"}
              </Button>
            )}
        </div>
      </FloatingPanel>
    </div>
  );
}

CompanyDataModel.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  companyData: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompanyDataModel);
