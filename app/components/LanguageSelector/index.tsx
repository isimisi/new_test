/* eslint-disable react/jsx-one-expression-per-line */
import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import makeStyles from '@mui/styles/makeStyles';
import "flag-icon-css/css/flag-icons.min.css";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [dropdownLang, setDropdownLang] = useState(i18n.language || "en");

  const languageHandler = event => {
    const newLanguage = event.target.value;
    if (dropdownLang !== newLanguage) {
      setDropdownLang(newLanguage);
      i18n.changeLanguage(newLanguage);
    }
  };

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

  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <Select
        value={dropdownLang}
        onChange={languageHandler}
        className={classes.Select}
        disableUnderline
      >
        <MenuItem className={classes.menuItem} value="da">
          <span style={{ width: "18px" }} className="flag-icon flag-icon-dk" />{" "}
          &nbsp; Dansk
        </MenuItem>
        <MenuItem className={classes.menuItem} value="en">
          <span style={{ width: "18px" }} className="flag-icon flag-icon-gb" />{" "}
          &nbsp; English
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
