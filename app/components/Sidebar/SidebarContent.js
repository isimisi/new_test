import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import brand from '@api/dummy/brand';
import logoBeta from '@images/logoBeta.svg';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { lightGreen } from '@api/palette/colorfull';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import { loadFromLocalStorage } from '@api/localStorage/localStorage';
import MainMenu from './MainMenu';
import styles from './sidebar-jss';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: lightGreen,
  },
}))(LinearProgress);


function SidebarContent(props) {
  const [transform, setTransform] = useState(0);

  const handleScroll = (event) => {
    const scroll = event.target.scrollTop;
    setTransform(scroll);
  };

  const {
    status
  } = loadFromLocalStorage();

  useEffect(() => {
    const mainContent = document.getElementById('sidebar');
    mainContent.addEventListener('scroll', handleScroll);
    return () => {
      mainContent.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const {
    classes,
    turnDarker,
    drawerPaper,
    toggleDrawerOpen,
    loadTransition,
    leftSidebar,
    dataMenu,
    name,

  } = props;


  return (
    <div className={classNames(classes.drawerInner, !drawerPaper ? classes.drawerPaperClose : '')}>
      <div className={classes.drawerHeader}>
        <NavLink to="/app" className={classNames(classes.brand, classes.brandBar, turnDarker && classes.darker)}>
          <img src={logoBeta} alt={brand.name} style={{ width: 120 }} />
        </NavLink>
      </div>
      <div
        id="sidebar"
        className={
          classNames(
            classes.menuContainer,
            leftSidebar && classes.rounded,
            classes.withProfile
          )
        }
      >
        <MainMenu loadTransition={loadTransition} dataMenu={dataMenu} toggleDrawerOpen={toggleDrawerOpen} />
        {status === 'need_confirmation' && (
          <div className={classes.confirmEmail}>
            <Typography variant="subheader">Opsætning af konto</Typography>
            <BorderLinearProgress value={50} variant="indeterminate" />
            <div className={classes.inlineWrap}>
              <CheckCircleOutlineOutlinedIcon style={{ color: 'green' }} />
              <Typography>Profil information</Typography>
            </div>
            <div className={classes.inlineWrap}>
              <RadioButtonUncheckedOutlinedIcon />
              <Typography>Bekræft din email</Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

SidebarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerPaper: PropTypes.bool.isRequired,
  turnDarker: PropTypes.bool,
  toggleDrawerOpen: PropTypes.func,
  loadTransition: PropTypes.func,
  leftSidebar: PropTypes.bool.isRequired,
  dataMenu: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

SidebarContent.defaultProps = {
  turnDarker: false,
  toggleDrawerOpen: () => {},
  loadTransition: () => {},
  anchorEl: null,
};

export default withStyles(styles)(SidebarContent);
