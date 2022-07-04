/* eslint-disable indent */
/* eslint-disable react/jsx-indent-props */
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import CounterWidget from "@components/Counter/CounterWidget";
import { Doughnut, Bar } from "react-chartjs-2";

import useStyles from "./lookup.jss";
import { useTheme } from "@material-ui/core/styles";
import Select from "react-select";
import { selectStyles } from "@api/ui/helper";
import { SelectOptions } from "@customTypes/data";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import {
  currencyFormatter,
  genericFormatter
} from "@helpers/numbers/Formatters";
import Tooltip from "@material-ui/core/Tooltip";
import NoContent from "@components/NoContent";

interface Props {
  data: any;
  years: SelectOptions[];
  year: SelectOptions;
  handleYear: (val: SelectOptions) => void;
}

const chartColorsGood = ["#73CFA8", "#F2FBF7"];

const chartColorsMedium = ["#FFDC79", "#FCF5DE"];

const chartColorsBad = ["#FF8DA0", "#FFF6F7"];

const agGetColor = value => {
  if (value >= 6) {
    return chartColorsGood;
  }
  if (value < 6 && value > 0) {
    return chartColorsMedium;
  }
  return chartColorsBad;
};

const sgGetColor = value => {
  if (value >= 10) {
    return chartColorsGood;
  }
  if (value < 10 && value > 0) {
    return chartColorsMedium;
  }
  return chartColorsBad;
};

const lgGetColor = value => {
  if (value >= 100) {
    return chartColorsGood;
  }
  if (value < 100 && value > 50) {
    return chartColorsMedium;
  }
  return chartColorsBad;
};

const options = {
  plugins: {
    tooltip: {
      enabled: false
    }
  }
};

