import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@hooks/redux";

import { useAuth0, User } from "@auth0/auth0-react";
import { reducer } from "./constants";
import { getCompany } from "./reducers/lookupActions";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Loader from "@components/Loading/LongLoader";
import { SelectOptions } from "@customTypes/data";

import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { getCountry } from "@helpers/countryOptions";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@components/Tabs/TabPanel";
import Acconting from "@components/Lookup/Acconting";
import Diagram from "@components/Lookup/Diagram";
import Directors from "@components/Lookup/Directors";
import Owners from "@components/Lookup/Owners";
import Revision from "@components/Lookup/Revision";
import Timeline from "@components/Lookup/Timeline";
import MasterData from "@components/Lookup/MasterData";
import Hidden from "@material-ui/core/Hidden";

const Person = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAuth0().user as User;
  const history = useHistory();
  const theme = useTheme();
  const cvr = history.location.pathname.split("/").pop();

  const company = useAppSelector(state => state[reducer].get("company")).toJS();
  console.log(company);
  const loading = useAppSelector(state => state[reducer].get("loading"));

  const [years, setYears] = useState<SelectOptions[]>([
    { value: "2022", label: "2022" }
  ]);
  const handleYears = y => setYears(y);
  const [year, setYear] = useState({ value: "2022", label: "2022" });
  const handleYear = v => setYear(v);

  const [bookMarked, setBookMarked] = useState(false);
  const handleBookmark = () => setBookMarked(prevVal => !prevVal);

  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (e, v) => {
    console.log(v);
    setActiveTab(v);
  };

  useEffect(() => {
    if (cvr) {
      dispatch(getCompany(user, cvr, handleYears, handleYear));
    }
  }, []);

  if (loading) {
    return (
      <>
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
      </>
    );
  }

  if (
    company &&
    Object.keys(company).length === 0 &&
    Object.getPrototypeOf(company) === Object.prototype
  ) {
    return <div />;
  }

  const country = getCountry(company.country);

  return (
    <div style={{ display: "flex" }}>
      <Grid container spacing={1} style={{ padding: 10 }}>
        <Grid item lg={8} md={12}>
          <div>
            <div style={{ display: "flex" }}>
              <Typography variant="h3" color="textPrimary">
                {company.name}
                {" "}
              </Typography>
              <Tooltip arrow title={`${t("lookup.bookmark")}`} placement="top">
                <IconButton style={{ bottom: 10 }} onClick={handleBookmark}>
                  {bookMarked ? (
                    <BookmarkIcon fontSize="large" color="primary" />
                  ) : (
                    <BookmarkBorderIcon fontSize="large" color="primary" />
                  )}
                </IconButton>
              </Tooltip>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <Typography variant="h6" color="textSecondary">
                {company.id.slice(2)}
                {" "}
              </Typography>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 20 }}>
            <Tabs
              value={activeTab}
              onChange={handleChangeTab}
              aria-label="basic tabs example"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="on"
            >
              <Tab label={t("lookup.accounting")} value={0} />
              <Tab label={t("lookup.diagram")} value={1} />
              <Tab label={t("lookup.timeline")} value={2} />
              <Tab label={t("lookup.directors")} value={3} />
              <Tab label={t("lookup.owners")} value={4} />
              <Tab label={t("lookup.revision")} value={5} />
            </Tabs>
          </div>
          <TabPanel value={activeTab} index={0}>
            <Acconting
              data={company}
              years={years}
              year={year}
              handleYear={handleYear}
            />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <Diagram data={company["CVR-nummer"]} user={user} />
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
          <TabPanel value={activeTab} index={5}>
            <Revision data={company} />
          </TabPanel>
        </Grid>
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
};

export default Person;
