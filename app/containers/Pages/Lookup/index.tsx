/* eslint-disable camelcase */
import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  ButtonBase,
  Card,
  CardContent,
  Grid,
  Hidden,
  Toolbar,
  Typography
} from "@material-ui/core";

import useStyles from "./lookup-jss";

import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";
import dk from "@images/countries/dk.svg";
import { useAuth0, User } from "@auth0/auth0-react";

import { metaTitle, reducer } from "./constants";
import { Helmet } from "react-helmet";
import SearchIcon from "@material-ui/icons/Search";
import ViewList from "@material-ui/icons/ViewList";
import GridOn from "@material-ui/icons/GridOn";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { getLookups } from "./reducers/lookupActions";
import { getCountry } from "@helpers/countryOptions";
import { useTheme } from "@material-ui/styles";
import { useSpring, useTransition, animated } from "react-spring";

const Lookup = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const lookups = useAppSelector(state => state[reducer].get("lookups")).toJS();

  const history = useHistory();
  const user = useAuth0().user as User;

  const { t } = useTranslation();

  const [listView, setListView] = useState("grid");

  const handleChangeView = (e, val) => {
    setListView(val);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getLookups(user, e.target.value));
  };

  return (
    <div className={classes.container}>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaTitle} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaTitle} />
        <meta property="twitter:title" content={metaTitle} />
        <meta property="twitter:description" content={metaTitle} />
      </Helmet>
      <div className={classes.searchContainer}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <div className={classes.flex}>
              <div className={classes.wrapper}>
                <div className={classes.search}>
                  <SearchIcon />
                </div>
                <input
                  className={classes.input}
                  placeholder={t("lookup.search_placeholder")}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <Typography variant="caption">
              2 &nbsp;
              {t("groups.search-group.results")}
            </Typography>
            <Hidden mdDown>
              <div className={classes.toggleContainer}>
                <ToggleButtonGroup
                  value={listView}
                  exclusive
                  onChange={handleChangeView}
                >
                  <ToggleButton value="grid" selected={listView === "grid"}>
                    <GridOn />
                  </ToggleButton>
                  <ToggleButton value="list" selected={listView === "list"}>
                    <ViewList />
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Hidden>
          </Toolbar>
        </AppBar>
      </div>
      <Grid
        container
        alignItems="flex-start"
        justify="flex-start"
        direction="row"
        spacing={3}
        style={{ gridAutoColumns: "1fr" }}
      >
        {lookups.map((item, index) => {
          const country = getCountry(item);
          return (
            <Grid
              item
              md={listView === "list" ? 12 : 4}
              sm={listView === "list" ? 12 : 6}
              xs={12}
              key={index.toString()}
            >
              <Card style={{ position: "relative" }}>
                <ButtonBase
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute"
                  }}
                  onClick={() => {
                    history.push("/app/lookup/" + item.value);
                  }}
                />
                <CardContent>
                  <div className={classes.itemIconContainer}>
                    {item.country ? <BusinessIcon /> : <PersonIcon />}
                    <img
                      src={country.src}
                      alt={country.alt}
                      style={{
                        height: 20,
                        width: 25,
                        marginRight: 10
                      }}
                    />
                  </div>
                  <Typography variant="h5" component="h2">
                    {item.label}
                  </Typography>
                  <Typography color="textSecondary">{item.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Lookup;
