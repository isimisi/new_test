/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */

import React from "react";
import classNames from "classnames";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
import Chip from "@material-ui/core/Chip";
import Ionicon from "react-ionicons";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { plans } from "@api/constants";
import { useTranslation } from "react-i18next";
import useStyle from "./sidebar-jss";
import Tooltip from "@material-ui/core/Tooltip";
import { useAuth0 } from "@auth0/auth0-react";
import { getPlanId } from "@helpers/userInfo";
import { openMenuAction } from "@redux/actions/uiActions";

const LinkBtn = React.forwardRef((props, ref) => (
  // @ts-ignore
  <NavLink to={props.to} {...props} innerRef={ref} />
));

interface Props {
  open: [];
  openSubMenu: (key, keyParent) => void;
  toggleDrawerOpen: () => void;
  openDrawer: () => void;
  loadTransition: (bol: boolean) => void;
  dataMenu: any[];
  drawerPaper?: boolean;
  sidebarOpen: boolean;
}

const MainMenu = (props: Props) => {
  const {
    openSubMenu,
    open,
    dataMenu,
    drawerPaper,
    toggleDrawerOpen,
    loadTransition,
    openDrawer,
    sidebarOpen
  } = props;

  const handleClick = () => {
    toggleDrawerOpen();
    loadTransition(false);
  };

  const { user } = useAuth0();
  const plan_id = getPlanId(user);

  const notIncludedPlans = plan_id ? plans.slice(plan_id, plans.length) : plans;
  const classes = useStyle();

  const getMenus = menuArray =>
    menuArray.map((item: any, index) => {
      if (item.child || item.linkParent) {
        const { t } = useTranslation();
        return (
          <Tooltip
            arrow
            title={drawerPaper === false ? `${t(item.name)}` : ""}
            placement="right"
            classes={{
              tooltip: classes.tooltip
            }}
          >
            <div
              key={index.toString()}
              className={"for_intro_" + index.toString()}
            >
              <ListItem
                button
                /* @ts-ignore */
                component={LinkBtn}
                disabled={item.disabled}
                to={
                  item.badge && notIncludedPlans.includes(item.badge)
                    ? "/app/plan"
                    : item.linkParent
                      ? item.linkParent
                      : "#"
                }
                className={classNames(
                  classes.head,
                  item.icon ? classes.iconed : "",
                  // @ts-ignore
                  open.indexOf(item.key) > -1 ? classes.opened : ""
                )}
                onClick={() => {
                  openDrawer();
                  if (sidebarOpen) {
                    openSubMenu(item.key, item.keyParent);
                  }
                }}
              >
                {item.icon && (
                  <ListItemIcon className={classes.icon}>
                    <Ionicon icon={item.icon} />
                  </ListItemIcon>
                )}
                <ListItemText
                  classes={{ primary: classes.primary }}
                  primary={t(`${item.name}`)}
                />
                {!item.linkParent && (
                  <span>
                    {/** @ts-ignore */}
                    {open.indexOf(item.key) > -1 ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </span>
                )}
                {item.badge && notIncludedPlans.includes(item.badge) && (
                  <Chip
                    color="primary"
                    label={item.badge}
                    className={classes.badge}
                    size="small"
                  />
                )}
              </ListItem>
              {!item.linkParent && (
                <Collapse
                  component="div"
                  className={classNames(
                    classes.nolist,
                    item.keyParent ? classes.child : ""
                  )}
                  // @ts-ignore
                  in={open.indexOf(item.key) > -1}
                  timeout="auto"
                  unmountOnExit
                >
                  <List className={classes.dense} component="nav" dense>
                    {getMenus(item.child)}
                  </List>
                </Collapse>
              )}
            </div>
          </Tooltip>
        );
      }
      if (item.title) {
        const { t } = useTranslation();
        return (
          <ListSubheader
            disableSticky
            key={index.toString()}
            component="div"
            className={classes.title}
          >
            {t(item.name)}
          </ListSubheader>
        );
      }
      const { t } = useTranslation();
      return (
        <ListItem
          key={index.toString()}
          button
          // @ts-ignore
          exact
          className={classNames(classes.nested, `for_intro_${item.name}`)}
          activeClassName={classes.active}
          component={LinkBtn}
          to={
            item.badge && notIncludedPlans.includes(item.badge)
              ? "/app/plan"
              : item.link
          }
          onClick={handleClick}
        >
          <ListItemText
            classes={{ primary: classes.primary }}
            inset
            primary={t(`${item.name}`)}
          />
          {item.badge && notIncludedPlans.includes(item.badge) && (
            <Chip
              color="primary"
              label={item.badge}
              className={classes.badge}
            />
          )}
        </ListItem>
      );
    });
  return <div>{getMenus(dataMenu)}</div>;
};

const openAction = (key, keyParent) => ({
  type: "OPEN_SUBMENU",
  key,
  keyParent
});
const reducer = "ui";

const mapStateToProps = state => ({
  ...state,
  open: state[reducer].get("subMenuOpen"),
  sidebarOpen: state[reducer].get("sidebarOpen")
});

const mapDispatchToProps = dispatch => ({
  openSubMenu: bindActionCreators(openAction, dispatch),
  openDrawer: () => dispatch(openMenuAction)
});

const MainMenuMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default MainMenuMapped;
