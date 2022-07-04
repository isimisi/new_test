import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import AppBar from "@mui/material/AppBar";
import { NavLink } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import classNames from "classnames";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import logo from "@images/logo.svg";
import brand from "@api/dummy/brand";
import Hidden from "@mui/material/Hidden";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarContent from "../Sidebar/SidebarContent";
import DropListMenu from "./DropListMenu";
import MegaMenu from "./MegaMenu";
import UserMenu from "./UserMenu";
import styles from "./header-jss";
import SearchUi from "../Search/SearchUi";
import { useAuth0 } from "@auth0/auth0-react";
const elem = document.documentElement;

function HeaderMenu(props) {
  const [fullScreen, setFullScreen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [fixed, setFixed] = useState(false);

  const user = useAuth0().user;
  const { logo: customLogo } = user["https://juristic.io/meta"].organization;

  // Initial menu ui
  let flagFixedMenu = false;

  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagFixedMenu = scroll > 64;
    if (flagFixedMenu !== newFlagFixedMenu) {
      setFixed(newFlagFixedMenu);
      flagFixedMenu = newFlagFixedMenu;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openFullScreen = () => {
    setFullScreen(true);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const closeFullScreen = () => {
    setFullScreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  const turnMode = (mode) => {
    if (mode === "light") {
      props.changeMode("dark");
    } else {
      props.changeMode("light");
    }
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    classes,
    type,
    dataMenu,
    history,
    openGuide,
    mode,
    toggleDrawerOpen,
    openMobileNav,
    loadTransition,
    isLogin,
    logoLink,
  } = props;

  return (
    <AppBar
      className={classNames(
        classes.appBar,
        classes.attachedbar,
        fixed ? classes.fixed : ""
      )}
    >
      <div className={classes.appMenu}>
        <Hidden lgUp>
          <IconButton
            className={classes.menuButton}
            aria-label="Menu"
            onClick={toggleDrawerOpen}
            size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <div className={classes.headerProperties}>
            <div className={classNames(classes.headerAction, classes.invert)}>
              {fullScreen ? (
                <Tooltip title="Exit Full Screen" placement="bottom">
                  <IconButton className={classes.button} onClick={closeFullScreen} size="large">
                    <i className="ion-ios-crop" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Fuldskærmsvisning" placement="bottom">
                  <IconButton className={classes.button} onClick={openFullScreen} size="large">
                    <i className="ion-ios-crop" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Turn Dark/Light" placement="bottom">
                <IconButton className={classes.button} onClick={() => turnMode(mode)} size="large">
                  <i className="ion-ios-lightbulb-outline" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Hjælp" placement="bottom">
                <IconButton className={classes.button} onClick={openGuide} size="large">
                  <i className="ion-ios-help-outline" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <NavLink to={logoLink} className={classes.brand}>
            <img src={customLogo || logo} alt={brand.name} />
          </NavLink>
        </Hidden>
        <div className={classes.searchHeaderMenu}>
          <div className={classNames(classes.wrapper, classes.dark)}>
            <div className={classes.search}>
              <SearchIcon />
            </div>
            <SearchUi history={history} />
          </div>
        </div>
        <Toolbar>
          <UserMenu dark />
        </Toolbar>
      </div>
      <Hidden lgDown>
        <Fragment>
          {type === "mega-menu" ? (
            <MegaMenu dataMenu={dataMenu} />
          ) : (
            <DropListMenu dataMenu={dataMenu} />
          )}
        </Fragment>
      </Hidden>
      <Hidden lgUp>
        <SwipeableDrawer
          onClose={toggleDrawerOpen}
          onOpen={toggleDrawerOpen}
          open={!openMobileNav}
          anchor="left"
        >
          <div className={classes.swipeDrawerPaper}>
            <SidebarContent
              drawerPaper
              leftSidebar
              toggleDrawerOpen={toggleDrawerOpen}
              loadTransition={loadTransition}
              dataMenu={dataMenu}
              anchorEl={anchorEl}
              openMenuStatus={handleOpen}
              closeMenuStatus={handleClose}
              isLogin={isLogin}
            />
          </div>
        </SwipeableDrawer>
      </Hidden>
    </AppBar>
  );
}

HeaderMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  dataMenu: PropTypes.array.isRequired,
  openMobileNav: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
  openGuide: PropTypes.func.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  logoLink: PropTypes.string,
  isLogin: PropTypes.bool,
};

HeaderMenu.defaultProps = {
  isLogin: true,
  logoLink: "/",
};

export default withStyles(styles)(HeaderMenu);
