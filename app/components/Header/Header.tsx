import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import classNames from "classnames";
import Hidden from "@mui/material/Hidden";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useTranslation } from "react-i18next";
import UserMenu from "./UserMenu";
import LanguageSelector from "../LanguageSelector";
import DashboardSelector from "./DashboardSelector";
import styles from "./header-jss";
import { closeFullScreen, openFullScreen } from "@helpers/fullScreen";
import { useAuth0 } from "@auth0/auth0-react";
import { UserMeta } from "@helpers/userInfo";

function Header(props) {
  const [open] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [turnDarker, setTurnDarker] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth0();
  const meta: UserMeta = user && user["https://juristic.io/meta"];
  const { intro } = meta.dbUser;

  // Initial header style
  let flagDarker = false;

  let flagTitle = false;

  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = scroll > 30;
    const newFlagTitle = scroll > 40;
    if (flagDarker !== newFlagDarker) {
      setTurnDarker(newFlagDarker);
      flagDarker = newFlagDarker;
    }
    if (flagTitle !== newFlagTitle) {
      setShowTitle(newFlagTitle);
      flagTitle = newFlagTitle;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const {
    classes,
    toggleDrawerOpen,
    margin,
    position,
    openGuide,
    history
  } = props;

  const setMargin = sidebarPosition => {
    if (sidebarPosition === "right-sidebar") {
      return classes.right;
    }
    if (sidebarPosition === "left-sidebar-big") {
      return classes.leftBig;
    }
    return classes.left;
  };

  const deleteCache = () => {
    window.location.reload();
  };

  return (
    <AppBar
      className={classNames(
        classes.appBar,
        classes.floatingBar,
        margin && classes.appBarShift,
        setMargin(position),
        turnDarker && classes.darker,
        classes.solidBg
      )}
    >
      <Toolbar disableGutters={!open}>
        <Fab
          size="small"
          className={classes.menuButton}
          aria-label="Menu"
          onClick={toggleDrawerOpen}
        >
          <MenuIcon className={classes.menuIcon} />
        </Fab>
        <Hidden mdDown>
          <div className={classes.headerProperties}>
            <div className={classNames(classes.headerAction)}>
              {fullScreen ? (
                <Tooltip
                  title={`${t("header.exit_full_screen")}`}
                  placement="bottom"
                >
                  <IconButton
                    className={classes.button}
                    onClick={() => closeFullScreen(setFullScreen)}
                    size="large">
                    <i className="ion-ios-crop" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip
                  title={`${t("header.full_screen")}`}
                  placement="bottom"
                >
                  <IconButton
                    className={classes.button}
                    onClick={() => openFullScreen(setFullScreen)}
                    size="large">
                    <i className="ion-ios-crop" style={{ color: "#333" }} />
                  </IconButton>
                </Tooltip>
              )}
              {/* <Tooltip title="Turn Dark/Light" placement="bottom">
                <IconButton className={classes.button} onClick={() => turnMode(mode)}>
                  <i className="ion-ios-lightbulb-outline" />
                </IconButton>
              </Tooltip> */}

              <Tooltip title={`${t("header.update")}`} placement="bottom">
                <IconButton className={classes.button} onClick={deleteCache} size="large">
                  <i
                    className="ion-ios-refresh-outline"
                    style={{ color: "#333" }}
                  />
                </IconButton>
              </Tooltip>

              <Tooltip title={`${t("header.guide")}`} placement="bottom">
                <IconButton className={classes.button} onClick={openGuide} size="large">
                  <i
                    className="ion-ios-help-outline"
                    style={{ color: "#333" }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </Hidden>
        {/* <div className={classes.searchWrapper}>
          <div className={classNames(classes.wrapper, classes.light)}>
            <div className={classes.search}>
              <SearchIcon />
            </div>
            <SearchUi history={history} />
          </div>
        </div> */}
        {intro ? <DashboardSelector /> : null}
        <LanguageSelector />
        <Hidden smDown>
          <span className={classes.separatorV} />
        </Hidden>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  margin: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
  openGuide: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
