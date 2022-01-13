/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import React, { useState } from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import link from "@api/ui/link";
import { useAppDispatch } from "@hooks/redux";
import UserAvatar from "react-user-avatar";
import { loadFromLocalStorage } from "@utils/localStorage";
import store from "@redux/configureStore";
import { customerPortal } from "../../containers/Pages/CreateOrganization/reducers/createOrganizationActions";
import { useTranslation } from "react-i18next";

import styles from "./header-jss";

import Avatar, { genConfig } from "react-nice-avatar";
const config = genConfig({
  sex: "man",
  faceColor: "#F9C9B6",
  earSize: "big",
  eyeStyle: "oval",
  noseStyle: "round",
  mouthStyle: "peace",
  shirtStyle: "polo",
  glassesStyle: "none",
  hairColor: "#000",
  hairStyle: "thick",
  hatStyle: "none",
  hatColor: "#FC909F",
  eyeBrowStyle: "up",
  shirtColor: "#F4D150",
  bgColor: "#E0DDFF"
});

function UserMenu() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const theme = useTheme();
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

    dispatch(customerPortal(history.location.pathname));
  };

  const handleLogOut = () => {
    localStorage.clear();
    store.dispatch({ type: "RESET" });
  };

  const { anchorEl, openMenu } = menuState;
  const { first_name, last_name, stripe_customer_id } = loadFromLocalStorage();
  const name = `${first_name} ${last_name}`;
  return (
    <div>
      <div
        onClick={handleMenu("user-setting")}
        style={{ cursor: "pointer", margin: "0 12px" }}
      >
        <Avatar style={{ width: 40, height: 40 }} {...config} />
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
