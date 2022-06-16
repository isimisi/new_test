import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { MenuItem, Select } from "@material-ui/core";

import { changeDashboardType } from "../../containers/Pages/Dashboard/reducers/dashboardActions";
import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 20,
    border: 0
  },
  Select: {
    border: 0,
    outline: "none",
    cursor: "pointer",
    textAlign: "left",
    backgroundColor: "transparent"
  },
  menuItem: {
    maxHeight: 50,
    border: 0,
    backgroundColor: "transparent"
  }
}));

const DashboardSelector = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const dashboard = useAppSelector(state => state.dashboard.get("type"));

  const handleDashboard = event => {
    const type = event.target.value;

    dispatch(changeDashboardType(type));
  };

  const options = [
    { value: "structure", label: t("dashboard.options.structure") },
    { value: "timeline", label: t("dashboard.options.timeline") }
  ];

  const classes = useStyles();

  return (
    <Select
      value={dashboard}
      onChange={handleDashboard}
      className={classes.Select}
      disableUnderline
    >
      {options.map(op => (
        <MenuItem className={classes.menuItem} value={op.value}>
          {op.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default DashboardSelector;
