import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import ViewList from "@material-ui/icons/ViewList";
import GridOn from "@material-ui/icons/GridOn";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import styles from "./search-jss";
import { useTranslation } from "react-i18next";

function SearchProduct(props) {
  const { classes, search, keyword, dataProduct, handleSwitchView, listView } = props;
  const { t } = useTranslation();

  const getTotalResult = (dataArray) => {
    let totalResult = 0;
    for (let i = 0; i < dataArray.size; i += 1) {
      if (dataArray.getIn([i, "name"]) === undefined) {
        return false;
      }
      if (
        dataArray
          .getIn([i, "name"])
          .toLowerCase()
          .indexOf(keyword) !== -1
      ) {
        totalResult += 1;
      }
    }
    return totalResult;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <div className={classes.flex}>
            <div className={classes.wrapper}>
              <div className={classes.search}>
                <SearchIcon />
              </div>
              <input
                className={classes.input}
                placeholder={t("groups.search-group.search_groups")}
                onChange={(event) => search(event)}
              />
            </div>
          </div>
          <Typography variant="caption" className={classes.result}>
            {getTotalResult(dataProduct)}
            &nbsp;
            {t("groups.search-group.results")}
          </Typography>
          <Hidden mdDown>
            <div className={classes.toggleContainer}>
              <ToggleButtonGroup value={listView} exclusive onChange={handleSwitchView}>
                <ToggleButton value="grid">
                  <GridOn />
                </ToggleButton>
                <ToggleButton value="list">
                  <ViewList />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SearchProduct.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  dataProduct: PropTypes.object.isRequired,
  handleSwitchView: PropTypes.func.isRequired,
  listView: PropTypes.string.isRequired,
};

export default withStyles(styles)(SearchProduct);
