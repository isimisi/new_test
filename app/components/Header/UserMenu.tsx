/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";

import ExitToApp from "@material-ui/icons/ExitToApp";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import Badge from "@material-ui/core/Badge";
import link from "@api/ui/link";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import store from "@redux/configureStore";
import { customerPortal } from "@pages/CreateOrganization/reducers/createOrganizationActions";
import { useTranslation } from "react-i18next";
import ListItemText from "@material-ui/core/ListItemText";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./header-jss";

import Avatar, { genConfig } from "react-nice-avatar";
import { UserMeta } from "@helpers/userInfo";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import NotificationDialog from "./NotificationDialog";
import CreateNotificationDialog from "./CreateNotificationDialog";
import { readNotification } from "@pages/Dashboard/reducers/dashboardActions";

const config = genConfig({
  isGradient: Boolean(Math.round(Math.random()))
});

function UserMenu({ classes }) {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { logout, user } = useAuth0();
  const notifications = useAppSelector(state =>
    state.dashboard.get("notifications")
  ).toJS();
  const { t } = useTranslation();

  const [menuState, setMenuState] = useState({
    anchorEl: null,
    openMenu: null
  });

  const handleMenu = menu => event => {
    const { openMenu } = menuState;
    setMenuState({
      openMenu: openMenu === menu ? null : menu,
      anchorEl: event.currentTarget
    });
  };

  const handleClose = () => {
    setMenuState({ anchorEl: null, openMenu: null });
  };

  const admonistratePlan = () => {
    handleClose();

    user && dispatch(customerPortal(user, history.location.pathname));
  };

  const handleLogOut = () => {
    store.dispatch({ type: "RESET" });
    logout({ returnTo: window.location.origin });
  };

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState(null);

  const handleOpenNotificationModal = n => {
    setActiveNotification(n);
    user && !n.read && dispatch(readNotification(user, n.id));
    setNotificationOpen(true);
    handleClose();
  };

  const handleCloseNotificationModal = () => {
    setNotificationOpen(false);
  };

  const [createNotificationOpen, setCreateNotificationOpen] = useState(false);

  const handleOpenCreateNotificationModal = () => {
    setCreateNotificationOpen(true);
    handleClose();
  };

  const handleCloseCreateNotificationModal = () => {
    setCreateNotificationOpen(false);
  };

  useEffect(() => {
    const intrusiveNotification = notifications?.notifications?.find(n => n.notification.intrusive && !n.read);
    if (intrusiveNotification) {
      handleOpenNotificationModal(intrusiveNotification);
    }
  }, []);

  const { anchorEl, openMenu } = menuState;
  const meta: UserMeta = user && user["https://juristic.io/meta"];
  const { first_name, last_name, stripe_customer_id, id: userId } = meta.dbUser;
  const name = `${first_name} ${last_name}`;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton
        aria-haspopup="true"
        onClick={handleMenu("notification")}
        color="inherit"
        className={classes.notifIcon}
      >
        <Badge
          className={classes.badge}
          badgeContent={notifications.unread}
          color="primary"
        >
          <NotificationsNoneIcon fontSize="inherit" />
        </Badge>
      </IconButton>
      <Menu
        id="menu-notification"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        className={classes.notifMenu}
        PaperProps={{
          style: {
            width: 300,
            maxHeight: 500
          }
        }}
        open={openMenu === "notification"}
        onClose={handleClose}
      >
        {notifications?.notifications?.length > 0 &&
          notifications.notifications.map(n => (
            <MenuItem
              onClick={() => handleOpenNotificationModal(n)}
              style={{ backgroundColor: n.read ? "transparant" : "#E7F2FF" }}
            >
              <ListItemAvatar className={classes.listItemAvatar}>
                <span role="img" aria-label="icon">
                  {n.notification.icon}
                </span>
              </ListItemAvatar>
              <ListItemText
                primary={n.notification.header}
                secondary={n.created}
                primaryTypographyProps={{
                  style: {
                    whiteSpace: "initial",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }
                }}
              />
            </MenuItem>
          ))}
      </Menu>
      <div
        onClick={handleMenu("user-setting")}
        style={{ cursor: "pointer", margin: "0 12px" }}
      >
        <Avatar style={{ width: 40, height: 40 }} {...config} hairColorRandom />
      </div>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={openMenu === "user-setting"}
        onClose={handleClose}
      >
        <MenuItem
          disabled
          onClick={handleClose}
          component={Link}
          to={link.profile}
        >
          {name}
        </MenuItem>
        <MenuItem disabled={!stripe_customer_id} onClick={admonistratePlan}>
          {t("user-menu.plan_administrator")}
        </MenuItem>
        {[1, 2].includes(userId) && (
          <MenuItem onClick={handleOpenCreateNotificationModal}>
            Lav en notification
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleLogOut} component={Link} to="/">
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          {t("user-menu.log_out")}
        </MenuItem>
      </Menu>
      <NotificationDialog
        open={notificationOpen}
        activeNotification={activeNotification}
        handleClose={handleCloseNotificationModal}
      />
      {[1, 2].includes(userId) && (
        <CreateNotificationDialog
          open={createNotificationOpen}
          handleClose={handleCloseCreateNotificationModal}
        />
      )}
    </div>
  );
}

export default withStyles(styles)(UserMenu);
