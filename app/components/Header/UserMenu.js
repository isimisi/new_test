/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Info from '@material-ui/icons/Info';
import Warning from '@material-ui/icons/Warning';
import Check from '@material-ui/icons/CheckCircle';
import Error from '@material-ui/icons/RemoveCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import dummy from '@api/dummy/dummyContents';
import messageStyles from '@styles/Messages.scss';
import avatarApi from '@api/images/avatars';
import link from '@api/ui/link';
import { loadFromLocalStorage } from '@api/localStorage/localStorage';
import { useClearCache } from 'react-clear-cache';
import styles from './header-jss';

function UserMenu(props) {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();

  const [menuState, setMenuState] = useState({
    anchorEl: null,
    openMenu: null
  });

  const handleMenu = menu => (event) => {
    const { openMenu } = menuState;
    setMenuState({
      openMenu: openMenu === menu ? null : menu,
      anchorEl: event.currentTarget
    });
  };

  const handleClose = () => {
    setMenuState({ anchorEl: null, openMenu: null });
  };

  const handleLogOut = () => {
    localStorage.clear();
    emptyCacheStorage();
  };

  const { classes } = props;
  const { anchorEl, openMenu } = menuState;
  const {
    first_name, last_name
  } = loadFromLocalStorage();
  const name = `${first_name} ${last_name}`;
  return (
    <div>
      {/* <IconButton
        aria-haspopup="true"
        onClick={handleMenu('notification')}
        color="inherit"
        className={classNames(classes.notifIcon, dark ? classes.dark : classes.light)}
      >
        <Badge className={classes.badge} badgeContent={4} color="secondary">
          <i className="ion-ios-bell-outline" />
        </Badge>
      </IconButton> */}
      <Menu
        id="menu-notification"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={classes.notifMenu}
        PaperProps={{
          style: {
            width: 350,
          },
        }}
        open={openMenu === 'notification'}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <div className={messageStyles.messageInfo}>
            <ListItemAvatar>
              <Avatar alt="User Name" src={avatarApi[0]} />
            </ListItemAvatar>
            <ListItemText primary={dummy.text.subtitle} secondary={dummy.text.date} />
          </div>
        </MenuItem>
        <Divider variant="inset" />
        <MenuItem onClick={handleClose}>
          <div className={messageStyles.messageInfo}>
            <ListItemAvatar>
              <Avatar className={messageStyles.icon}>
                <Info />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={dummy.text.sentences} className={classes.textNotif} secondary={dummy.text.date} />
          </div>
        </MenuItem>
        <Divider variant="inset" />
        <MenuItem onClick={handleClose}>
          <div className={messageStyles.messageSuccess}>
            <ListItemAvatar>
              <Avatar className={messageStyles.icon}>
                <Check />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={dummy.text.subtitle} className={classes.textNotif} secondary={dummy.text.date} />
          </div>
        </MenuItem>
        <Divider variant="inset" />
        <MenuItem onClick={handleClose}>
          <div className={messageStyles.messageWarning}>
            <ListItemAvatar>
              <Avatar className={messageStyles.icon}>
                <Warning />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={dummy.text.subtitle} className={classes.textNotif} secondary={dummy.text.date} />
          </div>
        </MenuItem>
        <Divider variant="inset" />
        <MenuItem onClick={handleClose}>
          <div className={messageStyles.messageError}>
            <ListItemAvatar>
              <Avatar className={messageStyles.icon}>
                <Error />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Suspendisse pharetra pulvinar sollicitudin. Aenean ut orci eu odio cursus lobortis eget tempus velit. " className={classes.textNotif} secondary="Jan 9, 2016" />
          </div>
        </MenuItem>
      </Menu>
      <Button onClick={handleMenu('user-setting')}>
        <Avatar
          alt={name}
          src={dummy.user.avatar}
        />
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openMenu === 'user-setting'}
        onClose={handleClose}
      >
        <MenuItem disabled onClick={handleClose} component={Link} to={link.profile}>{name}</MenuItem>
        <MenuItem disabled onClick={handleClose} component={Link} to={link.profile}>Min organisation</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogOut} component={Link} to="/">
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserMenu);
