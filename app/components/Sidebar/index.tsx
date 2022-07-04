/* eslint-disable camelcase */
import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Hidden from "@mui/material/Hidden";
import Drawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import useStyle from "./sidebar-jss";
import SidebarContent from "./SidebarContent";

function Sidebar(props) {
  const classes = useStyle();
  const [turnDarker, setTurnDarker] = useState(false);

  let flagDarker = false;

  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = scroll > 30;
    if (flagDarker !== newFlagDarker) {
      setTurnDarker(newFlagDarker);
      flagDarker = newFlagDarker;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const {
    open,
    toggleDrawerOpen,
    loadTransition,
    leftSidebar,
    dataMenu
  } = props;

  return (
    <Fragment>
      <Hidden lgUp>
        <SwipeableDrawer
          onClose={toggleDrawerOpen}
          onOpen={toggleDrawerOpen}
          open={!open}
          anchor="left"
        >
          <div className={classes.swipeDrawerPaper}>
            <SidebarContent
              drawerPaper
              leftSidebar={leftSidebar}
              toggleDrawerOpen={toggleDrawerOpen}
              loadTransition={loadTransition}
              dataMenu={dataMenu}
            />
          </div>
        </SwipeableDrawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          variant="permanent"
          onClose={toggleDrawerOpen}
          className={open ? classes.drawer : ""}
          classes={{
            paper: classNames(
              classes.drawer,
              classes.drawerPaper,
              !open ? classes.drawerPaperClose : ""
            )
          }}
          open={open}
          anchor="left"
        >
          <SidebarContent
            drawerPaper={open}
            leftSidebar={leftSidebar}
            turnDarker={turnDarker}
            loadTransition={loadTransition}
            dataMenu={dataMenu}
          />
        </Drawer>
      </Hidden>
    </Fragment>
  );
}

Sidebar.propTypes = {
  toggleDrawerOpen: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  leftSidebar: PropTypes.bool,
  dataMenu: PropTypes.array.isRequired
};

Sidebar.defaultProps = {
  leftSidebar: true
};

export default Sidebar;
