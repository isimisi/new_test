import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import UserMenu from './UserMenu';
import SearchUi from '../Search/SearchUi';
import styles from './header-jss';

const elem = document.documentElement;

function Header(props) {
  const [open] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [turnDarker, setTurnDarker] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  // Initial header style
  let flagDarker = false;

  let flagTitle = false;

  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = (scroll > 30);
    const newFlagTitle = (scroll > 40);
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openFullScreen = () => {
    setFullScreen(true);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
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


  const {
    classes,
    toggleDrawerOpen,
    margin,
    position,
    openGuide,
    history
  } = props;

  const setMargin = (sidebarPosition) => {
    if (sidebarPosition === 'right-sidebar') {
      return classes.right;
    }
    if (sidebarPosition === 'left-sidebar-big') {
      return classes.leftBig;
    }
    return classes.left;
  };

  const deleteCache = () => {
    window.location.reload();
  };

  return (
    <AppBar
      className={
        classNames(
          classes.appBar,
          classes.floatingBar,
          margin && classes.appBarShift,
          setMargin(position),
          turnDarker && classes.darker,
          classes.solidBg
        )
      }
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
        <Hidden smDown>
          <div className={classes.headerProperties}>
            <div className={classNames(classes.headerAction)}>
              {fullScreen ? (
                <Tooltip title="Afslut fuldskærmsvisning" placement="bottom">
                  <IconButton className={classes.button} onClick={closeFullScreen}>
                    <i className="ion-ios-crop" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Fuldskærmsvisning" placement="bottom">
                  <IconButton className={classes.button} onClick={openFullScreen}>
                    <i className="ion-ios-crop" style={{ color: '#333' }} />
                  </IconButton>
                </Tooltip>
              )}
              {/* <Tooltip title="Turn Dark/Light" placement="bottom">
                <IconButton className={classes.button} onClick={() => turnMode(mode)}>
                  <i className="ion-ios-lightbulb-outline" />
                </IconButton>
              </Tooltip> */}

              <Tooltip title="Opdater" placement="bottom">
                <IconButton className={classes.button} onClick={deleteCache}>
                  <i className="ion-ios-refresh-outline" style={{ color: '#333' }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Guide" placement="bottom">
                <IconButton className={classes.button} onClick={openGuide}>
                  <i className="ion-ios-help-outline" style={{ color: '#333' }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </Hidden>
        <div className={classes.searchWrapper}>
          <div className={classNames(classes.wrapper, classes.light)}>
            <div className={classes.search}>
              <SearchIcon />
            </div>
            <SearchUi history={history} />
          </div>
        </div>
        <Hidden xsDown>
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
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
