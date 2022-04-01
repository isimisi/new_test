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

import css from "@styles/Form.scss";
import Button from "@material-ui/core/Button";

import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import styles from "../workspace-jss";
import FloatingPanel from "../../Panel/FloatingPanel";
import AccountingTop from "./AccountingTop";
import Timeline from "./Timeline";

const TableCell = withStyles({
  root: {
    borderBottom: "thin solid #eeeeee",
    padding: 10,
  },
})(MuiTableCell);

const tabs = ["Virksomhedsdata", "Regnskab", "Tidslinje"];

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
  const accountingData =
    years.length > 0
      ? companyData[tabs[1]][chips[activeChip]][year.value]
      : companyData[tabs[1]][chips[activeChip]];
  const data = value === 0 ? companyData[tabs[value]] : accountingData;

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        closeForm={close}
        title={"Selskabsdata for " + companyData.navn}
        extraSize
        expanded
        width={800}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          centered
          textColor="primary"
        >
          <Tab icon={<InfoIcon />} label={t("workspace.company_data.general")} />
          <Tab
            icon={<TrendingUpIcon />}
            label={t("workspace.company_data.accounting")}
            disabled={Object.keys(accountingData).length === 0}
          />
          <Tab icon={<TrendingUpIcon />} label={t("workspace.company_data.timeline")} />
        </Tabs>
        {value === 1 && (
          <AccountingTop
            years={years}
            handleYear={handleYear}
            year={year}
            activeChip={activeChip}
            handleActiveChip={handleActiveChip}
          />
        )}
        <div style={{ maxHeight: "80vh", overflow: "auto" }}>
          {[0, 1].includes(value) ? (
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
          ) : (
            <Timeline companyData={companyData} />
          )}
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
                    ? `https://datacvr.virk.dk/enhed/virksomhed/${companyData?.Virksomhedsdata[
                        "CVR-nummer"
                      ].substring(2)}`
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
