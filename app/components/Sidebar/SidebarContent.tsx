import React from 'react';
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
import { loadFromLocalStorage } from '@utils/localStorage';
import MainMenu from './MainMenu';
import useStyle from './sidebar-jss';

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

interface Props {
  drawerPaper: boolean;
  turnDarker: boolean;
  toggleDrawerOpen: () => void;
  loadTransition: () => void;
  leftSidebar: boolean;
  dataMenu: [any];
}

function SidebarContent(props: Props) {
  const { status } = loadFromLocalStorage();
  const classes = useStyle();

  const {
    turnDarker,
    drawerPaper,
    toggleDrawerOpen,
    loadTransition,
    leftSidebar,
    dataMenu,
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
        <MainMenu
          loadTransition={loadTransition}
          dataMenu={dataMenu}
          toggleDrawerOpen={toggleDrawerOpen}
        />
        {status === 'need_confirmation' && (
          <div className={classes.confirmEmail}>
            <Typography variant="subtitle2">Opsætning af konto</Typography>
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


SidebarContent.defaultProps = {
  turnDarker: false,
  toggleDrawerOpen: () => {},
  loadTransition: () => {},
};

export default SidebarContent;
