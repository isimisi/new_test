/* eslint-disable camelcase */
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import dummy from '@api/dummy/dummyContents';
import { loadFromLocalStorage } from '@api/localStorage/localStorage';
import styles from './sidebar-jss';
import SidebarContent from './SidebarContent';

function Sidebar(props) {
  const [status, setStatus] = useState(dummy.user.status);
  const [anchorEl, setAnchorEl] = useState(null);
  const [turnDarker, setTurnDarker] = useState(false);
  const {
    first_name, last_name
  } = loadFromLocalStorage();
  const name = `${first_name} ${last_name}`;


  let flagDarker = false;

  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = (scroll > 30);
    if (flagDarker !== newFlagDarker) {
      setTurnDarker(newFlagDarker);
      flagDarker = newFlagDarker;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeStatus = st => {
    setStatus(st);
    handleClose();
  };

  const {
    classes,
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
          anchor={leftSidebar ? 'left' : 'right'}
        >
          <div className={classes.swipeDrawerPaper}>
            <SidebarContent
              drawerPaper
              leftSidebar={leftSidebar}
              toggleDrawerOpen={toggleDrawerOpen}
              loadTransition={loadTransition}
              dataMenu={dataMenu}
              status={status}
              anchorEl={anchorEl}
              openMenuStatus={handleOpen}
              closeMenuStatus={handleClose}
              changeStatus={handleChangeStatus}
              name={name}
            />
          </div>
        </SwipeableDrawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          variant="permanent"
          onClose={toggleDrawerOpen}
          className={open ? classes.drawer : ''}
          classes={{
            paper: classNames(classes.drawer, classes.drawerPaper, !open ? classes.drawerPaperClose : ''),
          }}
          open={open}
          anchor={leftSidebar ? 'left' : 'right'}
        >
          <SidebarContent
            drawerPaper={open}
            leftSidebar={leftSidebar}
            turnDarker={turnDarker}
            loadTransition={loadTransition}
            dataMenu={dataMenu}
            status={status}
            anchorEl={anchorEl}
            openMenuStatus={handleOpen}
            closeMenuStatus={handleClose}
            changeStatus={handleChangeStatus}
            name={name}
          />
        </Drawer>
      </Hidden>
    </Fragment>
  );
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  leftSidebar: PropTypes.bool,
  dataMenu: PropTypes.array.isRequired,
};

Sidebar.defaultProps = {
  leftSidebar: true
};

export default withStyles(styles)(Sidebar);
