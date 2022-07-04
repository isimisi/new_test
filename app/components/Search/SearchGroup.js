import React from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import ViewList from "@mui/icons-material/ViewList";
import GridOn from "@mui/icons-material/GridOn";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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
          <Hidden lgDown>
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
