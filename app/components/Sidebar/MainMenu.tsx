/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */
// @ts-nocheck

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
import { loadFromLocalStorage } from "@utils/localStorage";
import { useTranslation } from "react-i18next";
import useStyle from "./sidebar-jss";
import Tooltip from "@material-ui/core/Tooltip";

const LinkBtn = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/prop-types
  <NavLink to={props.to} {...props} innerRef={ref} />
));

interface Props {
  open?: boolean;
  openSubMenu?: () => void;
  toggleDrawerOpen: () => void;
  loadTransition: () => void;
  dataMenu: [any];
  drawerPaper?: boolean;
}

const MainMenu = (props: Props) => {
  const handleClick = () => {
    const { toggleDrawerOpen, loadTransition } = props;
    toggleDrawerOpen();
    loadTransition(false);
  };

  const { plan_id } = loadFromLocalStorage();

  const notIncludedPlans = plans.slice(plan_id, plans.length);
  const classes = useStyle();

  const { openSubMenu, open, dataMenu, drawerPaper } = props;

  const getMenus = menuArray =>
    menuArray.map((item, index) => {
      if (item.child || item.linkParent) {
        const { t } = useTranslation();
        return (
          <Tooltip
            arrow
            title={drawerPaper === false ? t(`${item.name}`) : ""}
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
                  open.indexOf(item.key) > -1 ? classes.opened : ""
                )}
                onClick={() => openSubMenu(item.key, item.keyParent)}
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
                  in={open.indexOf(item.key) > -1}
                  timeout="auto"
                  unmountOnExit
                >
                  <List className={classes.dense} component="nav" dense>
                    {getMenus(item.child, "key")}
                  </List>
                </Collapse>
              )}
            </div>
          </Tooltip>
        );
      }
      if (item.title) {
        return (
          <ListSubheader
            disableSticky
            key={index.toString()}
            component="div"
            className={classes.title}
          >
            {item.name}
          </ListSubheader>
        );
      }
      const { t } = useTranslation();
      return (
        <ListItem
          key={index.toString()}
          button
          exact
          className={classNames(classes.nested, `for_intro_${item.name}`)}
          activeClassName={classes.active}
          component={LinkBtn}
          to={
            item.badge && notIncludedPlans.includes(item.badge)
              ? "/app/plan"
              : item.link
          }
          onClick={() => handleClick()}
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
  open: state[reducer].get("subMenuOpen")
});

const mapDispatchToProps = dispatch => ({
  openSubMenu: bindActionCreators(openAction, dispatch)
});

const MainMenuMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default MainMenuMapped;
