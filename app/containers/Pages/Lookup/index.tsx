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
  CircularProgress,
  Grid,
  Hidden,
  Toolbar,
  Typography
} from "@material-ui/core";
import computer from "@lotties/racoon/computer.json";
import useStyles from "./lookup-jss";
import Notification from "@components/Notification/Notification";
import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";

import { useAuth0, User } from "@auth0/auth0-react";

import { metaTitle, reducer } from "./constants";
import { Helmet } from "react-helmet";
import SearchIcon from "@material-ui/icons/Search";
import ViewList from "@material-ui/icons/ViewList";
import GridOn from "@material-ui/icons/GridOn";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {
  getLookups,
  closeNotifAction,
  showNotifAction
} from "./reducers/lookupActions";
import { getCountry } from "@helpers/countryOptions";
import Loader from "@components/Loading/LongLoader";
import NoContent from "@components/NoContent";
import { getPlanId } from "@helpers/userInfo";
import brand from "@api/dummy/brand";

const title = brand.name + " - Lookup";
const description = brand.desc;

const Lookup = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const lookups = useAppSelector(state => state[reducer].get("lookups")).toJS();
  const loading = useAppSelector(state => state[reducer].get("loading"));
  const messageNotif = useAppSelector(state => state[reducer].get("message"));

  const history = useHistory();
  const user = useAuth0().user as User;
  const plan_id = getPlanId(user);

  const { t } = useTranslation();

  const [listView, setListView] = useState("grid");

  const handleChangeView = (e, val) => {
    setListView(val);
  };

  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(getLookups(user, e.target.value));
  };

  return (
    <div className={classes.container}>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
      />
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
            {loading ? (
              <CircularProgress />
            ) : search.length > 0 || lookups.length > 0 ? (
              <Typography variant="caption">
                {lookups.length}
                {' '}
                {t("groups.search-group.results")}
              </Typography>
            ) : null}
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
      {lookups.length === 0 && loading ? (
        <Loader />
      ) : search.length > 0 && lookups.length > 0 ? (
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
                      if (plan_id === 1 && item.country !== "DK") {
                        dispatch(
                          showNotifAction(t("lookup.free_plan_notif_index"))
                        );
                      } else {
                        history.push("/app/lookup/" + item.value);
                      }
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
      ) : lookups.length === 0 && search.length === 0 ? (
        <NoContent
          text={t("lookup.index_no_content_no_search")}
          animationData={computer}
        />
      ) : (
        <NoContent text={t("lookup.index_no_content", { search })} />
      )}
    </div>
  );
};

export default Lookup;
