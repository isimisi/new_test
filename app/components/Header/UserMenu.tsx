/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";

import ExitToApp from "@material-ui/icons/ExitToApp";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import link from "@api/ui/link";
import { useAppDispatch } from "@hooks/redux";
import store from "@redux/configureStore";
import { customerPortal } from "../../containers/Pages/CreateOrganization/reducers/createOrganizationActions";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./header-jss";

import Avatar, { genConfig } from "react-nice-avatar";
import { UserMeta } from "@helpers/userInfo";
const config = genConfig({
  isGradient: Boolean(Math.round(Math.random()))
});

function UserMenu() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { logout, user } = useAuth0();

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

  const { anchorEl, openMenu } = menuState;
  const meta: UserMeta = user && user["https://juristic.io/meta"];
  const { first_name, last_name, stripe_customer_id } = meta.dbUser;
  const name = `${first_name} ${last_name}`;
  return (
    <div>
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
        <Divider />
        <MenuItem onClick={handleLogOut} component={Link} to="/">
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          {t("user-menu.log_out")}
        </MenuItem>
      </Menu>
    </div>
  );
}

export default withStyles(styles)(UserMenu);