const Accounting = (props: Props) => {
  const { data, years, year, handleYear } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  const [currFinancials, setCurrFinancials] = useState<any>(null);
  const [AG, setAG] = useState(0);
  const [SG, setSG] = useState(0);
  const [LG, setLG] = useState(0);

  const [tooltTipValue, setTooltTipValue] = useState("");

  const chartDataAG = {
    datasets: [
      {
        backgroundColor: agGetColor(AG),
        data: [AG > 0 ? AG : 0, AG > 15 ? 0 : 15 - AG]
      }
    ]
  };

  const chartDataSG = {
    datasets: [
      {
        backgroundColor: sgGetColor(SG),
        data: [SG > 0 ? SG : 0, SG > 40 ? 0 : 40 - SG]
      }
    ]
  };

  const chartDataLG = {
    datasets: [
      {
        backgroundColor: lgGetColor(LG),
        data: [LG > 0 ? LG : 0, LG > 200 ? 0 : 200 - LG]
      }
    ]
  };

  const accountingOptions = {
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false,
        intersect: false,

        external: context => {
          const yearVal = context.tooltip.title[0];
          const val = context.tooltip.body[0].lines[0];

          setTooltTipValue(
            `${yearVal}: ${currencyFormatter(
              Number(val.split(",").join("")) * 1000,
              currFinancials.currency,
              t("numberformat")
            )}`
          );
        }
      }
    }
  };

  useEffect(() => {
    if (data.primaryFinancials) {
      const financials = data.primaryFinancials["year" + year.value];

      setCurrFinancials(financials);
      if (financials) {
        if (financials.income.ebit) {
          setAG((financials.income.ebit / financials.assets.assets) * 100);
        }

        setSG(
          (financials.equityAndLiabilities.equity / financials.assets.assets) *
            100
        );
        setLG(
          (financials.assets.currentAssets /
            financials.equityAndLiabilities.currentLiabilities) *
            100
        );
      }
    }
  }, [year]);

  if (!currFinancials) {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <NoContent
          text={t("lookup.index_no_financials", { name: data.name })}
        />
      </div>
    );
  }

  return (
    <Grid container spacing={2} className={classes.accountingContainer}>
      <Grid item xs={12}>
        <div style={{ width: "40%" }}>
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
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" className={classes.leadershipSubtitle}>
          {t("lookup.figures")}
        </Typography>
      </Grid>
      {AG ? (
        <Grid item md={4} xs={6}>
          <CounterWidget
            color="white"
            start={0}
            end={AG}
            formattingFn={val => genericFormatter(val, t("numberformat"))}
            duration={3}
            title={t("accounting.ag")}
            unitAfter={t("percent")}
          >
            <div style={{ width: 80, height: 80 }}>
              <Doughnut data={chartDataAG} options={options} />
            </div>
          </CounterWidget>
        </Grid>
      ) : null}
      <Grid item md={4} xs={6}>
        <CounterWidget
          color="white"
          start={0}
          end={SG}
          formattingFn={val => genericFormatter(val, t("numberformat"))}
          duration={3}
          unitAfter={t("percent")}
          title={t("accounting.sg")}
        >
          <div style={{ width: 80, height: 80 }}>
            <Doughnut data={chartDataSG} options={options} />
          </div>
        </CounterWidget>
      </Grid>
      <Grid item md={4} xs={6}>
        <CounterWidget
          color="white"
          start={0}
          end={LG}
          formattingFn={val => genericFormatter(val, t("numberformat"))}
          duration={3}
          unitAfter={t("percent")}
          title={t("accounting.lg")}
        >
          <div style={{ width: 80, height: 80 }}>
            <Doughnut data={chartDataLG} options={options} />
          </div>
        </CounterWidget>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" className={classes.leadershipSubtitle}>
          {t("lookup.profit_and_loss")}
        </Typography>
      </Grid>
      {Object.values(currFinancials.income).every(
        value => !value || value === "FinancialIncome"
      ) ? (
        <NoContent
          noLottie
          noMargin
          text={t("lookup.no_financial_income")}
          margin={8}
          textVariant="subtitle1"
        />
      ) : (
        Object.keys(currFinancials.income).map(key => {
          if (key === "__typename" || currFinancials.income[key] === null) {
            return null;
          }
          return (
            <Grid item xl={4} xs={6} key={key}>
              <CounterWidget
                color="white"
                start={0}
                end={currFinancials.income[key]}
                formattingFn={val =>
                  currencyFormatter(
                    val * 1000,
                    currFinancials.currency,
                    t("numberformat")
                  )
                }
                duration={1}
                title={t(`accounting.${key}`)}
              >
                <Tooltip arrow title={tooltTipValue} placement="top">
                  <div
                    style={{
                      width: 120,
                      height: 120
                    }}
                  >
                    <Bar
                      data={{
                        labels: years
                          .sort((a, b) => Number(a.value) - Number(b.value))
                          .map(v => v.value),
                        datasets: [
                          {
                            data: years
                              .sort((a, b) => Number(a.value) - Number(b.value))
                              .map(
                                v =>
                                  data.primaryFinancials["year" + v.value]
                                    .income[key]
                              ),
                            hoverBackgroundColor: ["#73B1FF"],
                            backgroundColor: ["#cee4ff"]
                          }
                        ]
                      }}
                      options={accountingOptions}
                    />
                  </div>
                </Tooltip>
              </CounterWidget>
            </Grid>
          );
        })
      )}

      <Grid item xs={12}>
        <Typography variant="subtitle1" className={classes.leadershipSubtitle}>
          {t("lookup.balance_sheet")}
        </Typography>
      </Grid>
      {Object.keys(currFinancials.assets).map(key => {
        if (key === "__typename" || currFinancials.assets[key] === null) {
          return null;
        }
        return (
          <Grid item xl={4} xs={6} key={key}>
            <CounterWidget
              color="white"
              start={0}
              end={currFinancials.assets[key]}
              formattingFn={val =>
                currencyFormatter(
                  val * 1000,
                  currFinancials.currency,
                  t("numberformat")
                )
              }
              duration={1}
              title={t(`accounting.${key}`)}
            >
              <Tooltip arrow title={tooltTipValue} placement="top">
                <div
                  style={{
                    width: 120,
                    height: 120
                  }}
                >
                  <Bar
                    data={{
                      labels: years
                        .sort((a, b) => Number(a.value) - Number(b.value))
                        .map(v => v.value),
                      datasets: [
                        {
                          data: years
                            .sort((a, b) => Number(a.value) - Number(b.value))
                            .map(
                              v =>
                                data.primaryFinancials["year" + v.value].assets[
                                  key
                                ]
                            ),
                          hoverBackgroundColor: ["#73B1FF"],
                          backgroundColor: ["#cee4ff"]
                        }
                      ]
                    }}
                    options={accountingOptions}
                  />
                </div>
              </Tooltip>
            </CounterWidget>
          </Grid>
        );
      })}
      {Object.keys(currFinancials.equityAndLiabilities).map(key => {
        if (
          key === "__typename" ||
          currFinancials.equityAndLiabilities[key] === null
        ) {
          return null;
        }
        return (
          <Grid item xl={4} xs={6} key={key}>
            <CounterWidget
              color="white"
              start={0}
              end={currFinancials.equityAndLiabilities[key]}
              formattingFn={val =>
                currencyFormatter(
                  val * 1000,
                  currFinancials.currency,
                  t("numberformat")
                )
              }
              duration={1}
              title={t(`accounting.${key}`)}
            >
              <Tooltip arrow title={tooltTipValue} placement="top">
                <div
                  style={{
                    width: 120,
                    height: 120
                  }}
                >
                  <Bar
                    data={{
                      labels: years
                        .sort((a, b) => Number(a.value) - Number(b.value))
                        .map(v => v.value),
                      datasets: [
                        {
                          data: years
                            .sort((a, b) => Number(a.value) - Number(b.value))
                            .map(
                              v =>
                                data.primaryFinancials["year" + v.value]
                                  .equityAndLiabilities[key]
                            ),
                          hoverBackgroundColor: ["#73B1FF"],
                          backgroundColor: ["#cee4ff"]
                        }
                      ]
                    }}
                    options={accountingOptions}
                  />
                </div>
              </Tooltip>
            </CounterWidget>
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Typography variant="subtitle1" className={classes.leadershipSubtitle}>
          {t("lookup.cash_flow")}
        </Typography>
      </Grid>
      {Object.values(currFinancials.cashFlows).every(
        value => !value || value === "FinancialCashFlows"
      ) ? (
        <NoContent
          noLottie
          noMargin
          margin={8}
          text={t("lookup.no_financial_cash_flow")}
          textVariant="subtitle1"
        />
      ) : (
        Object.keys(currFinancials.cashFlows).map(key => {
          if (key === "__typename" || currFinancials.cashFlows[key] === null) {
            return null;
          }
          return (
            <Grid item xl={4} xs={6} key={key}>
              <CounterWidget
                color="white"
                start={0}
                end={currFinancials.cashFlows[key]}
                formattingFn={val =>
                  currencyFormatter(
                    val * 1000,
                    currFinancials.currency,
                    "da-DK"
                  )
                }
                duration={1}
                title={t(`accounting.${key}`)}
              >
                <Tooltip arrow title={tooltTipValue} placement="top">
                  <div
                    style={{
                      width: 120,
                      height: 120
                    }}
                  >
                    <Bar
                      data={{
                        labels: years
                          .sort((a, b) => Number(a.value) - Number(b.value))
                          .map(v => v.value),
                        datasets: [
                          {
                            data: years
                              .sort((a, b) => Number(a.value) - Number(b.value))
                              .map(
                                v =>
                                  data.primaryFinancials["year" + v.value]
                                    .cashFlows[key]
                              ),
                            hoverBackgroundColor: ["#73B1FF"],
                            backgroundColor: ["#cee4ff"]
                          }
                        ]
                      }}
                      options={accountingOptions}
                    />
                  </div>
                </Tooltip>
              </CounterWidget>
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

export default Accounting;
