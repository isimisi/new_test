import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@hooks/redux";

import { useAuth0, User } from "@auth0/auth0-react";
import { reducer } from "./constants";
import { getCompany, toggleMonitor } from "./reducers/lookupActions";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Loader from "@components/Loading/LongLoader";
import { SelectOptions } from "@customTypes/data";

import Divider from "@material-ui/core/Divider";

import { getCountry } from "@helpers/countryOptions";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@components/Tabs/TabPanel";
import Acconting from "@components/Lookup/Acconting";

import Directors from "@components/Lookup/Directors";
import Owners from "@components/Lookup/Owners";

import Timeline from "@components/Lookup/Timeline";
import MasterData from "@components/Lookup/MasterData";
import Hidden from "@material-ui/core/Hidden";

import { Helmet } from "react-helmet";
import Button from "@material-ui/core/Button";
import { postWorkspace } from "../Workspaces/reducers/workspaceActions";
import brand from "@api/ui/brand";

function Person() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const user = useAuth0().user as User;
  const history = useHistory();
  const theme = useTheme();
  const cvr = history.location.pathname.split("/").pop();

  const company = useAppSelector((state) =>
    state[reducer].get("company")
  ).toJS();

  const title = brand.name + " - " + company.name;

  const loading = useAppSelector((state) => state[reducer].get("loading"));
  const monitorLoading = useAppSelector((state) =>
    state[reducer].get("monitorLoading")
  );

  const [years, setYears] = useState<SelectOptions[]>([
    { value: "2022", label: "2022" }
  ]);
  const handleYears = (y) => setYears(y);
  const [year, setYear] = useState({ value: "2022", label: "2022" });
  const handleYear = (v) => setYear(v);

  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (e, v) => {
    setActiveTab(v);
  };

  useEffect(() => {
    if (cvr) {
      dispatch(getCompany(user, cvr, handleYears, handleYear));
    }
  }, []);

  const handleBookmark = () => {
    dispatch(toggleMonitor(user, company.id));
  };

  const createWorkspace = () => {
    if (cvr) {
      const _cvr =
        cvr.includes("DK") && cvr.length < 12 ? cvr.substring(2) : cvr;
      dispatch(
        postWorkspace(
          user,
          history,
          company.name,
          undefined,
          "Corporate",
          undefined,
          undefined,
          _cvr
        )
      );
    }
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: theme.palette.background.default,
          position: "absolute",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Loader bigFont />
      </div>
    );
  }

  if (
    company &&
    Object.keys(company).length === 0 &&
    Object.getPrototypeOf(company) === Object.prototype
  ) {
    return <div />;
  }

  const country = getCountry(company);

  return (
    <div style={{ display: "flex" }}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={title} />
      </Helmet>
      <Grid container spacing={1} style={{ padding: 10 }}>
        <Grid item lg={8} md={12}>
          <div>
            <div style={{ display: "flex" }}>
              <Typography variant="h3" color="textPrimary">
                {company.name}
                {" "}
              </Typography>
              {/* <Tooltip arrow title={`${t("lookup.bookmark")}`} placement="top">
                {monitorLoading ? (
                  <CircularProgress />
                ) : (
                  <IconButton style={{ bottom: 10 }} onClick={handleBookmark}>
                    {company.monitoring ? (
                      <BookmarkIcon fontSize="large" color="primary" />
                    ) : (
                      <BookmarkBorderIcon fontSize="large" color="primary" />
                    )}
                  </IconButton>
                )}
              </Tooltip> */}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <Typography variant="h6" color="textSecondary">
                {company.id}
                {" "}
              </Typography>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-between"
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleChangeTab}
              aria-label="basic tabs example"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="on"
            >
              <Tab label={t("lookup.accounting")} value={0} />

              <Tab
                label={t("lookup.timeline")}
                value={2}
                disabled={company.country !== "DK"}
              />
              <Tab label={t("lookup.directors")} value={3} />
              <Tab label={t("lookup.owners")} value={4} />
            </Tabs>
            <Button
              variant="contained"
              color="primary"
              onClick={createWorkspace}
            >
              {t("lookup.start_a_workspace")}
            </Button>
          </div>
          <TabPanel value={activeTab} index={0}>
            <Acconting
              data={company}
              years={years}
              year={year}
              handleYear={handleYear}
            />
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Timeline data={company.timeline} />
          </TabPanel>
          <TabPanel value={activeTab} index={3}>
            <Directors data={company.participants} />
          </TabPanel>
          <TabPanel value={activeTab} index={4}>
            <Owners data={company} />
          </TabPanel>
        </Grid>
        {/* @ts-ignore - No implicit children can be removed when material ui is upgraded */}

        <Hidden mdDown>
          <Divider
            orientation="vertical"
            style={{ marginLeft: 20, marginRight: 20 }}
          />
        </Hidden>
        <MasterData company={company} country={country} />
      </Grid>
    </div>
  );
}

export default Person;
