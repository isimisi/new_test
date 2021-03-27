import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Scrollspy from 'react-scrollspy';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import logo from '@images/logo.svg';
import brand from '@api/dummy/brand';
import styles from '../Sidebar/sidebar-jss';

function SideNavMobile(props) {
  const { classes, menuList, closeDrawer } = props;

  const getMenus = useMemo(() => menuList.map((item, index) => (
    <ListItem
      key={index.toString()}
      button
      className={classes.headCapital}
      component={AnchorLink}
      href={item.url}
      onClick={closeDrawer}
    >
      <ListItemText classes={{ primary: classes.primary }} variant="inset" primary={item.name} />
    </ListItem>
  )), [menuList]);

  return (
    <div className={classes.drawerInnerMobile}>
      <div className={classes.drawerHeader}>
        <div className={classes.brandBig}>
          <img src={logo} alt={brand.name} />
        </div>
      </div>
      <div className={classNames(classes.menuContainer, classes.landingNav, classes.rounded)}>
        <List className={classes.dense} component="nav">
          <Scrollspy items={['feature', 'showcase', 'testimonials', 'tech', 'pricing', 'contact']} currentClassName={classes.active}>
            {getMenus}
          </Scrollspy>
        </List>
        <Typography variant="caption" className={classes.copyright}>
          &copy; 2021 juristic Designs
          <br />
            All Right Reserved
        </Typography>
      </div>
    </div>
  );
}

SideNavMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  menuList: PropTypes.array.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

export default withStyles(styles)(SideNavMobile);
